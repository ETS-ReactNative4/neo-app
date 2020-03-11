import React, { Fragment } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import { IFilters } from "../filterOptions/filterOptions";
import {
  responsiveHeight,
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_firstColor,
  CONSTANT_shade2
} from "../../../constants/colorPallete";
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  // @ts-ignore
} from "react-native-simple-radio-button";
import CustomCheckBox from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";

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
}

const RadioBoxWrapper = ({
  options,
  action
}: {
  options: IRadioGroup;
  action: (val: string) => any;
}) => {
  return (
    <Fragment>
      <Text style={styles.filterListHeading}>{options.title}</Text>
      {options.options.map((option, optionIndex) => {
        const onSelect = () => {
          action(option.value);
        };

        const radioObject = {
          label: option.text,
          value: option.value
        };

        return (
          <RadioButton key={optionIndex}>
            <RadioButtonInput
              obj={radioObject}
              index={optionIndex}
              isSelected={option.isSelected}
              onPress={onSelect}
              borderWidth={1.8}
              buttonInnerColor={CONSTANT_firstColor}
              buttonOuterColor={CONSTANT_shade2}
              buttonSize={12}
              buttonOuterSize={20}
              buttonStyle={{}}
              buttonWrapStyle={{}}
            />
            <RadioButtonLabel
              obj={radioObject}
              index={optionIndex}
              labelHorizontal={true}
              onPress={onSelect}
              labelStyle={styles.labelStyle}
              labelWrapStyle={{}}
            />
          </RadioButton>
        );
      })}
    </Fragment>
  );
};

const CheckBoxWrapper = ({
  options,
  action
}: {
  options: ICheckBoxGroup;
  action: (val: string) => any;
}) => {
  return (
    <Fragment>
      <Text style={styles.filterListHeading}>{options.title}</Text>

      {options.options.map((option, optionIndex) => {
        const onSelect = () => {
          action(option.value);
        };
        return (
          <CustomCheckBox
            key={optionIndex}
            isChecked={option.isSelected}
            action={onSelect}
            text={option.text}
            checkIconSize={15}
            containerStyle={styles.checkBoxContainerStyle}
            checkboxStyle={styles.checkboxStyle}
            checkboxTextStyle={styles.checkboxTextStyle}
          />
        );
      })}
    </Fragment>
  );
};

const FilterActionSheet = ({
  interests,
  selectInterest,
  travelDuration,
  selectTravelDuration,
  estimatedBudget,
  selectEstimatedBudget,
  propertyRating,
  selectPropertyRating
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
  filterListHeading: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 23),
    marginBottom: 12
  },
  checkBoxContainerStyle: {
    marginBottom: 20
  },
  checkboxStyle: {
    width: 20,
    height: 20,
    borderWidth: 2
  },
  checkboxTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18, 23),
    paddingLeft: 10
  },
  labelStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18),
    marginBottom: 20
  }
});

export default FilterActionSheet;
