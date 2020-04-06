import React, { useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import {
  CONSTANT_white,
  CONSTANT_shade3
} from "../../../constants/colorPallete";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import { CONSTANT_xSensorAreaHeight } from "../../../constants/styles";
import TextInputField from "../../../CommonComponents/TextInputField/TextInputField";
import { AppNavigatorProps } from "../../../NavigatorsV2/AppNavigator";
import { SCREEN_EDIT_TRAVELLER_PROFILE } from "../../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../../NavigatorsV2/Components/PrimaryHeader";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";

type EditTravellerProfileDetailsNavType = AppNavigatorProps<
  typeof SCREEN_EDIT_TRAVELLER_PROFILE
>;

export interface EditTravellerProfileDetailsProps
  extends EditTravellerProfileDetailsNavType {}

const EditTravellerProfileDetails = ({
  navigation
}: EditTravellerProfileDetailsProps) => {
  const [name, onChangeName] = React.useState("Koushik Murali");
  const [email, onChangeEmail] = React.useState("koushikmurali@gmail.com");
  const [city, onChangeCity] = React.useState("Chennai");

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "Edit Personal Details"
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.editProfileDetailsContainer}>
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
          value={"+91 98843 25343"}
          onChangeText={text => onChangeName(text)}
          placeholder="Phone"
          hasError={false}
          editable={false}
          textInputStyle={{ color: CONSTANT_shade3 }}
        />

        <TextInputField
          label={"CITY OF DEPARTURE"}
          value={city}
          onChangeText={text => onChangeCity(text)}
          placeholder="City of Departure"
          hasError={false}
          secondaryText={"GET LOCATION"}
          secondaryTextAction={() => Alert.alert("Click GET LOCATION")}
        />

        <TextInputField
          label={"BIRTHDAY"}
          value={"15 Jul 1990"}
          onChangeText={text => onChangeName(text)}
          placeholder="Birthday"
          hasError={false}
        />
      </View>

      <View style={styles.buttonWrapper}>
        <PrimaryButton
          text={"Save"}
          clickAction={() => Alert.alert("Click Save Button")}
        />
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

export default ErrorBoundary()(EditTravellerProfileDetails);
