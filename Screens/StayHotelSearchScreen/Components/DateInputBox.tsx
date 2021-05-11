import React, {useEffect, useState} from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Box} from '@pyt/micros';
import {
  CONSTANT_costingDateFormat,
  CONSTANT_GCMDateFormat,
} from '../../../constants/styles';
import moment from 'moment';
import {ClickableInputBox} from './ClickableInputBox';
import {CONSTANT_fontPrimaryRegular} from '../../../constants/fonts';

export const DateInputBox = ({
  label,
  onDateSelect = () => null,
  date,
  minDate,
  maxDate,
  containerProps = {},
  dateFormat,
  displayFormat,
}: {
  label?: string;
  onDateSelect: (date: string) => unknown;
  date: string;
  minDate?: Date;
  maxDate?: Date;
  containerProps?: {};
  dateFormat?: string;
  displayFormat?: string;
}) => {
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<string>(date);
  const toggleDatePicker = () => setShowDatePicker(prevShow => !prevShow);

  const handleConfirm = (currentDate: Date) => {
    toggleDatePicker();
    const newDate = moment(currentDate).format(
      dateFormat || CONSTANT_costingDateFormat,
    );
    setSelectedDate(newDate);
    onDateSelect(newDate);
  };

  useEffect(() => {
    setSelectedDate(date);
  }, [date]);

  return (
    <Box flex={1} flexDirection="row">
      <ClickableInputBox
        label={label || 'Date of birth'}
        value={
          selectedDate
            ? moment(selectedDate).format(
                displayFormat || CONSTANT_GCMDateFormat,
              )
            : ''
        }
        containerProps={containerProps}
        fontFamily={CONSTANT_fontPrimaryRegular}
        onPress={toggleDatePicker}
      />
      <DateTimePickerModal
        isVisible={showDatePicker}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={toggleDatePicker}
        date={date ? new Date(date) : undefined}
        minimumDate={minDate}
        maximumDate={maxDate}
      />
    </Box>
  );
};
