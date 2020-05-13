import matchQueryWithText from "./matchQueryWIthText";

test("match query with text", () => {
  expect(matchQueryWithText("Sing", "singapore")).toBe(true);
});

test("match query with text with spaces", () => {
  expect(matchQueryWithText("s in g", "SINGA pore")).toBe(true);
});
