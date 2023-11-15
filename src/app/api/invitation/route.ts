import { PANGEA_OBJ } from "@/lib/config/pangea";
import { connectToDB } from "@/lib/config/mongoose";
import Invitation from "@/lib/model/invitation.model";
import { PangeaConfig, AuthNService } from "pangea-node-sdk";
import { baseURL } from "@/lib/helpers";

const InvitationOrgHandler = async (request: Request) => {
  const { domain, token } = PANGEA_OBJ;
  const CB_URI = baseURL!;

  const config = new PangeaConfig({ domain });
  const authn = new AuthNService(token, config);

  connectToDB();
  try {
    switch (request.method) {
      case "GET":
        try {
          const { searchParams } = new URL(request.url);
          const orgId = searchParams.get("orgId");

          const listResp = await authn.user.invites.list();
          console.log(`List success. ${listResp.result.invites} invites sent`);

          const allInvites = listResp.result.invites.filter(
            (invite) => invite.state === orgId && invite
          );

          const orgInviteOnly = allInvites;

          return Response.json({
            data: { orgInviteOnly, listResp},
            success: true,
            msg: "Fetched Successfully.",
          });
        } catch (error) {
          console.log(error);
        }

      case "POST":
        try {
          const { invite } = await request.json();

          if (!invite)
            return Response.json({
              data: null,
              success: false,
              msg: "invite is undefined.",
            });

          if (!invite.orgId)
            return Response.json({
              data: null,
              success: false,
              msg: "Org ID is needed.",
            });

          if (!invite.email)
            return Response.json({
              data: null,
              success: false,
              msg: "Email is needed.",
            });

          const sendInvite = await authn.user.invite({
            inviter: "rockyessel76@gmail.com",
            email: invite.email,
            callback: CB_URI,
            state: invite.orgId,
          });

          console.log(sendInvite.result);

          // console.log("sendInvite: ", sendInvite.result);
          if (sendInvite.result.id) {
            const insertRecord = await Invitation.create({
              ...invite,
            });

            // console.log("insertRecord: ", insertRecord);

            if (insertRecord)
              return Response.json({
                success: true,
                data: null,
                msg: "Invite sent successfully.I",
              });
          }
        } catch (error) {
          console.log(error);
          return Response.json({
            success: false,
            error: "Something went wrong.",
          });
        }

      default:
        return Response.json({ success: false, error: "Method not allowed." });
    }
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};

export { InvitationOrgHandler as POST, InvitationOrgHandler as GET };
