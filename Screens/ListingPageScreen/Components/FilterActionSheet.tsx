import React from "react";
import { ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { IFilters, INumericFilters } from "../filterOptions/filterOptions";
import { responsiveHeight } from "react-native-responsive-dimensions";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar/BottomButtonBar";
import RadioBoxWrapper from "./RadioBoxWrapper";
import CheckBoxWrapper from "./CheckBoxWrapper";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import { CONSTANT_white } from "../../../constants/colorPallete";
import FilterModalHeader from "./FilterModalHeader";

export interface ICheckBoxGroup extends IFilters {
  type: "Checkbox";
}

export interface INumericCheckBoxGroup extends INumericFilters {
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
  closeFilter: () => any;
  resetFilter: () => any;
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
  applyFilter,
  closeFilter,
  resetFilter
}: IFilterActionSheetProps) => {
  return (
    <SafeAreaView style={styles.filterActionSheetContainer}>
      <FilterModalHeader title={"Filters"} closeAction={closeFilter} />
      <ScrollView style={styles.scrollContainer}>
        <BlankSpacer height={24} />
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
        <BlankSpacer height={88} />
      </ScrollView>

      <BottomButtonBar
        containerStyle={styles.bottomBar}
        leftButtonName={"Reset"}
        leftButtonAction={() => {
          resetFilter();
        }}
        rightButtonName={"Apply"}
        rightButtonAction={applyFilter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterActionSheetContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  scrollContainer: {
    height: responsiveHeight(100),
    paddingHorizontal: 24
  },
  bottomBar: {
    paddingBottom: 24
  }
});

export default FilterActionSheet;
