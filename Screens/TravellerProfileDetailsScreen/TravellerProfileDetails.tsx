import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  ScrollView,
  Alert
} from "react-native";
import TravellerProfileDetailsTitle from "./Components/TravellerProfileDetailsTitle";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_firstColor,
  CONSTANT_shade2,
  CONSTANT_shade6,
  CONSTANT_white
} from "../../constants/colorPallete";
import { CONSTANT_arrowRight } from "../../constants/imageAssets";
import Icon from "../../CommonComponents/Icon/Icon";
import TextInputField from "../../CommonComponents/TextInputField/TextInputField";
import CustomCheckBox, {
  ICheckBoxData,
  ISuggestedDetails
} from "../../CommonComponents/CustomCheckBox/CustomCheckBox";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_TRAVELLER_PROFILE,
  SCREEN_EDIT_TRAVELLER_PROFILE
} from "../../NavigatorsV2/ScreenNames";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

type TravellerProfileDetailsNav = AppNavigatorProps<
  typeof SCREEN_TRAVELLER_PROFILE
>;

export interface TravellerProfileDetailsProps
  extends TravellerProfileDetailsNav {}

const TravellerProfileDetails = ({
  navigation
}: TravellerProfileDetailsProps) => {
  const [ratingData] = useState<ICheckBoxData[]>([
    {
      text: "2 Star"
    },
    {
      text: "3 Star"
    },
    {
      text: "4 Star"
    },
    {
      text: "5 Star"
    }
  ]);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const [value, onChangeText] = React.useState("Diabetes");

  const [suggestedRatingDetails, setSuggestedRatingDetails] = useState<
    ISuggestedDetails[]
  >([]);

  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "My Traveller Profile"
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSuggestedRatingDetails(
      ratingData.map((item, itemIndex) => {
        return {
          index: itemIndex,
          text: item.text,
          isChecked: false
        };
      })
    );
  }, [ratingData]);

  const selectSuggestedRatingDetails = (itemIndex: number) => {
    const suggestedRatingList = [...suggestedRatingDetails];
    suggestedRatingList[itemIndex].isChecked = !suggestedRatingList[itemIndex]
      .isChecked;
    setSuggestedRatingDetails(suggestedRatingList);
  };

  const editProfile = () => navigation.navigate(SCREEN_EDIT_TRAVELLER_PROFILE);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.profileDetailsContainer}>
        <TravellerProfileDetailsTitle
          title={"Personal Details"}
          editProfile
          editProfileAction={editProfile}
        />

        <Text style={styles.titleStyle}>NAME</Text>
        <Text style={styles.textStyle}>Koushik Murali</Text>

        <Text style={styles.titleStyle}>EMAIL</Text>
        <Text style={styles.textStyle}>koushikmurali@gmail.com</Text>

        <Text style={styles.titleStyle}>PHONE</Text>
        <Text style={styles.textStyle}>+91 98843 25343</Text>

        <Text style={styles.titleStyle}>CITY OF DEPARTURE</Text>
        <Text style={styles.textStyle}>Chennai</Text>

        <Text style={styles.titleStyle}>BIRTHDAY</Text>
        <Text style={[styles.textStyle, styles.noMarginBottom]}>
          15 Jul 1990
        </Text>
      </View>

      <View style={styles.profileDetailsContainer}>
        <TravellerProfileDetailsTitle title={"Other Preferences"} />

        <View style={styles.switchTextWrapper}>
          <Text style={styles.switchText}>
            Do you prefer any hotel star category?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: CONSTANT_firstColor }}
            thumbColor={isEnabled ? CONSTANT_white : CONSTANT_shade6}
            ios_backgroundColor={CONSTANT_shade6}
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>

        {suggestedRatingDetails.map((item, index) => {
          const onSelect = () => {
            selectSuggestedRatingDetails(item.index);
          };

          return (
            <CustomCheckBox
              key={index}
              isChecked={item.isChecked}
              action={onSelect}
              text={item.text}
              containerStyle={
                index === suggestedRatingDetails.length - 1
                  ? styles.noMarginBottom
                  : null
              }
              checkboxTextStyle={styles.checkboxTextStyle}
            />
          );
        })}
      </View>

      <View style={styles.profileDetailsContainer}>
        <TravellerProfileDetailsTitle title={"Special Requests"} />

        {/* Do you have any medical conditions? starts */}
        <View style={styles.switchTextWrapper}>
          <Text style={styles.switchText}>
            Do you have any medical conditions?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: CONSTANT_firstColor }}
            thumbColor={isEnabled ? CONSTANT_white : CONSTANT_shade6}
            ios_backgroundColor={CONSTANT_shade6}
          />
        </View>

        <TextInputField
          value={value}
          onChangeText={text => onChangeText(text)}
          hasError={false}
          placeholder=""
          containerStyle={styles.inputFieldStyle}
        />
        {/* Do you have any medical conditions? ends */}

        {/* Do you have any physical disabilities? starts */}
        <View style={[styles.switchTextWrapper, styles.noMarginBottom]}>
          <Text style={styles.switchText}>
            Do you have any physical disabilities?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: CONSTANT_firstColor }}
            thumbColor={isEnabled ? CONSTANT_white : CONSTANT_shade6}
            ios_backgroundColor={CONSTANT_shade6}
          />
        </View>
        {/* Do you have any physical disabilities? ends */}
      </View>

      <View style={styles.profileDetailsContainer}>
        <Text
          style={styles.logoutText}
          onPress={() => Alert.alert("Click Logout")}
        >
          Log out
          <Icon name={CONSTANT_arrowRight} color={CONSTANT_shade2} size={12} />
        </Text>
      </View>
      <XSensorPlaceholder />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileDetailsContainer: {
    padding: 24,
    marginBottom: 4,
    backgroundColor: CONSTANT_white
  },

  titleStyle: {
    color: CONSTANT_shade2,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12, 15),
    textTransform: "uppercase",
    marginBottom: 4
  },
  textStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    marginBottom: 20
  },
  noMarginBottom: {
    marginBottom: 0
  },

  switchTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  switchText: {
    flex: 1,
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18)
  },
  logoutText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18)
  },
  inputFieldStyle: {
    marginBottom: 24
  },
  checkboxTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    paddingLeft: 8
  }
});

export default ErrorBoundary()(TravellerProfileDetails);
