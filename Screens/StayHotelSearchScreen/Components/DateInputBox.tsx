import React, {useEffect, useState} from 'react';
import {AnimatedInputBox} from '../animated-input-box';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Box, InputBox, Text} from '@pyt/micros';
import {TouchableOpacity} from 'react-native';
import {
  CONSTANT_costingDateFormat,
  CONSTANT_GCMDateFormat,
} from '../../../constants/styles';
import moment from 'moment';
export const DateInputBox = ({
  label,
  onDateSelect = () => null,
  //   handleCancel = () => null,
  date = new Date(),
  minDate,
  fontFamily,
  containerProps = {},
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const toggleDatePicker = () => setShowDatePicker(prevShow => !prevShow);

  const handleConfirm = date => {
    toggleDatePicker();
    const newDate = moment(date).format(CONSTANT_costingDateFormat);
    // setSelectedDate(date);
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

//   useEffect(()=>{

//   },[date]) 
  //   const hideDatePicker = () => {
  //       setShowDatePicker(false)
  //       handleCancel
  //   }

//   console.log( selectedDate , selectedDate? moment(selectedDate).format(CONSTANT_GCMDateFormat):null)
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={toggleDatePicker} style={containerProps}>
      {/* <AnimatedInputBox
        label={label ||"Date of birth"}
        editable={false}
        containerProps={containerProps}
        value={
          selectedDate
            ? moment(selectedDate).format(CONSTANT_GCMDateFormat)
            : ''
        }
      /> */}
      <Box 
         height={51}
         borderRadius={8}
         backgroundColor={'#EDEDED'}
         paddingHorizontal={16}
         paddingVertical={8}
      >
        <Text
            fontSize={11}
            lineHeight={14}
            color={'#777777'}
            fontFamily={fontFamily}
            transform={[{ translateY: selectedDate ? 0 : 8 }]}>
           {label}
        </Text>
        <Text
            fontSize={13}
            lineHeight={14}
            marginTop={8}
            color={'#333333'}
            fontFamily={fontFamily}>
                {selectedDate}
            {/* { selectedDate
            ? moment(selectedDate).format(CONSTANT_GCMDateFormat)
            : ''} */}
        </Text>
      </Box>
      
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker}
        date={new Date(date)}
        minimumDate={minDate}
      />
    </TouchableOpacity>
  );
};
