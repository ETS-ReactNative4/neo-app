import React, { useState, useEffect } from "react";
import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import CustomCheckBox, {
  ICheckBoxData,
  ISuggestedDetails
} from "./CustomCheckBox";
import { StyleSheet, View } from "react-native";

const data: ICheckBoxData[] = [
  {
    text: "Lorem Ipsum"
  },
  {
    text: "Lorem Ipsum"
  },
  {
    text: "Lorem Ipsum"
  },
  {
    text: "Lorem Ipsum"
  },
  {
    text: "Lorem Ipsum"
  }
];

interface CheckBoxWrapperProps {
  checkboxData: ICheckBoxData[];
}

const styles = StyleSheet.create({
  checkboxWrapper: {
    padding: 40
  }
});

const CheckBoxWrapper = ({ checkboxData }: CheckBoxWrapperProps) => {
  const [suggestedDetails, setSuggestedDetails] = useState<ISuggestedDetails[]>(
    []
  );

  useEffect(() => {
    setSuggestedDetails(
      checkboxData.map((checkboxDataObj, dataIndex) => {
        return {
          index: dataIndex,
          text: checkboxDataObj.text,
          isChecked: false
        };
      })
    );
  }, [checkboxData]);

  const selectSuggestedDetails = (dataIndex: number) => {
    const suggestedList = [...suggestedDetails];
    suggestedList[dataIndex].isChecked = !suggestedList[dataIndex].isChecked;
    setSuggestedDetails(suggestedList);
  };

  return (
    <View style={styles.checkboxWrapper}>
      {suggestedDetails.map((dataObj, index) => {
        const onSelect = () => {
          selectSuggestedDetails(dataObj.index);
        };

        return (
          <CustomCheckBox
            key={index}
            isChecked={dataObj.isChecked}
            action={onSelect}
            text={dataObj.text}
          />
        );
      })}
    </View>
  );
};

const CustomCheckBoxTestCases: ITestCase[] = [
  {
    title: "Check box",
    Component: <CheckBoxWrapper checkboxData={data} />
  }
];

export default CustomCheckBoxTestCases;
