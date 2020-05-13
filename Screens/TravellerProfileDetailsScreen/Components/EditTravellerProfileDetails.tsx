import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import {
  CONSTANT_white,
  CONSTANT_shade3
} from "../../../constants/colorPallete";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import {
  CONSTANT_xSensorAreaHeight,
  CONSTANT_GCMDateFormat
} from "../../../constants/styles";
import TextInputField from "../../../CommonComponents/TextInputField/TextInputField";
import { AppNavigatorProps } from "../../../NavigatorsV2/AppNavigator";
import {
  SCREEN_EDIT_TRAVELLER_PROFILE,
  SCREEN_GCM_CITY_PICKER
} from "../../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../../NavigatorsV2/Components/PrimaryHeader";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { observer, inject } from "mobx-react";
import User from "../../../mobx/User";
import { useKeyboard } from "@react-native-community/hooks";
import moment from "moment";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import PickerInputField from "../../../CommonComponents/PickerInput/PickerInput";
import { IIndianCity } from "../../GCMScreen/hooks/useGCMForm";
import { toastBottom } from "../../../Services/toast/toast";
import DebouncedAlert from "../../../CommonComponents/DebouncedAlert/DebouncedAlert";

type EditTravellerProfileDetailsNavType = AppNavigatorProps<
  typeof SCREEN_EDIT_TRAVELLER_PROFILE
>;

export interface EditTravellerProfileDetailsProps
  extends EditTravellerProfileDetailsNavType {
  userStore: User;
}

const EditTravellerProfileDetails = ({
  navigation,
  userStore
}: EditTravellerProfileDetailsProps) => {
  const { userDisplayDetails } = userStore;

  const {
    name: userName,
    email: userEmail,
    countryPhoneCode,
    mobileNumber,
    cityOfDeparture,
    dateOfBirth
  } = userDisplayDetails;

  const [name, onChangeName] = useState(userName || "");
  const [email, onChangeEmail] = useState(userEmail || "");
  const [city, onChangeCity] = useState(cityOfDeparture || "");
  const [dateOfBirthObject, onChangeDateOfBirthObject] = useState<
    Date | undefined
  >(dateOfBirth ? moment(dateOfBirth).toDate() : undefined);

  const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(
    false
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

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "Edit personal details"
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { keyboardShown } = useKeyboard();
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
      title: "",
      bannerImage: "",
      onSelect: (selectedCity: IIndianCity) => {
        onChangeCity(selectedCity.cityName);
      }
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
          : undefined
      })
      .then(result => {
        if (result) {
          toastBottom("Details Updated Successfully!");
          navigation.goBack();
        } else {
          DebouncedAlert("Error", "Unable to update user details!");
        }
      })
      .catch(() => {
        DebouncedAlert("Error", "Unable to update user details!");
      });
  };

  return (
    <View style={styles.editProfileDetailsContainer}>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        date={dateOfBirthObject || today}
        maximumDate={today}
      />
      <View style={styles.editProfileDetails}>
        <TextInputField
          label={"NAME"}
          value={name}
          onChangeText={text => onChangeName(text)}
          placeholder="Name"
          hasError={false}
        />

        <TextInputField
          label={"EMAIL"}
          value={email}
          onChangeText={text => onChangeEmail(text)}
          placeholder="Email"
          hasError={false}
        />

        <TextInputField
          label={"PHONE"}
          value={`${countryPhoneCode} ${mobileNumber}`}
          onChangeText={text => onChangeName(text)}
          placeholder="Phone"
          hasError={false}
          editable={false}
          textInputStyle={{ color: CONSTANT_shade3 }}
        />

        <PickerInputField
          label={"CITY OF DEPARTURE"}
          value={city}
          onPressAction={openCityPicker}
          placeholder="City of Departure"
          hasError={false}
          secondaryText={"GET LOCATION"}
          secondaryTextAction={openCityPicker}
        />

        <PickerInputField
          onPressAction={showDatePicker}
          label={"BIRTHDAY"}
          value={
            dateOfBirthObject
              ? moment(dateOfBirthObject).format(CONSTANT_GCMDateFormat)
              : ""
          }
          placeholder="Birthday"
          hasError={false}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <PrimaryButton text={"Save"} clickAction={submitForm} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  editProfileDetailsContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  editProfileDetails: {
    flex: 1,
    padding: 24
  },
  buttonWrapper: {
    paddingTop: 16,
    paddingHorizontal: 32,
    paddingBottom: 16 + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  }
});

export default ErrorBoundary()(
  inject("userStore")(observer(EditTravellerProfileDetails))
);
