jest.mock("@react-native-firebase/perf", () => ({
  perf: jest.fn(() => ({
    setPerformanceCollectionEnabled: jest.fn(),
    newHttpMetric: jest.fn(() => ({
      start: jest.fn(),
      putAttribute: jest.fn(),
      setHttpResponseCode: jest.fn(() => Promise.resolve(true))
    }))
  }))
}));
