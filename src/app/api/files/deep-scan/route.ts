import fs from "fs";
import CryptoJS from "crypto-js";
import File from "@/lib/model/file.model";
import { PANGEA_OBJ } from "@/lib/config/pangea";
import { connectToDB } from "@/lib/config/mongoose";
import { FileIntelService, FileScanService, PangeaConfig } from "pangea-node-sdk";

async function* processFileHelper(request: Request) {
  connectToDB();

  yield JSON.stringify({
    message: "Process has started...",
    success: false,
    data: null,
  });
  await delay(500);

  yield JSON.stringify({
    message: "Scan setup completed...",
    success: false,
    data: null,
  });
  await delay(500);
  const { domain, token } = PANGEA_OBJ;

  // Pangae File Intel Setup
  const config = new PangeaConfig({ domain });
  const fileIntel = new FileIntelService(String(token), config);
  const options = { provider: "reversinglabs", verbose: true, raw: true };

  yield JSON.stringify({
    message: "Searching for file path...",
    success: false,
    data: null,
  });
  await delay(500);
  // File
  const filePath = await request.text();

  const foundFile = await File.findOne({ localId: filePath });

  if (foundFile) {
    yield JSON.stringify({
      message: "File found. Initialing...",
      success: false,
      data: null,
    });
    await delay(500);

    if (fs.existsSync(filePath)) {
      const readFileContent = await readFile(filePath);

      yield JSON.stringify({
        message: "Path read. Creating hash...",
        success: false,
      });
      await delay(500);

      const fileHash = generateFileHash(readFileContent);

      yield JSON.stringify({
        message: "Hash generated. Verifying hash reputation...",
        success: false,
      });
      await delay(500);

      // Checks the hash reputation using Pangae File Intel
      const response = await fileIntel.hashReputation(fileHash, "sha256", {
        provider: "reversinglabs",
        verbose: true,
        raw: true,
      });

      const { score } = response.result.data;

      // console.log("score: ", score);

      if (shouldRejectFile(score)) {
        yield JSON.stringify({
          message: "Please upload a different file. This file is corrupted.",
          success: false,
        });
      }

      // Perform a deeper scan
      const result = await performFileScan(filePath, options);

      console.log("result.result.data: ", result.result.data);

      //   if success then we remove the file from the server.

      //   And also change the file state to "Sanitized"="true" when done.

      //   await fsExtra.remove(filePath);
    }
  } else {
  }
}

export const POST = async (request: Request) => {
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
};

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

const generateFileHash = (fileContent: string) => {
  const sha256 = CryptoJS.algo.SHA256.create();
  sha256.update(fileContent);
  return sha256.finalize().toString();
};

const shouldRejectFile = (score: number) => {
  return score > 50;
};

const readFile = async (filePath: string) => {
  return await fs.promises.readFile(filePath, "utf8");
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
