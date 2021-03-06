import React, {useEffect, useState} from 'react';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
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
  error,
}: {
  label?: string;
  onDateSelect: (date: string) => unknown;
  date: string;
  minDate?: Date;
  maxDate?: Date;
  containerProps?: {};
  dateFormat?: string;
  displayFormat?: string;
  error?: boolean;
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
    <>
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
        error={error}
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
    </>
  );
};
