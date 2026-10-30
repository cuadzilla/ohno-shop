import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    // Same project ID as in sanity.config.js
    projectId: 'uk9gulqh',
    dataset: 'production',
  },
  // Pick a unique name; this becomes https://<studioHost>.sanity.studio
  studioHost: 'vivohno',
});
