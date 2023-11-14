import { connectToDB } from "@/lib/config/mongoose";
import Session from "@/lib/model/session.model";
import { PangeaConfig, AuthNService, PangeaErrors } from "pangea-node-sdk";
import { isSameDay } from "date-fns";
import { PANGEA_OBJ } from "@/lib/config/pangea";
import Invitation from "@/lib/model/invitation.model";
import Organisation from "@/lib/model/organisation.model";
import { InitialOrganizationData } from "@/interface";

// For now, there's no way for us to know if the users has accepted the invite
// So we need another function to check if a user is invite, so if, then we add the
// to the org's.

// How we do that is, when the user signup or sign-in, we list all invites, then
// we check against the users email, then see if he's already joined, if so, then we do nothing.
// but if the user's email is found in the org invites, and he's not a member, then we add him to be a member.
// Done.

const AddMemberToOrg = async (request: Request) => {
  const { domain, token } = PANGEA_OBJ;

  const config = new PangeaConfig({ domain });
  const authn = new AuthNService(token, config);

  connectToDB();
  try {
    switch (request.method) {
      case "GET":
        try {
          const { searchParams } = new URL(request.url);
          const email = searchParams.get("email");
          const memberId = searchParams.get("member");
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
              // return already a member
            } else {
              const updatedOrg = await Organisation.findOneAndUpdate(
                { _id: foundOrg._id },
                { $push: { members: memberId } },
                { new: true }
              );

              console.log("updatedOrg: ", updatedOrg);
            }
          }
          return Response.json({ list: orgs });
        } catch (error) {
          console.log(error);
        }

      default:
        return Response.json({ success: false, error: "Method not allowed." });
    }
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};

// For now, there's no way for us to know if the users has accopted the invite
// So we need another function to check if a user is invite, so if, then we add the
// to the org's.

// How we do that is, when the user signup or signin, we list all invites, then
// we check against the users email, then see if he's already joined, if so, then we do nothing.
// but if the user's email is found in the org invites, and he's not a member, then we add him to be a member.
// Done.

export { AddMemberToOrg as POST, AddMemberToOrg as GET };
