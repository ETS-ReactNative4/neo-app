import React, { Fragment, useRef } from "react";
import { StyleSheet, Text, ScrollView, Alert, TextInput } from "react-native";
import { CONSTANT_black1 } from "../../../constants/colorPallete";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom
} from "../../../constants/fonts";
import TextInputField from "../../../CommonComponents/TextInputField/TextInputField";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar/BottomButtonBar";

const GCMTripDetails = () => {
  const departingOnRef = useRef<TextInput>(null);

  const [departingFrom, onChangeDepartingFrom] = React.useState("Chennai");
  const [departingOn, onChangeDepartingOn] = React.useState("15 Jul 1990");
  const [travellingAs, onChangeTravellingAs] = React.useState("Family");
  const [roomDetails, onChangeRoomDetails] = React.useState(
    "1 room - 3 adults"
  );

  const focusOnTextField = () => departingOnRef?.current?.focus();

  return (
    <Fragment>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[styles.tripContainerStyle]}
      >
        <Text style={styles.titleStyle}>Enter Trip Details</Text>

        <TextInputField
          label={"DEPARTING FROM"}
          value={departingFrom}
          onChangeText={text => onChangeDepartingFrom(text)}
          placeholder="Departing From"
          hasError={false}
          keyboardType={"default"}
          returnKeyType={"next"}
          onSubmitEditing={focusOnTextField}
        />

        <TextInputField
          textInputRef={departingOnRef}
          label={"DEPARTING ON"}
          value={departingOn}
          onChangeText={text => onChangeDepartingOn(text)}
          placeholder="Departing On"
          hasError={false}
        />

        <TextInputField
          label={"TRAVELLING AS"}
          value={travellingAs}
          onChangeText={text => onChangeTravellingAs(text)}
          placeholder="Travelling As"
          hasError={false}
        />

        <TextInputField
          label={"ROOM DETAILS"}
          value={roomDetails}
          onChangeText={text => onChangeRoomDetails(text)}
          placeholder="Room Details"
          hasError={false}
        />
      </ScrollView>

      <BottomButtonBar
        disableLeftButton
        rightButtonName={"View updated cost"}
        rightButtonAction={() => Alert.alert("Click -> View updated cost")}
      />
    </Fragment>
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

export default GCMTripDetails;
