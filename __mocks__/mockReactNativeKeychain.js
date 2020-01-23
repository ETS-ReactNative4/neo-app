jest.mock("react-native-keychain", () => {
  return {
    setGenericPassword: jest.fn(() => {}),
    getGenericPassword: jest.fn(() => {}),
    resetGenericPassword: jest.fn(() => {})
  };
});
