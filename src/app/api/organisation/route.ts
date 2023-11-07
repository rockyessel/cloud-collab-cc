import { connectToDB } from "@/lib/config/mongoose";
import Organisation from "@/lib/model/organisation.model";

const OrganisationHandler = async (request: Request) => {
  connectToDB();
  try {
    switch (request.method) {
      case "POST":
        try {
          const { org } = await request.json();

          // org
          console.log(org);

          const create = await Organisation.create({ ...org });

          console.log(create);

          return Response.json({ status: true, data: create });
        } catch (error) {
          return Response.json({ status: false, error });
        }

      case "GET":
        try {
          const { searchParams } = new URL(request.url);
          const ownerId = searchParams.get("ownerId");

          // const orgs = await 
        } catch (error) {
          return Response.json({ status: false, error });
        }

      default:
        break;
    }
  } catch (error) {
    return Response.json({ status: false, error: "Internal server error" });
  }
};

export { OrganisationHandler as POST };
