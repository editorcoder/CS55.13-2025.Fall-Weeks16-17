import { defineConfig } from "cypress";

// Export Cypress configuration
export default defineConfig({
  // Configure end-to-end testing settings
  e2e: {
    // Set base URL for tests
    baseUrl: "http://localhost:5173",
    // Setup node event listeners
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});