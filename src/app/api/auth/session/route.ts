import { PANGEA_OBJ } from "@/lib/config/pangea";
import { NextRequest } from "next/server";
import { cookies } from "next/headers";

const { domain, token: serverToken } = PANGEA_OBJ;

const UserSession = async (request: NextRequest) => {
  try {
    const cookieStore = cookies();

    const token = cookieStore.get("pangae-token")?.value;

    console.log("/api/auth/session: ", token);

    const SERVICEURL = `https://authn.${domain}/v1/client/token/check`;
    try {
      const response = await fetch(SERVICEURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${serverToken}`,
        },
        body: JSON.stringify({ token }),
      });

      const responseJSON = await response.json();

      return Response.json({ responseJSON });
    } catch (error) {
      return Response.json({ error });
    }
  } catch (error) {
    return Response.json({ error });
  }
};

export { UserSession as GET, UserSession as POST };
