jest.mock("@react-native-firebase/analytics", () => ({
  analytics: jest.fn(() => ({
    logEvent: jest.fn(),
    setAnalyticsCollectionEnabled: jest.fn(),
    setUserId: jest.fn(),
    setUserProperties: jest.fn(),
    setCurrentScreen: jest.fn()
  }))  
}));
