import renderer from "react-test-renderer";

const testRunner = testCase => {
  test(testCase.title, () => {
    const tree = renderer.create(testCase.Component).toJSON();
    expect(tree).toMatchSnapshot();
  });
};

export default testRunner;
