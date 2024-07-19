import { defineConfig } from 'astro/config';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: 'https://frederickchan179.github.io',
  base: 'ESG-69-Solution',
  integrations: [react()]
});