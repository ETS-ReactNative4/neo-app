import React from "react";
import SimpleButton from "./SimpleButton";
import constants from "../../constants/constants";

const SimpleButtonTestCases = [
  {
    title: "Simple button renders correctly",
    Component: <SimpleButton text={"Click me"} textColor={"white"} />
  },
  {
    title: "Simple button with click action",
    Component: (
      <SimpleButton
        text={"Click me"}
        textColor={"white"}
        action={() => alert("clicked")}
      />
    )
  },
  {
    title: "Simple button transparent background with border",
    Component: (
      <SimpleButton
        text={"Click me"}
        textColor={constants.firstColor}
        color={"transparent"}
        hasBorder={true}
      />
    )
  },
  {
    title: "Simple button button with left icon",
    Component: (
      <SimpleButton
        text={"Click me"}
        textColor={"white"}
        icon={constants.busIcon}
        iconSize={14}
      />
    )
  },
  {
    title: "Simple button button with right icon",
    Component: (
      <SimpleButton
        text={"Click me"}
        textColor={"white"}
        icon={constants.busIcon}
        iconSize={14}
        rightIcon={true}
      />
    )
  },
  {
    title: "Simple button with underlay color",
    Component: (
      <SimpleButton
        text={"Click me"}
        textColor={"white"}
        underlayColor={constants.secondColor}
      />
    )
  }
];

export default SimpleButtonTestCases;
