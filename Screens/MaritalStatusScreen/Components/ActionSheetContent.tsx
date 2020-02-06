import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import CustomCheckBox, {
  ICheckBoxData,
  ISuggestedDetails
} from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";

interface ActionSheetContentProps {
  checkboxData: ICheckBoxData[];
}

const ActionSheetContent = ({ checkboxData }: ActionSheetContentProps) => {
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
    <View style={styles.actionSheetContentStyle}>
      <SectionTitle
        smallTitle={"TRAVELLERS’ DETAILS"}
        title={"Care to tell us who you normally travel with?"}
        titleNumberOfLines={2}
        containerStyle={styles.sectionTitleContainerStyle}
      />

      <View style={styles.bodyContainerStyle}>
        <ScrollView showsVerticalScrollIndicator={false}>
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
        </ScrollView>
      </View>

      <View style={styles.footerContainerStyle}>
        <PrimaryButton text={"Done"} clickAction={() => {}} />
        <XSensorPlaceholder />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionSheetContentStyle: {
    flex: 1
  },
  sectionTitleContainerStyle: {
    marginBottom: 24
  },
  bodyContainerStyle: {
    flex: 1
  },
  footerContainerStyle: {
    marginTop: 24
  }
});

export default ActionSheetContent;
