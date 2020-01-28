import React, { useState } from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import SelectablePortraitImage from "./SelectablePortraitImage";

const SelectablePortraitImageWrapper = () => {
  const [isSelectImage, setSelectImage] = useState<boolean>(false);

  const clickSelectedImage = () => {
    setSelectImage(!isSelectImage);
  };

  return (
    <SelectablePortraitImage
      onPress={() => clickSelectedImage()}
      isSelected={isSelectImage}
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
