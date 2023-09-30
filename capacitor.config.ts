import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter.catNames',
  appName: 'CatNames',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
