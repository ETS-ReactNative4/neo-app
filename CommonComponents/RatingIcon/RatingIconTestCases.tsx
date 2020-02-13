import React from "react";
import RatingIcon from "./RatingIcon";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import { CONSTANT_thirdColor } from "../../constants/colorPallete";

const RatingIconTestCases: ITestCase[] = [
  {
    title: "Rating Icon",
    Component: <RatingIcon numOfStars={1} rating={0} />
  },
  {
    title: "Rating Icon Active State",
    Component: <RatingIcon numOfStars={1} rating={1} />
  },
  {
    title: "Rating Icon Custom Color",
    Component: (
      <RatingIcon numOfStars={1} rating={1} activeColor={CONSTANT_thirdColor} />
    )
  },
  {
    title: "Multiple Rating Icon",
    Component: <RatingIcon rating={4} numOfStars={5} />
  },
  {
    title: "Rating Icon Custom Color With Active State",
    Component: (
      <RatingIcon rating={3} numOfStars={5} activeColor={CONSTANT_thirdColor} />
    )
  }
];

export default RatingIconTestCases;
