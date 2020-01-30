import React, { useState } from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import SelectablePortraitImage from "./SelectablePortraitImage";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerStyle: {
    width: 146
  }
});

const SelectablePortraitImageWrapper = () => {
  const [isSelectImage, setSelectImage] = useState<boolean>(false);

  const clickSelectedImage = () => {
    setSelectImage(!isSelectImage);
  };

  return (
    <SelectablePortraitImage
      onPress={() => clickSelectedImage()}
      isSelected={isSelectImage}
      imageSource={"https://d3lf10b5gahyby.cloudfront.net/city/paris.jpg"}
      containerStyle={styles.containerStyle}
    />
  );
};

const SelectablePortraitImageTestCases: ITestCase[] = [
  {
    title: "Selectable Portrait Image",
    Component: <SelectablePortraitImageWrapper />
  }
];

export default SelectablePortraitImageTestCases;
