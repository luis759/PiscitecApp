import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.piscitec.app',
  appName: 'Piscitec',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '0',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'none',
      SplashScreenDelay: '0'
    }
  }
};

export default config;
