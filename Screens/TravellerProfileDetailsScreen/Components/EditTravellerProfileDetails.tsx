import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {CONSTANT_white, theme} from '../../../constants/colorPallete';
import PrimaryButton from '../../../CommonComponents/PrimaryButton/PrimaryButton';
import {
  CONSTANT_xSensorAreaHeight,
  CONSTANT_GCMDateFormat,
  CONSTANT_voucherDateFormat,
} from '../../../constants/styles';
import {AppNavigatorProps} from '../../../NavigatorsV2/AppNavigator';
import {
  SCREEN_EDIT_TRAVELLER_PROFILE,
  SCREEN_GCM_CITY_PICKER,
} from '../../../NavigatorsV2/ScreenNames';
import PrimaryHeader from '../../../NavigatorsV2/Components/PrimaryHeader';
import ErrorBoundary from '../../../CommonComponents/ErrorBoundary/ErrorBoundary';
import {observer, inject} from 'mobx-react';
import User from '../../../mobx/User';
import {useKeyboard} from '@react-native-community/hooks';
import moment from 'moment';
import {IIndianCity} from '../../GCMScreen/hooks/useGCMForm';
import {toastBottom} from '../../../Services/toast/toast';
import DebouncedAlert from '../../../CommonComponents/DebouncedAlert/DebouncedAlert';
import {AnimatedInputBox, Text} from '@pyt/micros';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../../constants/fonts';
import {DateInputBox} from '../../StayHotelSearchScreen/Components/DateInputBox';
import {ClickableInputBox} from '../../StayHotelSearchScreen/Components/ClickableInputBox';
import logOut from '../../../Services/logOut/logOut';
import _isEqual from 'lodash/isEqual';
type EditTravellerProfileDetailsNavType = AppNavigatorProps<
  typeof SCREEN_EDIT_TRAVELLER_PROFILE
>;

export interface EditTravellerProfileDetailsProps
  extends EditTravellerProfileDetailsNavType {
  userStore: User;
}

const EditTravellerProfileDetails = ({
  navigation,
  userStore,
}: EditTravellerProfileDetailsProps) => {
  const {userDisplayDetails} = userStore;

  const {
    name: userName,
    email: userEmail,
    countryPhoneCode,
    mobileNumber,
    cityOfDeparture,
    dateOfBirth,
  } = userDisplayDetails;

  const [name, onChangeName] = useState(userName || '');
  const [email, onChangeEmail] = useState(userEmail || '');
  const [city, onChangeCity] = useState(cityOfDeparture || '');
  const [dateOfBirthObject, onChangeDateOfBirthObject] = useState<
    Date | undefined
  >(dateOfBirth ? moment(dateOfBirth).toDate() : undefined);

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false,
  );

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    onChangeDateOfBirthObject(date);
    hideDatePicker();
  };

  const logout = () => {
    logOut();
  };

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: 'Account details',
          rightElement: (
            <TouchableOpacity style={styles.logout} onPress={logout}>
              <Text
                color={theme.colors.primary003}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                fontSize={15}
                marginBottom={4}>
                Log out
              </Text>
            </TouchableOpacity>
          ),
        }),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {keyboardShown} = useKeyboard();
  const hasDataLoaded = useRef(false);

  useEffect(() => {
    if (!keyboardShown && hasDataLoaded.current) {
      // updated user details
    }
    hasDataLoaded.current = true;
  }, [keyboardShown]);

  const today = new Date();

  const openCityPicker = () => {
    navigation.navigate(SCREEN_GCM_CITY_PICKER, {
      title: '',
      bannerImage: '',
      onSelect: (selectedCity: IIndianCity) => {
        onChangeCity(selectedCity.cityName);
      },
    });
  };

  const submitForm = () => {
    userStore
      .updateUserDisplayDetails({
        name,
        email,
        cityOfDeparture: city,
        dateOfBirth: dateOfBirthObject
          ? dateOfBirthObject.toISOString()
          : undefined,
      })
      .then(result => {
        if (result) {
          toastBottom('Details Updated Successfully!');
          navigation.goBack();
        } else {
          DebouncedAlert('Error', 'Unable to update user details!');
        }
      })
      .catch(() => {
        DebouncedAlert('Error', 'Unable to update user details!');
      });
  };
  const isValueEdited =
    userName !== name ||
    userEmail !== email ||
    !moment(dateOfBirth).isSame(moment(dateOfBirthObject));

  return (
    <View style={styles.editProfileDetailsContainer}>
      <View style={styles.editProfileDetails}>
        <AnimatedInputBox
          label="Name"
          value={name}
          onChangeText={text => onChangeName(text)}
          containerProps={{
            marginBottom: 12,
          }}
          fontFamily={CONSTANT_fontPrimaryRegular}
          fontSize={14}
          lineHeight={18}
          paddingStart={0}
          color="#333333"
        />
        <AnimatedInputBox
          label="Email"
          value={email}
          onChangeText={text => onChangeEmail(text)}
          containerProps={{
            marginBottom: 12,
          }}
          fontFamily={CONSTANT_fontPrimaryRegular}
          fontSize={14}
          lineHeight={18}
          paddingStart={0}
          color="#333333"
          autoCapitalize="none"
          // error={error.firstName}
        />
        <DateInputBox
          label="Date of birth (DD/MM/YYYY)"
          date={
            dateOfBirthObject
              ? moment(dateOfBirthObject).format(CONSTANT_GCMDateFormat)
              : ''
          }
          dateFormat={CONSTANT_voucherDateFormat}
          displayFormat={CONSTANT_GCMDateFormat}
          onDateSelect={(date: string) => {
            console.log('dob', date);
            handleConfirm(new Date(date));
            // updatePaxData({index, key: 'birthDay', value: date});
          }}
          maxDate={new Date(moment().format(CONSTANT_voucherDateFormat))}
          // error={error.birthDay}
          containerProps={{
            marginBottom: 12,
            // flex: 1
          }}
        />

        <ClickableInputBox
          label="Phone"
          value={`${countryPhoneCode} ${mobileNumber}`}
          disabled
          fontFamily={CONSTANT_fontPrimaryRegular}
          containerProps={{
            marginBottom: 12,
          }}
        />
      </View>

      <View style={styles.buttonWrapper}>
        {isValueEdited && (
          <PrimaryButton text={'Save'} clickAction={submitForm} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfileDetailsContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
  },
  editProfileDetails: {
    flex: 1,
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  buttonWrapper: {
    paddingTop: 16,
    paddingHorizontal: 32,
    paddingBottom: 16 + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0),
  },
  logout: {
    position: 'absolute',
    right: 20,
  },
});

export default ErrorBoundary()(
  inject('userStore')(observer(EditTravellerProfileDetails)),
);
