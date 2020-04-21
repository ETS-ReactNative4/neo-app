import React, { useState } from "react";
import GCMViewer from "../GCMFormScreen/Components/GCMViewer";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_GCM,
  SCREEN_GCM_CITY_PICKER,
  SCREEN_GCM_ROOM_CONFIG
} from "../../NavigatorsV2/ScreenNames";
import { Text, StyleSheet, ScrollView } from "react-native";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";
import { CONSTANT_black1 } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import useGCMForm, {
  IIndianCity,
  travellingAsOptions,
  IHotelGuestRoomConfig,
  preDefinedRoomConfig,
  ICostingConfig,
  ITravellingAsPickerOption
} from "./hooks/useGCMForm";
import PickerInputField from "../../CommonComponents/PickerInput/PickerInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import {
  CONSTANT_GCMDateFormat,
  CONSTANT_costingDateFormat
} from "../../constants/styles";
import Picker from "../../CommonComponents/Picker/Picker";

type RequestCallbackNavType = AppNavigatorProps<typeof SCREEN_GCM>;

export interface GCMProps extends RequestCallbackNavType {}

const GCM = ({ navigation, route }: GCMProps) => {
  const {
    title = "",
    bannerImage = "https://pickyourtrail-guides-images.imgix.net/misc/hungary.jpeg",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit = (options: ICostingConfig) => null
  } = route.params || {};

  const [isSubmitAttempted, setIsSubmitAttempted] = useState<boolean>(false);

  const goBack = () => navigation.goBack();

  const onSubmitForm = () => {
    setIsSubmitAttempted(true);

    const arrivalAirport = formFields.departingFrom?.airportCode ?? null;
    const departureDate = moment(formFields.departingOn).format(
      CONSTANT_costingDateFormat
    );
    const hotelGuestRoomConfigurations = formFields.roomDetails;
    const travelType = formFields.travellingAs?.value ?? null;

    if (
      arrivalAirport &&
      departureDate &&
      hotelGuestRoomConfigurations.length &&
      travelType
    ) {
      onSubmit({
        arrivalAirport,
        departureAirport: arrivalAirport,
        departureDate,
        hotelGuestRoomConfigurations,
        travelType
      });
    }
  };

  const [formFields, formUpdateMethods] = useGCMForm();

  const openCityPicker = () => {
    navigation.navigate(SCREEN_GCM_CITY_PICKER, {
      title,
      bannerImage,
      onSelect: (selectedCity: IIndianCity) => {
        formUpdateMethods.updateDepartingFrom(selectedCity);
      }
    });
  };

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    formUpdateMethods.updateDepartingOn(date);
    hideDatePicker();
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    isTravellingAsPickerVisible,
    setIsTravellingAsPickerVisible
  ] = useState(false);

  const toggleTravellingAsPickerModal = () =>
    setIsTravellingAsPickerVisible(!isTravellingAsPickerVisible);

  const onSelectTravellingAs = (option: ITravellingAsPickerOption) =>
    formUpdateMethods.updateTravellingAs(option);

  const openRoomConfigPicker = () => {
    navigation.navigate(SCREEN_GCM_ROOM_CONFIG, {
      title,
      bannerImage,
      roomConfig: formFields.roomDetails,
      onSelect: (roomConfig: IHotelGuestRoomConfig[]) => {
        formUpdateMethods.updateRoomDetails(roomConfig);
      }
    });
  };

  const roomDetails: [number, number, number] = formFields.roomDetails.reduce(
    (accumulator, roomConfig) => {
      accumulator[0] = accumulator[0] + 1;
      accumulator[1] = accumulator[1] + roomConfig.adultCount;
      accumulator[2] = accumulator[2] + roomConfig.childAges.length;

      return accumulator;
    },
    [0, 0, 0]
  ); // room, adults, children

  const [roomCount, adultCount, childCount] = roomDetails;

  return (
    <GCMViewer bannerImage={bannerImage} backAction={goBack} title={title}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.tripContainerStyle]}
      >
        <Text style={styles.titleStyle}>Enter Trip Details</Text>

        <Picker
          title="Travelling as"
          options={travellingAsOptions}
          isVisible={isTravellingAsPickerVisible}
          closeModal={toggleTravellingAsPickerModal}
          onSelectOption={onSelectTravellingAs}
        />

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          date={formFields.departingOn}
          minimumDate={tomorrow}
        />

        <PickerInputField
          onPressAction={openCityPicker}
          label={"DEPARTING FROM"}
          value={
            formFields.departingFrom ? formFields.departingFrom.cityName : ""
          }
          placeholder="Departing From"
          hasError={
            isSubmitAttempted && !formFields.departingFrom ? true : false
          }
        />

        <PickerInputField
          onPressAction={showDatePicker}
          label={"DEPARTING ON"}
          value={
            formFields.departingOn
              ? moment(formFields.departingOn).format(CONSTANT_GCMDateFormat)
              : ""
          }
          placeholder="Departing On"
          hasError={false}
        />

        <PickerInputField
          onPressAction={toggleTravellingAsPickerModal}
          label={"TRAVELLING AS"}
          value={formFields.travellingAs ? formFields.travellingAs.text : ""}
          placeholder="Travelling as"
          hasError={false}
        />

        {preDefinedRoomConfig[formFields.travellingAs?.value ?? ""] ? null : (
          <PickerInputField
            onPressAction={openRoomConfigPicker}
            label={"ROOM DETAILS"}
            value={
              formFields.roomDetails.length
                ? `${roomCount} room${roomCount > 1 ? "s" : ""} ${
                    adultCount
                      ? `- ${adultCount} adult${adultCount > 1 ? "s" : ""}`
                      : ""
                  } ${
                    childCount
                      ? `- ${childCount} child${childCount > 1 ? "ren" : ""}`
                      : ""
                  }`
                : ""
            }
            placeholder="Room Details"
            hasError={false}
          />
        )}
      </ScrollView>

      <BottomButtonBar
        disableLeftButton
        rightButtonName={"View updated cost"}
        rightButtonAction={onSubmitForm}
      />
    </GCMViewer>
  );
};

const styles = StyleSheet.create({
  tripContainerStyle: {
    padding: 24
  },
  titleStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 24
  }
});

export default GCM;
