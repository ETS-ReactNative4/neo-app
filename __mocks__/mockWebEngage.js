// const mockWebEngage = jest.genMockFromModule("react-native-webengage");
// jest.mock("react-native-webengage", () => mockWebEngage);

/**
 * Developer notes
 *
 * 1. Autogen mocks for react-native-webengage do not work because of how the module plays with default exports and prototypes.
 * 2. This is how you mock an ES6 class constructor (note the use of `return function() {}` instead of `() => {}`).
 */

jest.mock("react-native-webengage", () => {
  return function() {
    return {
      init: jest.fn(),
      track: jest.fn(),
      screen: jest.fn(),
      user: {
        login: jest.fn(),
        setAttribute: jest.fn()
      }
    };
  };
});
