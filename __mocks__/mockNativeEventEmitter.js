// jest.mock("NativeEventEmitter", () =>
//   jest.genMockFromModule("NativeEventEmitter")
// );

// From https://stackoverflow.com/questions/58088834/cannot-find-module-eventemitter-from-setupjest-js-with-react-native-0-61-0
// Ref - https://github.com/facebook/react-native/blob/master/Libraries/EventEmitter/__mocks__/NativeEventEmitter.js
jest.mock(
  "../node_modules/react-native/Libraries/EventEmitter/NativeEventEmitter"
);
