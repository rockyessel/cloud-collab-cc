import { connectToDB } from "@/lib/config/mongoose";
import ResponseTime from "@/lib/model/responseTime.model";

const ResponseTimeHandler = async (request: Request) => {
  connectToDB();
  try {
    switch (request.method) {
      case "POST":
        try {
          const { orgId, time } = await request.json();

          const newRecord = {
            timestamp: new Date(),
            time: time,
          };

          const foundOrg = await ResponseTime.findOne({
            organizationId: orgId,
          });

          if (foundOrg) {
            const update = await ResponseTime.findOneAndUpdate(
              { organizationId: orgId },
              { $push: { responseTime: newRecord } }
            );

            return Response.json({ status: true, data: update });
          }

          const create = await ResponseTime.create({
            organizationId: orgId,
            responseTime: [newRecord],
          });

          return Response.json({ status: true, data: create });
        } catch (error) {
          return Response.json({ status: false, error });
        }

      case "GET":
        const { searchParams } = new URL(request.url);
        const orgId = searchParams.get("orgId");

        const getData = await ResponseTime.find({ organizationId: orgId });

        return Response.json({ status: true, data: getData });
      default:
        return Response.json({ status: false, error: "Method not allowed" });
    }
  } catch (error) {
    return Response.json({ status: false, error: "Internal server error" });
  }
};

export { ResponseTimeHandler as GET, ResponseTimeHandler as POST };
