import { connectToDB } from "@/lib/config/mongoose";
import { PANGEA_OBJ } from "@/lib/config/pangea";
import { IdGen, formatFileSize } from "@/lib/helpers";
import {
  FileIntelService,
  FileScanService,
  PangeaConfig,
} from "pangea-node-sdk";
import path from "path";
import fs from "fs";
import OrgFile from "@/lib/model/file.model";
import fsExtra from "fs-extra";
import { Client } from "@/lib/config/sanity";
import CryptoJS from "crypto-js";
import Organisation from "@/lib/model/organisation.model";

async function* processFileHelper(request: Request) {
  yield JSON.stringify({
    message: "Starting process...",
    success: false,
    data: null,
  });

  await delay(500);
  try {
    yield JSON.stringify({
      message: "Receiving file...",
      success: false,
      data: null,
    });

    await delay(500);
    connectToDB();
    const { domain, token } = PANGEA_OBJ;

    // Pangae File Intel Setup
    const config = new PangeaConfig({ domain });
    const fileIntel = new FileIntelService(String(token), config);
    const options = { provider: "reversinglabs", verbose: true, raw: true };

    // File
    const fileData = await request.formData();
    const file = fileData.get("file") as unknown as File;
    const data = await file.arrayBuffer();

    if (file.type) {
      yield JSON.stringify({
        message: "File received...",
        success: false,
        data: null,
      });

      await delay(500);
    }

    // Generates a unique directory path and create the directory
    const directoryPath = generateUniquePath();
    yield JSON.stringify({
      message: "Generating file directory...",
      success: false,
      data: null,
    });
    await delay(500);
    createDirectory(directoryPath);
    yield JSON.stringify({
      message: "File directory generated...",
      success: false,
      data: null,
    });
    await delay(500);

    // Creates a full file path and write the file
    const filePath = path.join(directoryPath, file.name);
    await writeFile(filePath, Buffer.from(data));
    yield JSON.stringify({
      message: "Generating hash...",
      success: false,
      data: null,
    });
    await delay(500);
    console.log("fs.existsSync(filePath): ", fs.existsSync(filePath));
    if (fs.existsSync(filePath)) {
      // Reads the file content and then generates the file hash
      const readFileContent = await readFile(filePath);
      const fileHash = generateFileHash(readFileContent);

      yield JSON.stringify({
        message: "Hash generated. Checking hash reputation...",
        success: false,
        data: null,
      });
      await delay(500);

      // Checks the hash reputation using Pangae File Intel
      const response = await fileIntel.hashReputation(fileHash, "sha256", {
        provider: "reversinglabs",
        verbose: true,
        raw: true,
      });

      console.log("response: ", response.result);

      const { score } = response.result.data;

      // console.log("score: ", score);

      if (shouldRejectFile(score)) {
        // Uploads a file to Sanity.io
        const fileObj = await uploadFileToSanity(
          Buffer.from(data),
          `${new Date()}${file.name}`
        );

        // Constructs a file object for insertion in MongoDB
        const insertFile = {
          hash: "",
          proxyURL: IdGen("file"),
          score: "",
          fileUrl: fileObj.url,
          uploadedBy: "",
          size: file.size,
          sizeByte: formatFileSize(file.size),
          originalFilename: file.name,
          mimeType: fileObj.mimeType,
          extension: fileObj.extension,
          sanityCMSId: fileObj.assetId,
        };

        // Rejects the file and delete the directory
        yield JSON.stringify({
          message: "Deleting File directory...",
          success: false,
          data: null,
        });
        await fsExtra.remove(directoryPath);
        await delay(500);

        // console.log("directoryPath: ", directoryPath);

        yield JSON.stringify({
          message: "File directory deleted...",
          success: false,
          data: null,
        });
        await delay(500);

        // Update the file object with score and hash, then insert into MongoDB
        insertFile.score = String(score);
        insertFile.hash = fileHash;

        const fileInserted = await OrgFile.create({ ...insertFile });

        yield JSON.stringify({
          message: "File link generated",
          success: true,
          data: fileInserted,
        });
      } else {
        // Rejects the file and delete the directory
        yield JSON.stringify({
          message: "Deleting File directory...",
          success: false,
          data: null,
        });
        await fsExtra.remove(directoryPath);
        await delay(500);

        yield JSON.stringify({
          message: "File is corrupted. Try another file.",
          success: false,
          data: null,
        });
      }
    }
  } catch (error) {
    // console.log(error);
    yield "Error occurred.";
    return { success: false };
  }
}

const FileHandler = async (request: Request) => {
  switch (request.method) {
    case "POST":
      const { readable, writable } = new TransformStream();

      // Create a writer and a generator iterator
      const writer = writable.getWriter();
      const generator = processFileHelper(request);

      // Process the generator and write its output to the stream
      (async function () {
        for await (const message of generator) {
          const encoder = new TextEncoder();
          const encodedMessage = encoder.encode(message + "\n");
          await writer.write(encodedMessage);
        }

        writer.close();
      })();

      return new Response(readable, {
        headers: { "Content-Type": "text/plain" },
      });

    case "PUT":
      const { file } = await request.json();

      // Query Params
      const { searchParams } = new URL(request.url);
      const orgId = searchParams.get("orgId");
      const uploadedBy = searchParams.get("uploadedBy");

      // console.log("Update file: ", file);
      // console.log("orgId: ", orgId);

      if (!orgId)
        return Response.json({
          success: false,
          data: null,
          msg: "Organisation ID is not found.",
        });

      if (!file._id)
        return Response.json({
          success: false,
          data: null,
          msg: "File ProxyURL not found.",
        });

      const foundFile = await OrgFile.findById(file._id);
      const foundOrg = await Organisation.findById(orgId);

      if (!foundOrg)
        return Response.json({
          success: false,
          data: null,
          msg: "Organisation not found.",
        });
      if (!foundFile)
        return Response.json({
          success: false,
          data: null,
          msg: "File not found.",
        });

      console.log("Found File - Update: ", foundFile);

      // Update the organizationId of the file using findOneAndUpdate
      const updatedFile = await OrgFile.findOneAndUpdate(
        { _id: file._id },
        { $set: { organizationId: foundOrg._id, uploadedBy } },
        { new: true }
      );

      if (!updatedFile) return Response.json({ success: false });

      return Response.json({ success: true });

    default:
      break;
  }
};

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const createDirectory = (directoryPath: string) => {
  fs.mkdirSync(directoryPath, { recursive: true });
};

const generateFileHash = (fileContent: string) => {
  const sha256 = CryptoJS.algo.SHA256.create();
  sha256.update(fileContent);
  return sha256.finalize().toString();
};

const shouldRejectFile = (score: number) => {
  return score >= 50 || score === -1;
};

const generateUniquePath = () => {
  return path.join(process.cwd(), "public", "tmp", IdGen("ORG"));
};

const writeFile = async (filePath: string, data: Buffer) => {
  await fs.promises.writeFile(filePath, data);
};

const readFile = async (filePath: string) => {
  return await fs.promises.readFile(filePath, "utf8");
};

const uploadFileToSanity = async (buffer: Buffer, filename: string) => {
  return await Client.assets.upload("file", buffer, { filename });
};

const performFileScan = async (filePath: string, options: any) => {
  const config = new PangeaConfig({
    domain: PANGEA_OBJ.domain,
    queuedRetryEnabled: true,
    pollResultTimeoutMs: 60 * 1000,
  });

  const client = new FileScanService(String(PANGEA_OBJ.token), config);
  return await client.fileScan(options, filePath);
};

export { FileHandler as POST, FileHandler as GET, FileHandler as PUT };
