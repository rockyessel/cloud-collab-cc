import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { PANGEA_OBJ } from "./config/pangea";

const { domain, token: serverToken } = PANGEA_OBJ;

const getBearerToken = (req: NextApiRequest) => {
  const authorizationHeader =
    req.headers instanceof Headers
      ? req.headers.get("authorization")
      : req.headers?.authorization;

  const authorizationHeaderParts = authorizationHeader?.split(" ");

  const bearerToken =
    authorizationHeaderParts?.[0]?.toLowerCase() === "bearer" &&
    authorizationHeaderParts?.[1];

  return bearerToken;
};
const validateToken = async (token: string) => {
  const result = false;

  console.log("Validate token: token", token);

  if (token) {
    const SERVICEURL = `https://authn.${domain}/v1/client/token/check`;
    console.log(SERVICEURL);
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

      return responseJSON.status === "Success";
    } catch (error) {
      console.error(
        "Error occurred during token validation. Looks like environment variables haven't been set correctly, or the service token has expired",
        error
      );
    }
  }
  return result;
};

export const withAPIAuthentication = (apiHandler: NextApiHandler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const isTokenValid = await validateToken(
      "ptu_3ccuqz4fhbgwkwuw3yjervhu3xygy7yg"
    );
    console.log("isTokenValid: ", isTokenValid);
    console.log("getBearerToken: ", getBearerToken(req));

    // console.log("token: ", token);
    // Authentication failed, return 401
    if (!isTokenValid) {
      return Response.json({ error: "Unauthorized" });
    }

    // We are good to continue
    return await apiHandler(req, res);
  };
};
