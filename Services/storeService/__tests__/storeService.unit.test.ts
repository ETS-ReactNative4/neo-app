import * as store from "../storeService";

test("Validating store service", () => {
  const customObject = {
    test: "test",
    testObject: {
      more: "data"
    },
    testArray: [1, 2, 3, 4]
  };

  /**
   * Purpose of this test is to ensure the method is working properly
   * hence the typescript issue can be ignored.
   */
  // @ts-ignore
  const storeUpdate = store.updateStoreService(customObject);
  expect(storeUpdate).toEqual(customObject);
  expect(store.default).toEqual(customObject);
});
