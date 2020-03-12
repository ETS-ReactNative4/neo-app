import React from "react";
import { ScrollView, View, StyleSheet, Alert } from "react-native";
import { IFilters } from "../filterOptions/filterOptions";
import {
  responsiveHeight,
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar.js/BottomButtonBar";
import { CONSTANT_xSensorAreaHeight } from "../../../constants/styles";
import { isIphoneX } from "react-native-iphone-x-helper";
import RadioBoxWrapper from "./RadioBoxWrapper";
import CheckBoxWrapper from "./CheckBoxWrapper";

export interface ICheckBoxGroup extends IFilters {
  type: "Checkbox";
}

export interface IRadioGroup extends IFilters {
  type: "Radio";
}

export type filterGroups = ICheckBoxGroup | IRadioGroup;

export interface IFilterActionSheetProps {
  interests: IRadioGroup;
  selectInterest: (val: string) => any;
  travelDuration: ICheckBoxGroup;
  selectTravelDuration: (val: string) => any;
  estimatedBudget: ICheckBoxGroup;
  selectEstimatedBudget: (val: string) => any;
  propertyRating: ICheckBoxGroup;
  selectPropertyRating: (val: string) => any;
  applyFilter: () => any;
}

const FilterActionSheet = ({
  interests,
  selectInterest,
  travelDuration,
  selectTravelDuration,
  estimatedBudget,
  selectEstimatedBudget,
  propertyRating,
  selectPropertyRating,
  applyFilter
}: IFilterActionSheetProps) => {
  return (
    <View style={styles.filterActionSheetContainer}>
      <View style={styles.scrollContainer}>
        <ScrollView>
          <RadioBoxWrapper options={interests} action={selectInterest} />
          <CheckBoxWrapper
            options={travelDuration}
            action={selectTravelDuration}
          />
          <CheckBoxWrapper
            options={estimatedBudget}
            action={selectEstimatedBudget}
          />
          <CheckBoxWrapper
            options={propertyRating}
            action={selectPropertyRating}
          />
        </ScrollView>
      </View>
      <BottomButtonBar
        containerStyle={styles.bottomBar}
        leftButtonName={"Reset"}
        leftButtonAction={() => Alert.alert("Click Reset")}
        rightButtonName={"Apply"}
        rightButtonAction={applyFilter}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterActionSheetContainer: {
    width: responsiveWidth(100),
    height: responsiveHeight(100)
  },
  scrollContainer: {
    height: responsiveHeight(80),
    marginTop: responsiveHeight(20)
  },
  bottomBar: {
    paddingBottom: 20 + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  }
});

export default FilterActionSheet;
