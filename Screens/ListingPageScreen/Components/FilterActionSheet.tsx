import React from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView
} from "react-native";
import { IFilters } from "../filterOptions/filterOptions";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar/BottomButtonBar";
import RadioBoxWrapper from "./RadioBoxWrapper";
import CheckBoxWrapper from "./CheckBoxWrapper";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import { CONSTANT_closeIcon } from "../../../constants/imageAssets";
import {
  CONSTANT_black1,
  CONSTANT_white,
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

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
      <View style={[styles.headerContainerStyle]}>
        <TouchableOpacity
          style={styles.closeIconStyle}
          activeOpacity={0.8}
          onPress={closeFilter}
        >
          <Icon name={CONSTANT_closeIcon} size={24} color={CONSTANT_black1} />
        </TouchableOpacity>

        <Text style={styles.headerTextStyle}>Filters</Text>
      </View>

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
  headerContainerStyle: {
    backgroundColor: CONSTANT_white,
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  closeIconStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    height: 56
  },
  headerTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 24)
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
