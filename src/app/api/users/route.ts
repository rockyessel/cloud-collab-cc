import { PANGEA_OBJ } from "@/lib/config/pangea";
import { PangeaConfig, AuthNService } from "pangea-node-sdk";

const { token, domain } = PANGEA_OBJ;
const config = new PangeaConfig({ domain });
const authn = new AuthNService(token, config);

export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const Id = searchParams.get("Id");
    const email = searchParams.get("email")!

    console.log("User ID: ", Id);

    // if (!Id)
    //   return Response.json({
    //     success: false,
    //     data: null,
    //     msg: "ID is required.",
    //   });

    const user = await authn.user.profile.getProfile({ email:'rockyessell@gmail.com' });

    if (user)
      return Response.json({
        data: user,
        success: true,
        msg: "Fetched successfully.",
      });
    else
      return Response.json({
        data: null,
        success: false,
        msg: "No user found.",
      });
  } catch (error) {
    console.log(error);
    return Response.json({
      data: null,
      success: false,
      msg: "Failed to fetch user.",
    });
  }
};
