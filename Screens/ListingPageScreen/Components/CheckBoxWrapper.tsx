import React, { Fragment } from "react";
import { Text, StyleSheet } from "react-native";
import CustomCheckBox from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";
import { ICheckBoxGroup } from "./FilterActionSheet";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";
import {
  CONSTANT_shade1,
  CONSTANT_black1
} from "../../../constants/colorPallete";

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

const styles = StyleSheet.create({
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
  }
});

export default CheckBoxWrapper;
