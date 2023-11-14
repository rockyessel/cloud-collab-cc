import { connectToDB } from "@/lib/config/mongoose";
import Organisation from "@/lib/model/organisation.model";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  connectToDB();
  try {
    if (!params.id)
      return Response.json({ success: false, data: null, msg: "ID required." });

    const foundOrganization = await Organisation.findById(params.id);

    if (!foundOrganization)
      return Response.json({ success: false, data: null, msg: "Not found." });

    return Response.json({
      data: foundOrganization,
      msg: "Success",
      success: true,
    });
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};
