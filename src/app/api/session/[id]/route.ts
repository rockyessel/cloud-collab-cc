import { connectToDB } from "@/lib/config/mongoose";
import Session from "@/lib/model/session.model";

export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  connectToDB();
  try {
    if (!params.id)
      return Response.json({ success: false, data: null, msg: "ID required." });

    const foundSession = await Session.findById(params.id);

    if (!foundSession)
      return Response.json({ success: false, data: null, msg: "Not found." });

    return Response.json({
      data: foundSession,
      msg: "Success",
      success: true,
    });
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};
