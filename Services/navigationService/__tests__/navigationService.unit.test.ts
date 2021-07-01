import * as navigation from "../navigationService";

test("Validating navigation service", () => {
  const myCustomObject = {
    test: "test",
    testObject: {
      more: "data"
    },
    testArray: [1, 2, 3, 4]
  };
  const serviceUpdate = navigation.setNavigationService(myCustomObject);
  expect(serviceUpdate).toEqual(myCustomObject);
  expect(navigation.default.navigation).toEqual(myCustomObject);
});
