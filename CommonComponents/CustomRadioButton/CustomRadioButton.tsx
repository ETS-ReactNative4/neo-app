import React, { Fragment } from "react";
import { StyleSheet, Text } from "react-native";

import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
  // eslint-disable-next-line tsc/config
} from "react-native-simple-radio-button";

import {
  CONSTANT_firstColor,
  CONSTANT_shade2,
  CONSTANT_shade1,
  CONSTANT_seventhColor
} from "../../constants/colorPallete";

import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";

interface CustomRadioButtonProps {
  options: string[];
  selectedIndex?: number;
  // minDisplayCount: number;
  // onChange: () => any;
}

/**
 * TODO: The Custom radio button UI only complete. Functionality not be done.
 * @author Suhail
 */

const CustomRadioButton = ({
  options,
  selectedIndex
}: CustomRadioButtonProps) => {
  const seeMoreClickAction = () => {};

  return (
    <Fragment>
      <RadioForm animation={true}>
        {options.map((item, itemIndex) => {
          const radioObject = {
            label: item,
            value: item
          };

          const onPress = () => {
            // onChange(itemIndex);
          };

          return (
            <RadioButton key={itemIndex}>
              <RadioButtonInput
                obj={radioObject}
                index={itemIndex}
                isSelected={selectedIndex === itemIndex}
                onPress={onPress}
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
                index={itemIndex}
                labelHorizontal={true}
                onPress={onPress}
                labelStyle={styles.labelStyle}
                labelWrapStyle={{}}
              />
            </RadioButton>
          );
        })}
      </RadioForm>
      <Text onPress={seeMoreClickAction} style={styles.seeMoreTextStyle}>
        + See more
      </Text>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  labelStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18),
    marginBottom: 20
  },

  seeMoreTextStyle: {
    color: CONSTANT_seventhColor,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18)
  }
});

export default CustomRadioButton;
