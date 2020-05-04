import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, TextInput } from "react-native";
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
import useRequestCallbackApi from "./hooks/useRequestCallbackApi";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { observer, inject } from "mobx-react";
import User from "../../mobx/User";
import { toastBottom } from "../../Services/toast/toast";
import CountryCodePicker from "../MobileNumberScreen/Components/CountryCodePicker";
import MobileNumberInputField from "../../CommonComponents/MobileNumberInputField/MobileNumberInputField";
import { ICountryCodeData } from "../AppLoginScreen/Components/PhoneNumberInput";
import { useKeyboard } from "@react-native-community/hooks";

type RequestCallbackNavType = AppNavigatorProps<typeof SCREEN_REQUEST_CALLBACK>;

export interface RequestCallbackProps extends RequestCallbackNavType {
  userStore: User;
}

export interface ICallbackPickerOption {
  value: contactHoursType;
  text: string;
}

const RequestCallback = ({ navigation, userStore }: RequestCallbackProps) => {
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
      formFields.contactHours
    ) {
      try {
        const result = await submitRequestCallback({
          countryPhoneCode: formFields.countryCode, // PT TODO: Modify countrycode
          email: formFields.email,
          mobileNumber: formFields.mobileNumber,
          name: formFields.name,
          canSendWhatsAppMessages: true, // PT TODO: need to know how
          preferredTime: formFields.contactHours,
          pageUrl: "", // PT TODO: required
          leadSource: {}
        });
        if (result) {
          toastBottom("We will contact you shortly!");
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
      title={"Have questions? We’ll call you back"}
      backAction={goBack}
    >
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
        <FormTitle title="Enter Contact Details" />

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
          hasError={isSubmitAttempted && !formFields.mobileNumber}
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
          hasError={isSubmitAttempted && !formFields.email}
          returnKeyType={"next"}
          onSubmitEditing={toggleModalVisibility}
        />

        <PickerInputField
          onPressAction={toggleModalVisibility}
          label={"Contact hours"}
          value={contactHoursMap[formFields.contactHours]}
          placeholder="Email address"
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

export default ErrorBoundary()(inject("userStore")(observer(RequestCallback)));
