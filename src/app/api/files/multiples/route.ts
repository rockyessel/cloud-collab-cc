import { IdGen, formatFileSize } from "@/lib/helpers";
import path from "path";
import fs from "fs";
import { Client } from "@/lib/config/sanity";

export const POST = async (request: Request) => {
  try {
    const fileData = await request.formData();
    const files = fileData.getAll("files") as unknown as File[];

    // Loop through each file and process
    for (const file of files) {
      const uniquePath = generateUniquePath(); // Generate a unique path
      createDirectory(uniquePath); // Create the directory if it doesn't exist

      const fileName = IdGen("ORG") + "_" + file.name; // Generate a unique filename
      const filePath = path.join(uniquePath, fileName);

      // Write the file to the generated path
      await writeFile(filePath, await fs.promises.readFile(filePath));

      // Check if the file exists in the directory
      const fileExists = await fs.promises.access(filePath).then(
        () => true,
        () => false
      );

      if (fileExists) {
        const fileBuffer = await fs.promises.readFile(filePath);
        const sanityURL = await uploadFileToSanity(fileBuffer, file.name);

        
        
      } else {
        console.error(`File ${fileName} does not exist in the directory.`);
      }
    }

    return Response.json({
      success: true,
      data: null,
      msg: "File(s) processed successfully",
    });
  } catch (error) {
    console.error(error);
    return Response.json({
      success: false,
      data: null,
      msg: "Error processing file(s)",
    });
  }
};

const generateUniquePath = () => {
  return path.join(process.cwd(), "public", "tmp", IdGen("ORG"));
};

const createDirectory = (directoryPath: string) => {
  fs.mkdirSync(directoryPath, { recursive: true });
};

const uploadFileToSanity = async (buffer: Buffer, filename: string) => {
  return await Client.assets.upload("file", buffer, { filename });
};

const writeFile = async (filePath: string, data: Buffer) => {
  await fs.promises.writeFile(filePath, data);
};
