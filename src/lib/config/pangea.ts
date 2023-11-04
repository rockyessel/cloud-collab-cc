const domain = process.env.PANGEA_DOMAIN;
const token = process.env.PANGEA_INTEL_TOKEN;

if (!domain) {
  throw new Error("Environment variable PANGEA_DOMAIN is not defined.");
}

if (!token) {
  throw new Error("Environment variable PANGEA_INTEL_TOKEN is not defined.");
}

export const PANGEA_OBJ = {
  domain,
  token,
};
