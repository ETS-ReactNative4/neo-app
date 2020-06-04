import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TextInput, Platform } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import GCMViewer from "../GCMFormScreen/Components/GCMViewer";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_REQUEST_CALLBACK } from "../../NavigatorsV2/ScreenNames";
import { CONSTANT_requestCallbackCover } from "../../constants/imageAssets";
import FormTitle from "./Components/FormTitle";
import useRequestCallbackForm, {
  contactHoursMap,
  contactHoursType
} from "./hooks/useRequestCallbackForm";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import TextInputField from "../../CommonComponents/TextInputField/TextInputField";
import Picker from "../../CommonComponents/Picker/Picker";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";
import PickerInputField from "../../CommonComponents/PickerInput/PickerInput";
import useRequestCallbackApi, {
  IRequestCallbackRequestBody
} from "./hooks/useRequestCallbackApi";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { observer, inject } from "mobx-react";
import User from "../../mobx/User";
import { toastLong } from "../../Services/toast/toast";
import CountryCodePicker from "../MobileNumberScreen/Components/CountryCodePicker";
import MobileNumberInputField from "../../CommonComponents/MobileNumberInputField/MobileNumberInputField";
import { ICountryCodeData } from "../AppLoginScreen/Components/PhoneNumberInput";
import { useKeyboard } from "@react-native-community/hooks";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import validateEmail from "../../Services/validateEmail/validateEmail";
import validateMobileNumber from "../../Services/validateMobileNumber/validateMobileNumber";
import { CONSTANT_platformAndroid } from "../../constants/stringConstants";
import LeadSource from "../../mobx/LeadSource";

type RequestCallbackNavType = AppNavigatorProps<typeof SCREEN_REQUEST_CALLBACK>;

export interface RequestCallbackProps extends RequestCallbackNavType {
  userStore: User;
  leadSourceStore: LeadSource;
}

export interface ICallbackPickerOption {
  value: contactHoursType;
  text: string;
}

