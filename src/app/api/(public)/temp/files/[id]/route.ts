import { connectToDB } from "@/lib/config/mongoose";
import File from "@/lib/model/file.model";

interface Props {
  response: Response;
  params: { params: { id: string } };
}

const FileAccessHandler = async (
  response: Response,
  { params }: { params: { id: string } }
) => {
  connectToDB();
  const { id } = params;
  try {
    if (!id) {
      return Response.json({ success: false });
    }
    const foundFile = await File.findOne({ proxyURL: id });

    if (foundFile) {
      const headers = new Headers({
        "Content-Type": foundFile.mimeType,
        "Content-Disposition": `inline; filename="${foundFile.originalFilename}"`,
      });

      const response = await fetch(foundFile.fileUrl);
      return new Response(response.body, { status: 200, headers });
    }
  } catch (error) {
    console.log(error);
    return Response.json({ error });
  }
};

export { FileAccessHandler as GET };
