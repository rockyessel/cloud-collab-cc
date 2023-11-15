export const isProduction = process.env.NODE_ENV === "production";

const domain = process.env.PANGEA_DOMAIN || process.env.NEXT_PUBLIC_CLIENT_DOMAIN;
const token = process.env.PANGEA_INTEL_TOKEN || process.env.NEXT_PUBLIC_CLIENT_TOKEN

const hostedURL = process.env.NEXT_PUBLIC_HOSTED_URL;

const redirectURI = isProduction
  ? process.env.NEXT_PUBLIC_URI_PRO
  : process.env.NEXT_PUBLIC_URI_DEV;

if (!domain) {
  throw new Error("Environment variable PANGEA_DOMAIN is not defined.");
}

if (!token) {
  throw new Error("Environment variable PANGEA_INTEL_TOKEN is not defined.");
}


if (!hostedURL) {
  throw new Error(
    "Environment variable NEXT_PUBLIC_HOSTED_URL is not defined."
  );
}
export const PANGEA_OBJ = {
  domain,
  token,
  redirectURI,
  hostedURL,
};
