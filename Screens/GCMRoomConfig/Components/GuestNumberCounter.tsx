import React from 'react';
import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_addIcon,
  CONSTANT_lineBreakIcon,
} from '../../../constants/imageAssets';
import {CONSTANT_firstColor} from '../../../constants/colorPallete';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../constants/fonts';

export interface GuestNumberCounterProps {
  counterText: string;
  addAction: () => any;
  subAction: () => any;
  disableAdd?: boolean;
  disableSub?: boolean;
}

const GuestNumberCounter = ({
  counterText,
  addAction,
  subAction,
  disableAdd,
  disableSub,
}: GuestNumberCounterProps) => {
  return (
    <View style={styles.guestCounterContainer}>
      <TouchableOpacity
        onPress={subAction}
        activeOpacity={0.2}
        disabled={disableSub}
        style={[
          styles.buttonContainer,
          disableSub ? styles.disableButton : null,
        ]}>
        <Icon
          name={CONSTANT_lineBreakIcon}
          color={CONSTANT_firstColor}
          size={8}
        />
      </TouchableOpacity>
      <Text style={styles.counterText}>{counterText}</Text>
      <TouchableOpacity
        onPress={addAction}
        activeOpacity={0.2}
        disabled={disableAdd}
        style={[
          styles.buttonContainer,
          disableAdd ? styles.disableButton : null,
        ]}>
        <Icon name={CONSTANT_addIcon} color={CONSTANT_firstColor} size={8} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  guestCounterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  buttonContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: CONSTANT_firstColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  counterText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 17),
    color: CONSTANT_firstColor,
  },
  disableButton: {
    opacity: 0.5,
  },
});

export default GuestNumberCounter;
