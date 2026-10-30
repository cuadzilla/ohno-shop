import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Art Shop',

  // Paste your project ID from https://www.sanity.io/manage here
  projectId: 'YOUR_PROJECT_ID',
  dataset: 'production',

  plugins: [structureTool()],
  schema: { types: schemaTypes },
});
