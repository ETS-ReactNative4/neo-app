import React, { Fragment } from "react";
import { StyleSheet, Text, ScrollView, Alert } from "react-native";
import { CONSTANT_black1 } from "../../../constants/colorPallete";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom
} from "../../../constants/fonts";
import TextInputField from "../../../CommonComponents/TextInputField/TextInputField";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar/BottomButtonBar";

const GCMRequestCallback = () => {
  const [name, onChangeName] = React.useState("Basimon");
  const [mobileNumber, onChangeMobileNumber] = React.useState(
    "+91 93748 37467"
  );
  const [email, onChangeEmail] = React.useState("basimon@gmail.com");
  const [contactHours, onChangeContactHours] = React.useState(
    "9 AM - 11 AM (Peak hours)"
  );

  return (
    <Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.requestCallBackContainerStyle}
      >
        <Text style={styles.titleStyle}>Enter Contact Details</Text>

        <TextInputField
          label={"NAME"}
          value={name}
          onChangeText={text => onChangeName(text)}
          placeholder="Name"
          hasError={false}
        />

        <TextInputField
          label={"MOBILE NUMBER"}
          value={mobileNumber}
          onChangeText={text => onChangeMobileNumber(text)}
          placeholder="Mobile number"
          hasError={false}
          keyboardType="phone-pad"
        />

        <TextInputField
          label={"EMAIL ADDRESS"}
          value={email}
          onChangeText={text => onChangeEmail(text)}
          placeholder="Email address"
          hasError={false}
        />

        <TextInputField
          label={"CONTACT HOURS"}
          value={contactHours}
          onChangeText={text => onChangeContactHours(text)}
          placeholder="Room Details"
          hasError={false}
        />
      </ScrollView>

      <BottomButtonBar
        disableLeftButton
        rightButtonName={"Request call back"}
        rightButtonAction={() => Alert.alert("Click -> Request call back")}
      />
    </Fragment>
  );
};

const styles = StyleSheet.create({
  requestCallBackContainerStyle: {
    padding: 24
  },
  titleStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 24
  }
});

export default GCMRequestCallback;
