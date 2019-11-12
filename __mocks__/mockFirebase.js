jest.mock("react-native-firebase", () => ({
  messaging: jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve("myMockToken"))
  })),
  notifications: jest.fn(() => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn()
  })),
  analytics: jest.fn(() => ({
    logEvent: jest.fn(),
    setAnalyticsCollectionEnabled: jest.fn(),
    setUserId: jest.fn(),
    setUserProperties: jest.fn(),
    setCurrentScreen: jest.fn()
  })),
  perf: jest.fn(() => ({
    setPerformanceCollectionEnabled: jest.fn()
  }))
}));
