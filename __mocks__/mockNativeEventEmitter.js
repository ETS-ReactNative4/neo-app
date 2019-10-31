jest.mock("NativeEventEmitter", () =>
  jest.genMockFromModule("NativeEventEmitter")
);
