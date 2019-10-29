import getLocaleString from "../getLocaleString";

test("locale string should return price with currency prefix when input is a number", () => {
  expect(getLocaleString(300)).toBe("₹300.00");
});

test("locale string should return price with currency prefix when input is a string", () => {
  expect(getLocaleString("300")).toBe("₹ 300");
});
