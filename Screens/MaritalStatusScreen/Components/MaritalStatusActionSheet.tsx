import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";

import SectionTitle from "../../../CommonComponents/SectionTitle/SectionTitle";
import CustomCheckBox from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import XSensorPlaceholder from "../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import ActionSheet from "../../../CommonComponents/ActionSheet/ActionSheet";
import { ITravellingWithOptions } from "../MaritalStatus";

export interface MaritalStatusActionSheetProps {
  actionSheetRef: React.MutableRefObject<any>;
  checkboxData: ITravellingWithOptions[];
  onNext: () => any;
  onChange: (id: number) => any;
}

const MaritalStatusActionSheet = ({
  actionSheetRef,
  checkboxData = [],
  onNext = () => null,
  onChange = () => null
}: MaritalStatusActionSheetProps) => {
  return (
    <ActionSheet interactableRef={actionSheetRef}>
      <View style={styles.actionSheetContainer}>
        <SectionTitle
          smallTitle={"TRAVELLERS’ DETAILS"}
          title={"Care to tell us who you normally travel with?"}
          titleNumberOfLines={2}
          containerStyle={styles.sectionTitleContainerStyle}
        />

        <View style={styles.bodyContainerStyle}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {checkboxData.map((dataObj, index) => {
              const onSelect = () => {
                onChange(dataObj.id);
              };

              return (
                <CustomCheckBox
                  key={index}
                  isChecked={dataObj.isSelected}
                  action={onSelect}
                  text={dataObj.text}
                />
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.footerContainerStyle}>
          <PrimaryButton text={"Done"} clickAction={onNext} />
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
    height: responsiveHeight(30)
  },
  footerContainerStyle: {
    marginTop: 24
  }
});

export default MaritalStatusActionSheet;
