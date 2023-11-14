import { connectToDB } from "@/lib/config/mongoose";
import Session from "@/lib/model/session.model";
import { isSameDay } from "date-fns";

const SessionOrgHandler = async (request: Request) => {
  connectToDB();
  try {
    switch (request.method) {
      case "GET":
        try {
          const { searchParams } = new URL(request.url);
          const orgId = searchParams.get("orgId");

          if (!orgId)
            return Response.json({
              success: false,
              msg: "Org is required.",
            });

          const foundSession = await Session.find({ orgId });

          if (!foundSession)
            return Response.json({
              success: false,
              error: "No session found.",
              data: null,
            });

          const today = new Date();
          const todaySessions = foundSession.filter((session) =>
            isSameDay(new Date(session.loginTime), today)
          );

          const previousDaysSessions = foundSession.filter(
            (session) => !isSameDay(new Date(session.loginTime), today)
          );

          console.log("todaySessions: ", todaySessions);
          console.log("previousDaysSessions: ", previousDaysSessions);

          return Response.json({
            success: true,
            data: {
              today: todaySessions,
              previousDays: previousDaysSessions,
            },
          });
        } catch (error) {
          return Response.json({ success: false, error });
        }

      case "POST":
        try {
          const { session } = await request.json();
          if (!session) {
            return Response.json({
              success: false,
              data: {},
              msg: "Session data is undefined.",
            });
          }

          if (!session.orgId)
            return Response.json({ data: null, msg: "Org ID is required." });

          if (!session.userId)
            return Response.json({ data: null, msg: "User ID is required." });

          const createdSession = await Session.create({ ...session });

          if (createdSession) {
            console.log("Session created successfully:", createdSession);
            return Response.json({ success: true, data: createdSession });
          } else {
            return Response.json({
              success: false,
              data: {},
              msg: "Failed to create session.",
            });
          }
        } catch (error) {
          console.log(error);
          return Response.json({ success: false, data: {}, msg: error });
        }

      default:
        return Response.json({ success: false, error: "Method not allowed." });
    }
  } catch (error) {
    return Response.json({ success: false, error: "Internal server error" });
  }
};

export { SessionOrgHandler as POST, SessionOrgHandler as GET };
