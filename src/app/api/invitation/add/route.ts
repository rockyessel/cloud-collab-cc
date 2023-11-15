import { PANGEA_OBJ } from "@/lib/config/pangea";
import { connectToDB } from "@/lib/config/mongoose";
import Invitation from "@/lib/model/invitation.model";
import Organisation from "@/lib/model/organisation.model";
import { PangeaConfig, AuthNService } from "pangea-node-sdk";
import { InitialOrganizationData, UserProps } from "@/interface";

// For now, there's no way for us to know if the users has accepted the invite
// So we need another function to check if a user is invite, so if, then we add the
// to the org's.

// How we do that is, when the user signup or sign-in, we list all invites, then
// we check against the users email, then see if he's already joined, if so, then we do nothing.
// but if the user's email is found in the org invites, and he's not a member, then we add him to be a member.
// Done.

export const POST = async (request: Request) => {
  const { domain, token } = PANGEA_OBJ;

  const config = new PangeaConfig({ domain });
  const authn = new AuthNService(token, config);

  connectToDB();
  try {
    try {
      const user: {user:UserProps} = await request.json();
      
      // Extrct
      const { email, active_token: { id: memberId }} = user.user;


      const listResp = await authn.user.invites.list();
      console.log(`List success. ${listResp.result.invites} invites sent`);
      const orgs = listResp.result.invites.filter((org) => org.email === email);
      console.log("orgs: ", orgs);
      const userInvitation = orgs[0];
      const foundOrg: InitialOrganizationData | null =
        await Organisation.findById(userInvitation.state);
      console.log(foundOrg);
      if (foundOrg && memberId) {
        const isAMember = foundOrg.members.includes(memberId);

        console.log("isAMember: ", isAMember);
        if (isAMember) {
          return Response.json({
            success: false,
            data: null,
            msg: "Already a member",
          });
        } else {
          const updatedOrg = await Organisation.findOneAndUpdate(
            { _id: foundOrg._id },
            { $push: { members: memberId } },
            { new: true }
          );

          // Check it exist
          const foundInvitation = await Invitation.findOne({ email });

          if (foundInvitation) {
            // Find and update the invitation state to 'accepted'
            const updatedInviteState = await Invitation.findOneAndUpdate(
              { email, orgId: foundOrg._id, state: "pending" },
              { $set: { state: "accepted" } },
              { new: true }
            );

            console.log("updatedOrg: ", updatedOrg);
            console.log("updatedInviteState: ", updatedInviteState);

            return Response.json({
              success: true,
              data: null,
              msg: "Added successfully.",
            });
          }
        }
      } else {
        return Response.json({
          success: true,
          data: null,
          msg: "Org or Member ID not found.",
        });
      }
    } catch (error) {
      console.log(error);
      return Response.json({
        success: true,
        data: null,
        msg: error,
      });
    }
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};
