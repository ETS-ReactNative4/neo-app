import React, { Fragment } from "react";
import { Text, StyleSheet } from "react-native";
import {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  // @ts-ignore
} from "react-native-simple-radio-button";
import {
  CONSTANT_firstColor,
  CONSTANT_shade2,
  CONSTANT_black1,
  CONSTANT_shade1
} from "../../../constants/colorPallete";
import { IRadioGroup } from "./FilterActionSheet";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";

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

const styles = StyleSheet.create({
  filterListHeading: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 23),
    marginBottom: 12
  },
  labelStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18, 20),
    marginBottom: 20
  }
});

export default RadioBoxWrapper;
