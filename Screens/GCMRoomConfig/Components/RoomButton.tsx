import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  CONSTANT_firstColor,
  CONSTANT_white,
  CONSTANT_seventeenthColor,
} from '../../../constants/colorPallete';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../constants/fonts';
import Icon from '../../../CommonComponents/Icon/Icon';
import {CONSTANT_closeIcon} from '../../../constants/imageAssets';

export interface RoomButtonProps {
  text: string;
  clickAction: () => any;
  isSelected?: boolean;
  deleteAction?: () => any;
  disabled?: boolean;
}

const RoomButton = ({
  text = '',
  clickAction = () => null,
  isSelected = false,
  deleteAction = () => null,
  disabled,
}: RoomButtonProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={clickAction}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        isSelected ? {backgroundColor: CONSTANT_firstColor} : null,
        disabled ? styles.disable : {},
      ]}>
      <Text
        style={[
          styles.roomTextStyle,
          isSelected ? {color: CONSTANT_white} : null,
        ]}>
        {text}
      </Text>
      {isSelected ? (
        <TouchableOpacity
          activeOpacity={0.2}
          onPress={deleteAction}
          style={styles.deleteButton}>
          <Icon name={CONSTANT_closeIcon} size={8} color={CONSTANT_white} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: CONSTANT_white,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginBottom: 16,
    marginRight: 8,
    borderWidth: 1,
    borderColor: CONSTANT_firstColor,
  },
  roomTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14),
    color: CONSTANT_firstColor,
  },
  deleteButton: {
    position: 'absolute',
    right: -4,
    top: -4,
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: CONSTANT_seventeenthColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disable: {opacity: 0.2},
});

export default RoomButton;
