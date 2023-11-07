import { withAPIAuthentication } from "@/lib";
import { PANGEA_OBJ } from "@/lib/config/pangea";
import { cookies } from "next/headers";

const { domain, token: serverToken } = PANGEA_OBJ;

const TestHandler = async () => {
  const cookieStore = cookies();

  const token = cookieStore.get("token")?.value;
  const SERVICEURL = `https://authn.${domain}/v1/client/token/check`;
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
};

const d = withAPIAuthentication(TestHandler);

export { d as POST };
