import {Box, Text, AnimatedInputBox} from '@pyt/micros';
import moment from 'moment';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../CommonComponents/Icon/Icon';
import {CONSTANT_fontPrimaryRegular} from '../../../constants/fonts';
import {CONSTANT_arrowDown} from '../../../constants/imageAssets';
import {
  CONSTANT_GCMDateFormat,
  CONSTANT_voucherDateFormat,
} from '../../../constants/styles';
// import CountryCodePicker from '../../MobileNumberScreen/Components/CountryCodePicker';
import {DateInputBox} from '../../StayHotelSearchScreen/Components/DateInputBox';
import {PassengerErrorType} from '../StayHotelReviewScreen';

export const Passengers = ({
  firstName,
  mobileNumber,
  email,
  updatePaxData,
  birthDay,
  index,
  salutation,
  countryPhoneCode,
  error = {},
}: {
  error: PassengerErrorType;
  firstName: string;
  mobileNumber: string | number;
  email: string;
  updatePaxData: (data: {
    index: number;
    key: string;
    value: string | number;
  }) => unknown;
  birthDay: string;
  index: number;
  salutation: string;
  countryPhoneCode: string;
}) => {
  const [codePickerVisible, setCodePickerVisible] = useState(false);
  const toggleCodePicker = () => setCodePickerVisible(!codePickerVisible);
  return (
    <Box>
      <Box flexDirection="row" marginBottom={12}>
        {['Mr', 'Ms'].map(text => (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              updatePaxData({index, key: 'salutation', value: text})
            }>
            <Box
              height={53}
              width={50}
              backgroundColor={salutation === text ? '#00774F' : '#F2F2F2'}
              justifyContent="center"
              alignItems="center"
              borderTopLeftRadius={text === 'Mr' ? 8 : 0}
              borderBottomLeftRadius={text === 'Mr' ? 8 : 0}
              borderTopRightRadius={text === 'Mr' ? 0 : 8}
              borderBottomRightRadius={text === 'Mr' ? 0 : 8}
              borderWidth={1}
              borderRightWidth={text === 'Mr' ? 0 : 1}
              borderColor={error.salutation ? '#EF435D' : '#F2F2F2'}>
              <Text
                fontFamily={CONSTANT_fontPrimaryRegular}
                fontSize={15}
                color={salutation === text ? '#FFFFFF' : '#333333'}>
                {text}
              </Text>
            </Box>
          </TouchableOpacity>
        ))}

        <AnimatedInputBox
          label="Name"
          value={firstName}
          onChangeText={value =>
            updatePaxData({index, key: 'firstName', value})
          }
          containerProps={{
            marginStart: 12,
            flex: 1,
          }}
          fontFamily={CONSTANT_fontPrimaryRegular}
          fontSize={14}
          lineHeight={18}
          paddingStart={0}
          color="#333333"
          error={error.firstName}
        />
      </Box>

      <Box flexDirection="row">
        <TouchableOpacity activeOpacity={0.7} onPress={toggleCodePicker}>
          <Box
            height={53}
            width={50}
            backgroundColor={'#F2F2F2'}
            justifyContent="center"
            alignItems="center"
            borderRadius={8}
            marginEnd={12}
            flexDirection="row">
            <Text
              fontFamily={CONSTANT_fontPrimaryRegular}
              fontSize={14}
              lineHeight={18}
              color={'#333333'}>
              {countryPhoneCode}
            </Text>
            <Icon name={CONSTANT_arrowDown} color={'#333333'} size={10} />
          </Box>
        </TouchableOpacity>
        <AnimatedInputBox
          label="Phone"
          value={mobileNumber}
          onChangeText={value =>
            updatePaxData({index, key: 'mobileNumber', value})
          }
          keyboardType="phone-pad"
          containerProps={{
            marginBottom: 12,
            flex: 1,
          }}
          fontFamily={CONSTANT_fontPrimaryRegular}
          fontSize={14}
          lineHeight={18}
          color="#333333"
          paddingStart={0}
          error={error.mobileNumber}
        />
      </Box>
      <AnimatedInputBox
        label="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={value => updatePaxData({index, key: 'email', value})}
        containerProps={{
          marginBottom: 12,
        }}
        fontFamily={CONSTANT_fontPrimaryRegular}
        fontSize={14}
        lineHeight={18}
        color="#333333"
        paddingStart={0}
        error={error.email}
        autoCapitalize="none"
      />
      <DateInputBox
        label="Date of birth"
        date={birthDay}
        dateFormat={CONSTANT_voucherDateFormat}
        displayFormat={CONSTANT_GCMDateFormat}
        onDateSelect={(date: string) => {
          updatePaxData({index, key: 'birthDay', value: date});
        }}
        maxDate={new Date(moment().format(CONSTANT_voucherDateFormat))}
        error={error.birthDay}
        containerProps={{flex: 1}}
      />
      {/* <CountryCodePicker
        isVisible={codePickerVisible}
        onClose={toggleCodePicker}
        selectCountryCode={(code: string) => {
          updatePaxData({index, key: 'countryPhoneCode', value: code});
        }}
      /> */}
    </Box>
  );
};
