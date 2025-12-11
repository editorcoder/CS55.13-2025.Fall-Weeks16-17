import type { CapacitorConfig } from '@capacitor/cli';

// Define Capacitor configuration object
const config: CapacitorConfig = {
  // Set application ID for native builds
  appId: 'io.ionic.starter',
  // Set application display name
  appName: 'TCTCG Card Gallery',
  // Set web directory for built files
  webDir: 'dist'
};

// Export configuration as default
export default config;
