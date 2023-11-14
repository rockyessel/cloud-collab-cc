import { connectToDB } from "@/lib/config/mongoose";
import Organisation from "@/lib/model/organisation.model";

const OrganisationHandler = async (request: Request) => {
  connectToDB();
  try {
    switch (request.method) {
      case "POST":
        try {
          const { org } = await request.json();
          if (!org)
            return Response.json({
              success: false,
              data: {},
              msg: "Data is undefined.",
            });
          try {
            const created = await Organisation.create({ ...org });
            if (created) {
              console.log("reached here?3");
              console.log(created);
              return Response.json({ success: true, data: created });
            }
          } catch (error) {
            console.log(error);
            return Response.json({ success: false, data: {}, msg: error });
          }
          return Response.json({
            success: false,
            error: "Something went wrong.",
          });
        } catch (error) {
          return Response.json({ success: false, error });
        }

      case "GET":
        try {
          const { searchParams } = new URL(request.url);
          const memberId = searchParams.get("memberId");

          console.log("memberId: ", memberId);

          if (!memberId)
            return Response.json({ success: false, msg: "Id is required." });

          const foundOrganizations = await Organisation.find({
            members: memberId,
          });

          if (!foundOrganizations)
            return Response.json({
              success: false,
              error: "No organisation.",
              daa: null,
            });

          return Response.json({ success: true, data: foundOrganizations });
        } catch (error) {
          return Response.json({ success: false, error });
        }

      case "PUT":
        try {
          const { org } = await request.json();
          if (!org)
            return Response.json({
              success: false,
              data: {},
              msg: "Data is undefined.",
            });

          const { _id, ...orgData } = org;

          if (!_id)
            return Response.json({
              success: false,
              data: {},
              msg: "_id is required for updating.",
            });

          const updated = await Organisation.findByIdAndUpdate(_id, orgData, {
            new: true,
          });

          if (updated) {
            console.log("Organization updated successfully:", updated);
            return Response.json({ success: true, data: updated });
          } else {
            return Response.json({
              success: false,
              data: {},
              msg: "Organization not found for the given _id.",
            });
          }
        } catch (error) {
          console.log(error);
          return Response.json({ success: false, data: {}, msg: error });
        }

      default:
        return Response.json({ success: false, error: "IMethod not allowed." });
    }
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};

export {
  OrganisationHandler as POST,
  OrganisationHandler as GET,
  OrganisationHandler as PUT,
};
