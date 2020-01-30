import React from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import PortraitImage from "./PortraitImage";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  imageStyle: {
    width: 146,
    height: 200,
    borderRadius: 4
  }
});

const PortraitImageTestCases: ITestCase[] = [
  {
    title: "Portrait Image",
    Component: (
      <PortraitImage
        imageSource={"https://d3lf10b5gahyby.cloudfront.net/city/paris.jpg"}
        portraitImageStyle={styles.imageStyle}
      />
    )
  }
];

export default PortraitImageTestCases;
