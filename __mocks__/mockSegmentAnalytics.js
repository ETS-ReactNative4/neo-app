import { NativeModules } from "react-native";

// // Mock RNAnalytics (see https://github.com/segmentio/analytics-react-native/issues/32)
NativeModules.RNAnalytics = {};
// const mockAnalytics = jest.genMockFromModule("@segment/analytics-react-native");
// jest.mock("@segment/analytics-react-native", () => mockAnalytics);

// From https://github.com/segmentio/analytics-react-native/issues/32#issuecomment-547471997
jest.mock("@segment/analytics-react-native", () => ({
  setup: () => jest.fn(),
  identify: () => jest.fn(),
  reset: () => jest.fn(),
  enable: () => jest.fn(),
  disable: () => jest.fn(),
  screen: () => jest.fn(),
  track: () => jest.fn()
}));
