import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Switch,
  ScrollView,
  Alert,
  LayoutAnimation
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
import ProfileDetailSection from "./Components/ProfileDetailSection";
import { observer, inject } from "mobx-react";
import User from "../../mobx/User";
import useRetrieveTravelProfile from "./hooks/useRetrieveTravelProfile";
import useDeepCompareEffect from "use-deep-compare-effect";

type TravellerProfileDetailsNav = AppNavigatorProps<
  typeof SCREEN_TRAVELLER_PROFILE
>;

export interface TravellerProfileDetailsProps
  extends TravellerProfileDetailsNav {
  userStore: User;
}

const TravellerProfileDetails = ({
  navigation,
  userStore
}: TravellerProfileDetailsProps) => {
  const { userDisplayDetails = {}, getUserDisplayDetails } = userStore;
  const { email, mobileNumber, name } = userDisplayDetails;

  const [
    travelProfileApiDetails,
    loadTravelProfile
  ] = useRetrieveTravelProfile();

  const dateOfBirth = "";
  const cityOfDeparture = "";

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
  const [preferStarCategory, setPreferStarCategory] = useState(false);
  const toggleStarCategoryPreference = () =>
    setPreferStarCategory(previousState => !previousState);

  const [hasMedicalCondition, setHasMedicalCondition] = useState(false);
  const toggleMedicalCondition = () =>
    setHasMedicalCondition(previousState => !previousState);

  const [hasPhysicalDisablilities, setHasPhysicalDisabilities] = useState(
    false
  );
  const togglePhysicalDisabilities = () =>
    setHasPhysicalDisabilities(previousState => !previousState);

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

    getUserDisplayDetails();
    loadTravelProfile();
    setSuggestedRatingDetails(
      ratingData.map((item, itemIndex) => {
        return {
          index: itemIndex,
          text: item.text,
          isChecked: false
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectSuggestedRatingDetails = (itemIndex: number) => {
    const suggestedRatingList = [...suggestedRatingDetails];
    suggestedRatingList[itemIndex].isChecked = !suggestedRatingList[itemIndex]
      .isChecked;
    setSuggestedRatingDetails(suggestedRatingList);
  };

  const editProfile = () => navigation.navigate(SCREEN_EDIT_TRAVELLER_PROFILE);

  const { successResponseData = {} } = travelProfileApiDetails;

  useDeepCompareEffect(() => {}, [successResponseData || {}]);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.profileDetailsContainer}>
        <TravellerProfileDetailsTitle
          title={"Personal Details"}
          editProfile
          editProfileAction={editProfile}
        />

        {name ? <ProfileDetailSection title={"Name"} text={name} /> : null}

        {email ? <ProfileDetailSection title={"Email"} text={email} /> : null}

        {mobileNumber ? (
          <ProfileDetailSection title={"Phone"} text={mobileNumber} />
        ) : null}

        {cityOfDeparture ? (
          <ProfileDetailSection
            title={"City of Departure"}
            text={cityOfDeparture}
          />
        ) : null}

        {dateOfBirth ? (
          <ProfileDetailSection
            title={"Birthday"}
            text={dateOfBirth}
            textStyle={styles.noMarginBottom}
          />
        ) : null}
      </View>

      <View style={styles.profileDetailsContainer}>
        <TravellerProfileDetailsTitle title={"Other Preferences"} />

        <View style={styles.switchTextWrapper}>
          <Text style={styles.switchText}>
            Do you prefer any hotel star category?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: CONSTANT_firstColor }}
            thumbColor={preferStarCategory ? CONSTANT_white : CONSTANT_shade6}
            ios_backgroundColor={CONSTANT_shade6}
            onValueChange={toggleStarCategoryPreference}
            value={preferStarCategory}
          />
        </View>

        {preferStarCategory &&
          suggestedRatingDetails.map((item, index) => {
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
            thumbColor={preferStarCategory ? CONSTANT_white : CONSTANT_shade6}
            ios_backgroundColor={CONSTANT_shade6}
            value={hasMedicalCondition}
            onValueChange={toggleMedicalCondition}
          />
        </View>

        {hasMedicalCondition ? (
          <TextInputField
            value={value}
            onChangeText={text => onChangeText(text)}
            hasError={false}
            placeholder=""
            containerStyle={styles.inputFieldStyle}
          />
        ) : null}
        {/* Do you have any medical conditions? ends */}

        {/* Do you have any physical disabilities? starts */}
        <View style={[styles.switchTextWrapper, styles.noMarginBottom]}>
          <Text style={styles.switchText}>
            Do you have any physical disabilities?
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: CONSTANT_firstColor }}
            thumbColor={preferStarCategory ? CONSTANT_white : CONSTANT_shade6}
            ios_backgroundColor={CONSTANT_shade6}
            value={hasPhysicalDisablilities}
            onValueChange={togglePhysicalDisabilities}
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

export default ErrorBoundary()(
  inject("userStore")(observer(TravellerProfileDetails))
);
