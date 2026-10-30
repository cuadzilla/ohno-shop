import { defineCliConfig } from 'sanity/cli';

export default defineCliConfig({
  api: {
    // Same project ID as in sanity.config.js
    projectId: 'YOUR_PROJECT_ID',
    dataset: 'production',
  },
  // Pick a unique name; this becomes https://<studioHost>.sanity.studio
  studioHost: 'YOUR-STUDIO-NAME',
});
