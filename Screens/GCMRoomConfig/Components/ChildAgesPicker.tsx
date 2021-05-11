import React, {Fragment, useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {
  HotelGuestRoomChildAgesType,
  HotelGuestRoomChildAgesLabel,
} from '../../GCMScreen/hooks/useGCMForm';
import Picker from '../../../CommonComponents/Picker/Picker';
import {CONSTANT_dropDownArrowDarkIcon} from '../../../constants/imageAssets';
import Icon from '../../../CommonComponents/Icon/Icon';
import {
  CONSTANT_shade3,
  CONSTANT_black2,
} from '../../../constants/colorPallete';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../constants/fonts';

export interface IChildAgesOption {
  text: HotelGuestRoomChildAgesLabel;
  value: HotelGuestRoomChildAgesType;
}

const childAges: IChildAgesOption[] = [
  {
    text: '1 year',
    value: 1,
  },
  {
    text: '5 year',
    value: 5,
  },
];

export interface ChildAgesPickerProps {
  selectedAge: HotelGuestRoomChildAgesType;
  onChange: (selectedAge: HotelGuestRoomChildAgesType) => any;
  childAgeOptions?: number[];
}

const ChildAgesPicker = ({
  selectedAge,
  onChange,
  childAgeOptions,
}: ChildAgesPickerProps) => {
  const [isPickerVisibile, setIsPickerVisibile] = useState<boolean>(false);

  const togglePicker = () => setIsPickerVisibile(!isPickerVisibile);

  const onPickerSelect = (option: IChildAgesOption) => {
    onChange(option.value);
  };

  return (
    <Fragment>
      <TouchableOpacity style={styles.buttonContainer} onPress={togglePicker}>
        <Text style={styles.buttonText}>{selectedAge}</Text>
        <Icon name={CONSTANT_dropDownArrowDarkIcon} color={CONSTANT_shade3} />
      </TouchableOpacity>
      <Picker
        title={'Select Child Age'}
        // @ts-ignore
        onSelectOption={onPickerSelect}
        options={childAgeOptions || childAges}
        isVisible={isPickerVisibile}
        closeModal={togglePicker}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    marginVertical: 8,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderWidth: 1,
    borderColor: CONSTANT_shade3,
    borderRadius: 5,
  },
  buttonText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15),
    color: CONSTANT_black2,
    marginRight: 4,
  },
});

export default ChildAgesPicker;
