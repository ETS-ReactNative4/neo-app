import React from "react";
import RatingIcon from "./RatingIcon";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { CONSTANT_thirdColor } from "../../constants/colorPallete";

const RatingIconTestCases: ITestCase[] = [
  {
    title: "Rating Icon",
    Component: <RatingIcon rating={1} />
  },
  {
    title: "Rating Icon Active State",
    Component: <RatingIcon rating={1} isActive={true} />
  },
  {
    title: "Rating Icon Custom Color",
    Component: <RatingIcon rating={1} customStarColor={CONSTANT_thirdColor} />
  },
  {
    title: "Rating Icon Custom Color With Active State",
    Component: (
      <RatingIcon
        rating={1}
        isActive={true}
        customStarColor={CONSTANT_thirdColor}
      />
    )
  },
  {
    title: "Multiple Rating Icon",
    Component: <RatingIcon rating={5} />
  },
  {
    title: "Multiple Rating Icon With Active State",
    Component: <RatingIcon rating={5} isActive={true} />
  }
];

export default RatingIconTestCases;
