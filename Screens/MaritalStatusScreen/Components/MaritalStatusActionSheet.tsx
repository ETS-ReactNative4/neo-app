import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import CustomCheckBox, {
  ICheckBoxData,
  ISuggestedDetails
} from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import ActionSheet from "../../../CommonComponents/ActionSheet/ActionSheet";

interface MaritalStatusActionSheetProps {
  actionSheetRef: React.MutableRefObject<any>;
  checkboxData: ICheckBoxData[];
}

const MaritalStatusActionSheet = ({
  actionSheetRef,
  checkboxData = []
}: MaritalStatusActionSheetProps) => {
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
    <ActionSheet
      interactableRef={actionSheetRef}
      panelStartingPosition={responsiveHeight(20)}
    >
      <View style={styles.actionSheetContainer}>
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
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    flex: 1,
    padding: 56
  },
  sectionTitleContainerStyle: {
    marginBottom: 24
  },
  bodyContainerStyle: {
    height: 280
  },
  footerContainerStyle: {
    marginTop: 24
  }
});

export default MaritalStatusActionSheet;
