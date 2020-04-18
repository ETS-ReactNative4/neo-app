import React, { useState } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
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
import { TouchableOpacity } from "react-native-gesture-handler";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";

type RequestCallbackNavType = AppNavigatorProps<typeof SCREEN_REQUEST_CALLBACK>;

export interface RequestCallbackProps extends RequestCallbackNavType {}

export interface ICallbackPickerOption {
  value: contactHoursType;
  text: string;
}

const RequestCallback = ({ navigation }: RequestCallbackProps) => {
  const goBack = () => navigation.goBack();

  const [formFields, updateMethods] = useRequestCallbackForm();

  const [isModalVisible, setIsModalVisibile] = useState(false);

  const toggleModalVisibility = () => setIsModalVisibile(!isModalVisible);

  const onSelectContactHours = (option: ICallbackPickerOption) => {
    updateMethods.updateContactHours(option.value);
  };

  const submitCallbackRequest = () => {};

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
      <ScrollView
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
          hasError={false}
        />

        <TextInputField
          label={"MOBILE NUMBER"}
          value={formFields.mobileNumber}
          onChangeText={updateMethods.updateMobileNumber}
          placeholder="Mobile number"
          hasError={false}
          keyboardType="phone-pad"
        />

        <TextInputField
          label={"EMAIL ADDRESS"}
          value={formFields.email}
          onChangeText={updateMethods.updateEmail}
          placeholder="Email address"
          hasError={false}
        />

        <TouchableOpacity onPress={toggleModalVisibility}>
          <Text>Open modal</Text>
        </TouchableOpacity>
        <BlankSpacer height={166} />
      </ScrollView>
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
