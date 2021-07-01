import React from "react";
import renderer from "react-test-renderer";
import DottedLoading from "../DottedLoading";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.clearAllTimers();
});

test("renders the DottedLoading component correctly", done => {
  const props = {
    text: "just some string",
    numOfDots: 10,
    textStyle: { color: "red" },
    animationSpeed: 200
  };

  const component = <DottedLoading {...props} />;
  let tree;
  tree = renderer.create(component);

  expect(tree.toJSON()).toMatchSnapshot();

  // Travel to 200ms in the future.
  jest.advanceTimersByTime(props.animationSpeed);
  // Re-render the DOM.
  tree.update(component);

  // Test that `setInterval` has been called once.
  expect(setInterval).toHaveBeenCalledTimes(1);
  expect(setInterval).toHaveBeenLastCalledWith(
    expect.any(Function),
    props.animationSpeed
  );

  // Make sure we have 1 dot added after the first `setInterval`.
  expect(tree.toJSON().children[0]).toEqual(props.text + ".");

  // Make sure we have 2 dots added after the second `setInterval`.
  jest.advanceTimersByTime(props.animationSpeed);
  tree.update(component);
  expect(tree.toJSON().children[0]).toEqual(props.text + ".".repeat(2));

  // Make sure we have max number of dots added after the tenth `setInterval`.
  jest.advanceTimersByTime(props.animationSpeed * 8); // 8 here because we've already called advanceTimers twice.
  tree.update(component);
  expect(tree.toJSON().children[0]).toEqual(props.text + ".".repeat(10));

  // Make sure we go back to zero dots added at the eleventh `setInterval`.
  jest.advanceTimersByTime(props.animationSpeed);
  tree.update(component);
  expect(tree.toJSON().children[0]).toEqual(props.text);

  // Unmount and make sure the animation `setInterval` is cleared.
  tree.unmount();
  expect(clearInterval).toHaveBeenCalledTimes(1);

  done();
});
