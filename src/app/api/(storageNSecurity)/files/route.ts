import fs from "fs";
import path from "path";
import CryptoJS from "crypto-js";
import { PANGEA_OBJ } from "@/lib/config/pangea";
import {
  PangeaConfig,
  FileIntelService,
  FileScanService,
} from "pangea-node-sdk";
import { IdGen, formatFileSize } from "@/lib/helpers";
import { Client } from "@/lib/config/sanity";
import OrgFile from "@/lib/model/file.model";

const FileTemp = async (request: Request) => {
  try {
    // Pangae Config Values
    const { domain, token } = PANGEA_OBJ;
    // Pangae File Intel Setup
    const config = new PangeaConfig({ domain: domain });
    const fileIntel = new FileIntelService(String(token), config);
    const options = { provider: "reversinglabs", verbose: true, raw: true };

    // File
    const fileData = await request.formData();
    const file = fileData.get("file") as unknown as File;
    const data = await file.arrayBuffer();

    // Generates Unique Values
    const uniquePath = IdGen("ORG");

    // Create Dir
    const directoryPath = path.join(process.cwd(), "public", "tmp", uniquePath);
    fs.mkdirSync(directoryPath, { recursive: true });

    // Structure File Path
    const filePath = path.join(directoryPath, file.name);

    // Write the Path
    let writeStream = fs.createWriteStream(filePath);

    // Create And Promisify the writeStream
    // Reason is the "fs.existsSync(filePath)" will run first
    // before we can even store the file.
    // Thus, so we have to promisify the writeStream
    const writeStreamPromise = new Promise((resolve, reject) => {
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    writeStream.write(Buffer.from(data));
    writeStream.end();
    await writeStreamPromise;

    // Generate the file url, using Sanity.io
    const buffer = Buffer.from(data);
    const fileObj = await Client.assets.upload("file", buffer, {
      filename: `${new Date()}${file.name}`,
    });

    // Construct File structure.
    const insertFile = {
      localIdPath: "", // Get the rewrriten path
      hash: "",
      proxyURL: IdGen("file"),
      score: "",
      fileUrl: fileObj.url,
      size: formatFileSize(file.size),
      originalFilename: file.name,
      mimeType: fileObj.mimeType,
      extension: fileObj.extension,
      sanityCMSId: fileObj.assetId,
    };

    // Making sure File Path Is Created.
    if (fs.existsSync(filePath)) {
      // Read File
      const readFile = fs.readFileSync(filePath, "utf8");

      // Create Hash And verify
      const sha256 = CryptoJS.algo.SHA256.create();
      sha256.update(readFile);
      const fileHash = sha256.finalize().toString();
      // Verify hash reputation
      const response = await fileIntel.hashReputation(
        fileHash,
        "sha256",
        options
      );

      console.log("response.body: ", response.result);

      // Perform a deeper scan, if the "verdict = unknown"
      const { score, verdict } = response.result.data;
      if (score !== 0 && verdict !== "benign") {
        const config = new PangeaConfig({
          domain: domain,
          queuedRetryEnabled: true,
          pollResultTimeoutMs: 60 * 1000,
        });

        const client = new FileScanService(String(token), config);
        const response = await client.fileScan(options, filePath);

        console.log(response.result.data);

        // So in this project, files "50" score and a
        // verdict of "suspicious", will be rewritten
        // Above "50" will be rejected.

        const { score, verdict } = response.result.data;
        if (score >= 50 && verdict === "suspicious") {
          // Rewrite the file
          // Create a new file with the same content
          // This file will be saved temp for 24 hours.
          // And it will be made available for the user to download.
          // Since it will have the right "hash" we wrote for it.
          const rewrittenFilePath_ = path.join(
            directoryPath,
            `${fileHash}_${file.name}`
          );
          fs.writeFileSync(rewrittenFilePath_, readFile);

          // Remove the original file
          fs.unlinkSync(filePath);

          insertFile.score = String(score);
          insertFile.hash = fileHash;
          insertFile.localIdPath = rewrittenFilePath_;

          const fileInserted = await OrgFile.create({ ...insertFile });

          return Response.json({
            status: true,
            data: fileInserted,
            msg: "Uploaded successfully.",
          });
        }
      } else {
        // Remove the original file
        fs.unlinkSync(filePath);

        insertFile.score = String(score);
        const fileInserted = await OrgFile.create({ ...insertFile });

        return Response.json({
          status: true,
          data: fileInserted,
          msg: "Uploaded successfully.I",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return Response.json({ success: false });
  }
};

export { FileTemp as POST };
