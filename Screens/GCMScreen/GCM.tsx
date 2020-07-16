import React, { useState } from "react";
import GCMViewer from "../GCMFormScreen/Components/GCMViewer";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_GCM,
  SCREEN_GCM_CITY_PICKER,
  SCREEN_GCM_ROOM_CONFIG,
  SCREEN_GCM_NATIONALITY_PICKER
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
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import { getCountry } from "react-native-localize";
import { INationalityOption } from "../GCMNationalityPicker/GCMNationalityPicker";

type RequestCallbackNavType = AppNavigatorProps<typeof SCREEN_GCM>;

export interface GCMProps extends RequestCallbackNavType {}

const GCM = ({ navigation, route }: GCMProps) => {
  const {
    title = "",
    bannerImage = "https://pickyourtrail-guides-images.imgix.net/misc/hungary.jpeg",
    costingConfig,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSubmit = (options: ICostingConfig) => null
  } = route.params || {};

  const [currentCountry] = useState(getCountry());

  const [isSubmitAttempted, setIsSubmitAttempted] = useState<boolean>(false);

  const goBack = () => navigation.goBack();

  const onSubmitForm = () => {
    setIsSubmitAttempted(true);

    const departureAirport = formFields.departingFrom?.airportCode ?? null;
    const departureDate = moment(formFields.departingOn).format(
      CONSTANT_costingDateFormat
    );
    const hotelGuestRoomConfigurations = formFields.roomDetails;
    const travelType = formFields.travellingAs?.value ?? null;
    const nationality = formFields.nationality?.value ?? null;

    if (currentCountry === "IN") {
      if (
        departureAirport &&
        departureDate &&
        hotelGuestRoomConfigurations.length &&
        travelType
      ) {
        onSubmit({
          arrivalAirport: departureAirport,
          departureAirport,
          departureDate,
          hotelGuestRoomConfigurations,
          tripType: travelType
        });
        navigation.goBack();
      }
    } else {
      if (
        nationality &&
        departureDate &&
        hotelGuestRoomConfigurations.length &&
        travelType
      ) {
        onSubmit({
          nationality,
          departureDate,
          hotelGuestRoomConfigurations,
          tripType: travelType
        });
        navigation.goBack();
      }
    }
  };

  const [formFields, formUpdateMethods] = useGCMForm(costingConfig);

  const openCityPicker = () => {
    navigation.navigate(SCREEN_GCM_CITY_PICKER, {
      title,
      bannerImage,
      onSelect: (selectedCity: IIndianCity) => {
        formUpdateMethods.updateDepartingFrom(selectedCity);
      }
    });
  };

  const openNationalityPicker = () => {
    navigation.navigate(SCREEN_GCM_NATIONALITY_PICKER, {
      title,
      bannerImage,
      onSelect: (selectedNation: INationalityOption) => {
        formUpdateMethods.updateNationality(selectedNation);
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
      <TranslucentStatusBar />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.tripContainerStyle]}
      >
        <Text style={styles.titleStyle}>Enter trip details</Text>

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

        {currentCountry === "IN" ? (
          <PickerInputField
            onPressAction={openCityPicker}
            label={"DEPARTING FROM"}
            value={
              formFields.departingFrom ? formFields.departingFrom.cityName : ""
            }
            placeholder="Departing from"
            hasError={
              isSubmitAttempted && !formFields.departingFrom ? true : false
            }
          />
        ) : (
          <PickerInputField
            onPressAction={openNationalityPicker}
            label={"NATIONALITY"}
            value={formFields.nationality ? formFields.nationality.name : ""}
            placeholder="Nationality"
            hasError={
              isSubmitAttempted && !formFields.nationality ? true : false
            }
          />
        )}

        <PickerInputField
          onPressAction={showDatePicker}
          label={"DEPARTING ON"}
          value={
            formFields.departingOn
              ? moment(formFields.departingOn).format(CONSTANT_GCMDateFormat)
              : ""
          }
          placeholder="Departing on"
          hasError={false}
        />

        <PickerInputField
          onPressAction={toggleTravellingAsPickerModal}
          label={"TRIP TYPE"}
          value={formFields.travellingAs ? formFields.travellingAs.text : ""}
          placeholder="Trip type"
          hasError={isSubmitAttempted && !formFields.travellingAs}
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
            placeholder="Room details"
            hasError={isSubmitAttempted && !formFields.roomDetails.length}
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
