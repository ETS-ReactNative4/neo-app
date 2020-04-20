import React, { useState, useRef } from "react";
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

type RequestCallbackNavType = AppNavigatorProps<typeof SCREEN_REQUEST_CALLBACK>;

export interface RequestCallbackProps extends RequestCallbackNavType {}

export interface ICallbackPickerOption {
  value: contactHoursType;
  text: string;
}

const RequestCallback = ({ navigation }: RequestCallbackProps) => {
  const goBack = () => navigation.goBack();

  const [formFields, updateMethods] = useRequestCallbackForm();

  const [, submitRequestCallback] = useRequestCallbackApi();

  const [isSubmitAttempted, setIsSubmitAttempted] = useState(false);

  const [isModalVisible, setIsModalVisibile] = useState(false);

  const toggleModalVisibility = () => setIsModalVisibile(!isModalVisible);

  const onSelectContactHours = (option: ICallbackPickerOption) => {
    updateMethods.updateContactHours(option.value);
  };

  const submitCallbackRequest = () => {
    setIsSubmitAttempted(true);
    if (
      formFields.email &&
      formFields.mobileNumber &&
      formFields.name &&
      formFields.contactHours
    ) {
      submitRequestCallback({
        countryPhoneCode: "+91", // PT TODO: Modify countrycode
        email: formFields.email,
        mobileNumber: formFields.mobileNumber,
        name: formFields.name,
        canSendWhatsAppMessages: true, // PT TODO: need to know how
        preferredTime: formFields.contactHours,
        pageUrl: "" // PT TODO: required
      })
        .then(result => {
          if (result) {
            DebouncedAlert("Success!", "We will contact you shortly!");
            navigation.goBack();
          } else {
            DebouncedAlert("Oops!", "Unable to submit form details.");
          }
        })
        .catch(() => {
          DebouncedAlert("Oops!", "Unable to submit form details.");
        });
    }
  };

  const nameRef = useRef<TextInput>(null);
  const mobileNumberRef = useRef<TextInput>(null);
  const emailAddressRef = useRef<TextInput>(null);

  return (
    <GCMViewer
      bannerImage={CONSTANT_requestCallbackCover().uri}
      title={"Have questions? We’ll call you back"}
      backAction={goBack}
    >
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

        <TextInputField
          label={"MOBILE NUMBER"}
          value={formFields.mobileNumber}
          onChangeText={updateMethods.updateMobileNumber}
          placeholder="Mobile number"
          keyboardType="phone-pad"
          textInputRef={mobileNumberRef}
          hasError={isSubmitAttempted && !formFields.mobileNumber}
          returnKeyType={"next"}
          onSubmitEditing={() => emailAddressRef.current?.focus()}
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
      <BottomButtonBar
        disableLeftButton
        rightButtonName={"Request call back"}
        rightButtonAction={submitCallbackRequest}
      />
    </GCMViewer>
  );
};

const styles = StyleSheet.create({
  requestCallBackContainerStyle: {
    padding: 24
  }
});

export default ErrorBoundary()(RequestCallback);
