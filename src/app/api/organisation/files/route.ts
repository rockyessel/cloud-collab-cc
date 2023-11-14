import { connectToDB } from "@/lib/config/mongoose";
import File from "@/lib/model/file.model";

const OrganisationFileHandler = async (request: Request) => {
  connectToDB();
  try {
    const { searchParams } = new URL(request.url);
    const orgId = searchParams.get("orgId");
    if (!orgId)
      return Response.json({
        success: false,
        data: null,
        msg: "Org ID is required.",
      });
    const foundFiles = await File.find({ organisationId: orgId });
    if (!foundFiles)
      return Response.json({
        success: false,
        error: "No Files.",
        daa: null,
      });
    return Response.json({ success: true, data: foundFiles });
  } catch (error) {
    return Response.json({ success: false, error });
  }
};
export { OrganisationFileHandler as GET };
