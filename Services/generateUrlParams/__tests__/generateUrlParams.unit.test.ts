import generateUrlParams from "../generateUrlParams";

test("generating url params", () => {
  expect(generateUrlParams({ foo: "bar", true: false })).toBe(
    "?foo=bar&true=false"
  );
});

test("generating url params for empty object", () => {
  expect(generateUrlParams({})).toBe("?");
});

test("generating url params with undefined", () => {
  // @ts-ignore - To run this test...
  expect(generateUrlParams(undefined)).toBe("");
});
