import { NativeModules } from "react-native";

// Mock RNCNetInfo
NativeModules.RNCNetInfo = {
  getCurrentState: jest.fn(() => Promise.resolve()),
  addListener: jest.fn(),
  removeListeners: jest.fn()
};

// Mock RNAnalytics (see https://github.com/segmentio/analytics-react-native/issues/32)
NativeModules.RNAnalytics = {};
const mockAnalytics = jest.genMockFromModule("@segment/analytics-react-native");
jest.mock("@segment/analytics-react-native", () => mockAnalytics);