const RequestCallback = ({
  navigation,
  userStore,
  leadSourceStore,
  route
}: RequestCallbackProps) => {
  const campaignItineraryId = route.params?.campaignItineraryId ?? "";
  const itineraryId = route.params?.itineraryId ?? "";
  const slug = route.params?.slug ?? "";
  let prodType = route.params.prodType;

  const goBack = () => navigation.goBack();

  const [formFields, updateMethods] = useRequestCallbackForm();

  const [, submitRequestCallback] = useRequestCallbackApi();

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const [isModalVisible, setIsModalVisibile] = useState(false);

  const [isCountryCodePickerVisible, setIsCountryCodePickerVisible] = useState(
    false
  );

  const [countryCodeEmoji, setCountryCodeEmoji] = useState<string>("🇮🇳");

  const toggleCCVisibility = () =>
    setIsCountryCodePickerVisible(!isCountryCodePickerVisible);

  const toggleModalVisibility = () => setIsModalVisibile(!isModalVisible);

  const onSelectCountryCode = (
    selectedCountryCode: string,
    item: ICountryCodeData
  ) => {
    updateMethods.updateCountryCode(selectedCountryCode);
    setCountryCodeEmoji(item.emoji);
  };

  const onSelectContactHours = (option: ICallbackPickerOption) => {
    updateMethods.updateContactHours(option.value);
  };

  const submitCallbackRequest = async () => {
    setIsSubmitAttempted(true);
    if (
      formFields.email &&
      formFields.mobileNumber &&
      formFields.name &&
      formFields.contactHours &&
      validateEmail(formFields.email) &&
      validateMobileNumber(
        `${formFields.countryCode}${formFields.mobileNumber}`
      )
    ) {
      try {
        const requestBody: IRequestCallbackRequestBody = {
          countryPhoneCode: formFields.countryCode, // PT TODO: Modify countrycode
          email: formFields.email,
          mobileNumber: formFields.mobileNumber,
          name: formFields.name,
          canSendWhatsAppMessages: true, // PT TODO: need to know how
          preferredTime: formFields.contactHours,
          pageUrl: "", // PT TODO: required
          leadSource: {
            deviceType:
              Platform.OS === CONSTANT_platformAndroid ? "Android OS" : "iOS",
            prodType
          }
        };
        if (leadSourceStore.activeDeeplink) {
          requestBody.leadSource = {
            ...requestBody.leadSource,
            campaign: leadSourceStore.activeDeeplink["~campaign"],
            url: leadSourceStore.activeDeeplink.$canonical_url,
            lastRoute: leadSourceStore.activeDeeplink["~referring_link"]
          };
        }
        if (campaignItineraryId) {
          requestBody.campaignId = campaignItineraryId;
        }
        if (itineraryId) {
          requestBody.itineraryId = itineraryId;
        }
        if (slug) {
          requestBody.leadSource.prodType = "App_explore";
        }
        const result = await submitRequestCallback(requestBody);
        if (result) {
          toastLong(
            "Your dedicated travel expert will get in touch with you soon!"
          );
          navigation.goBack();
        } else {
          DebouncedAlert("Oops!", "Unable to submit form details.");
        }
      } catch (e) {
        DebouncedAlert("Oops!", "Unable to submit form details.");
      }
    }
  };

  const nameRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);
  const emailAddressRef = useRef<TextInput>(null);

  useEffect(() => {
    const { userDisplayDetails } = userStore;

    const { name, email, mobileNumber, countryPhoneCode } = userDisplayDetails;

    name && updateMethods.updateName(name);
    email && updateMethods.updateEmail(email);
    mobileNumber && updateMethods.updateMobileNumber(mobileNumber);
    countryPhoneCode && updateMethods.updateCountryCode(countryPhoneCode);
    if (countryPhoneCode) {
      if (countryPhoneCode === "+91") {
        setCountryCodeEmoji("🇮🇳");
      } else {
        setCountryCodeEmoji("");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { keyboardShown } = useKeyboard();

  return (
    <GCMViewer
      bannerImage={CONSTANT_requestCallbackCover().uri}
      title={"Have questions? We're here for you!"}
      backAction={goBack}
    >
      <TranslucentStatusBar />
      <CountryCodePicker
        isVisible={isCountryCodePickerVisible}
        onClose={toggleCCVisibility}
        selectCountryCode={onSelectCountryCode}
      />
      <Picker
        onSelectOption={onSelectContactHours}
        isVisible={isModalVisible}
        closeModal={toggleModalVisibility}
        title={"Contact Hours"}
        options={[
          { text: contactHoursMap[1], value: 1 },
          { text: contactHoursMap[2], value: 2 },
          { text: contactHoursMap[3], value: 3 },
          { text: contactHoursMap[4], value: 4 },
          { text: contactHoursMap[5], value: 5 }
        ]}
      />
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={styles.requestCallBackContainerStyle}
      >
        <FormTitle title="Enter contact details" />

        <BlankSpacer height={24} />

        <TextInputField
          label={"NAME"}
          value={formFields.name}
          onChangeText={updateMethods.updateName}
          placeholder="Name"
          textInputRef={nameRef}
          hasError={isSubmitAttempted && !formFields.name}
          returnKeyType={"next"}
          onSubmitEditing={() => mobileNumberRef.current?.focus()}
        />

        <MobileNumberInputField
          label={"MOBILE NUMBER"}
          value={formFields.mobileNumber}
          onChangeText={updateMethods.updateMobileNumber}
          placeholder="Mobile number"
          keyboardType="phone-pad"
          textInputRef={mobileNumberRef}
          hasError={
            isSubmitAttempted &&
            !validateMobileNumber(
              `${formFields.countryCode}${formFields.mobileNumber}`
            )
          }
          returnKeyType={"next"}
          onSubmitEditing={() => emailAddressRef.current?.focus()}
          countryCode={formFields.countryCode}
          onCountryCodeClick={toggleCCVisibility}
          countryCodeEmoji={countryCodeEmoji}
        />

        <TextInputField
          label={"EMAIL ADDRESS"}
          value={formFields.email}
          onChangeText={updateMethods.updateEmail}
          placeholder="Email address"
          keyboardType="email-address"
          textInputRef={emailAddressRef}
          hasError={isSubmitAttempted && !validateEmail(formFields.email)}
          returnKeyType={"next"}
          onSubmitEditing={toggleModalVisibility}
        />

        <PickerInputField
          onPressAction={toggleModalVisibility}
          label={"Preferred call timings"}
          value={contactHoursMap[formFields.contactHours]}
          placeholder="call timings"
          hasError={isSubmitAttempted && !formFields.contactHours}
        />

        <BlankSpacer height={166} />
      </KeyboardAwareScrollView>
      {!keyboardShown ? (
        <BottomButtonBar
          disableLeftButton
          rightButtonName={"Request call back"}
          rightButtonAction={submitCallbackRequest}
        />
      ) : null}
    </GCMViewer>
  );
};

const styles = StyleSheet.create({
  requestCallBackContainerStyle: {
    padding: 24
  }
});

export default ErrorBoundary()(
  inject("leadSourceStore")(inject("userStore")(observer(RequestCallback)))
);
