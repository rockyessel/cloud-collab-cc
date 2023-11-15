import { connectToDB } from "@/lib/config/mongoose";
import Invitation from "@/lib/model/invitation.model";
import Organisation from "@/lib/model/organisation.model";
import { InitialOrganizationData, UserProps } from "@/interface";

// For now, there's no way for us to know if the users has accepted the invite
// So we need another function to check if a user is invited, so if, then we add the
// to the org's.

// How we do that is, when the user signup or sign-in, we list all invites, then
// we check against the users email, then see if he's already joined, if so, then we do nothing.
// but if the user's email is found in the org invites, and he's not a member, then we add him to be a member.
// Done.

export const POST = async (request: Request) => {
  connectToDB();
  try {
    try {
      const user: { user: UserProps } = await request.json();

      // Extract needed values
      const {
        email,
        active_token: { id: memberId },
      } = user.user;

      const foundInvitation = await Invitation.findOne({
        email,
        state: "pending",
      });

      if (!foundInvitation)
        return Response.json({
          success: false,
          data: null,
          msg: "No invitation found.",
        });
      // console.log("foundInvitation: ", foundInvitation);

      const foundOrg: InitialOrganizationData | null =
        await Organisation.findById(foundInvitation.orgId);

      // Check existence
      // console.log("foundOrg: ", foundOrg);

      if (!foundOrg)
        return Response.json({
          success: false,
          data: null,
          msg: "Org not found.",
        });

      if (memberId) {
        const isAMember = foundOrg.members.includes(memberId);

        // console.log("isAMember: ", isAMember);

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

          // console.log("update: ", updatedOrg);

          // Check it exist
          const foundInvitation = await Invitation.findOne({
            email,
            state: "pending",
          });

          if (foundInvitation) {
            // Find and update the invitation state to 'accepted'
            const updatedInviteState = await Invitation.findOneAndUpdate(
              { email, orgId: foundOrg._id, state: "pending" },
              { $set: { state: "accepted" } },
              { new: true }
            );

            // console.log("updatedOrg: ", updatedOrg);
            // console.log("updatedInviteState: ", updatedInviteState);

            return Response.json({
              success: true,
              data: null,
              msg: "Added successfully.",
            });
          }
        }
      } else {
        return Response.json({
          success: false,
          data: null,
          msg: "Member ID not found.",
        });
      }
    } catch (error) {
      console.log(error);
      return Response.json({
        success: false,
        data: null,
        msg: error,
      });
    }
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};
