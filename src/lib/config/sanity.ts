import { createClient, ClientConfig } from '@sanity/client';

if (!process.env.SANITY_SECRET_TOKEN) {
  throw new Error('SANITY_SECRET_TOKEN environment variable is missing.');
}

if (!process.env.SANITY_PROJECT_ID) {
  throw new Error('SANITY_PROJECT_ID environment variable is missing.');
}

if (!process.env.SANITY_API_VERSION) {
  throw new Error('SANITY_API_VERSION environment variable is missing.');
}

const config: ClientConfig = {
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  token: process.env.SANITY_SECRET_TOKEN,
};

export const Client = createClient(config);
