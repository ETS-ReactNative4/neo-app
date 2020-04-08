import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Switch,
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
import useRetrieveTravelProfile, {
  hotelCategoriesType
} from "./hooks/useRetrieveTravelProfile";
import useDeepCompareEffect from "use-deep-compare-effect";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useKeyboard } from "@react-native-community/hooks";
import usePatchTravelProfile from "./hooks/usePatchTravelProfile";
import { toastBottom } from "../../Services/toast/toast";

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
  const [, patchTravelProfile] = usePatchTravelProfile();

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
  const enableStarCategoryPreference = () => setPreferStarCategory(true);

  const [hasMedicalCondition, setHasMedicalCondition] = useState(false);
  const toggleMedicalCondition = () =>
    setHasMedicalCondition(previousState => !previousState);
  const enableMedicalCondition = () => setHasMedicalCondition(true);
  const [medicalCondition, onChangeMedicalConditionText] = React.useState(
    "Diabetes"
  );

  const [hasPhysicalDisablilities, setHasPhysicalDisabilities] = useState(
    false
  );
  const togglePhysicalDisabilities = () =>
    setHasPhysicalDisabilities(previousState => !previousState);
  const enablePhysicalDisabilities = () => setHasPhysicalDisabilities(true);

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

  const toggleSuggestedRatingDetailsByIndex = (itemIndex: number) => {
    setSuggestedRatingDetails(
      suggestedRatingDetails.map((rating, ratingIndex) => {
        if (itemIndex === ratingIndex) {
          return {
            ...rating,
            isChecked: !rating.isChecked
          };
        }
        return rating;
      })
    );
  };

  const selectSuggestedRatingDetailsByName = (
    categories: hotelCategoriesType[]
  ) => {
    setSuggestedRatingDetails(
      suggestedRatingDetails.map(rating => {
        if (categories) {
          if (categories.includes(rating.text)) {
            return {
              ...rating,
              isChecked: true
            };
          }
          return rating;
        }
        return rating;
      })
    );
  };

  const editProfile = () => navigation.navigate(SCREEN_EDIT_TRAVELLER_PROFILE);

  const hasDataLoaded = useRef(false);

  const keyboard = useKeyboard();
  const { keyboardShown } = keyboard;

  useEffect(() => {
    if (!keyboardShown && hasDataLoaded.current) {
      patchTravelProfile({
        medicalConditions: hasMedicalCondition ? medicalCondition : ""
      })
        .then(() => {
          loadTravelProfile();
        })
        .catch(() => toastBottom("Unable to save your preferences"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyboardShown]);

  useDeepCompareEffect(() => {
    if (hasDataLoaded.current) {
      patchTravelProfile({
        hotelCategories: preferStarCategory
          ? suggestedRatingDetails
              .filter(rating => rating.isChecked)
              .map(rating => rating.text)
          : [],
        physicalDisabilities: hasPhysicalDisablilities
      })
        .then(() => {
          loadTravelProfile();
        })
        .catch(() => toastBottom("Unable to save your preferences"));
    }
  }, [preferStarCategory, suggestedRatingDetails, hasPhysicalDisablilities]);

  const { successResponseData: travelProfileData } = travelProfileApiDetails;

  useDeepCompareEffect(() => {
    if (travelProfileData) {
      const { data } = travelProfileData;
      const { hotelCategories, medicalConditions, physicalDisabilities } = data;
      if (hotelCategories) {
        enableStarCategoryPreference();
        selectSuggestedRatingDetailsByName(hotelCategories);
      }
      if (medicalConditions) {
        enableMedicalCondition();
        onChangeMedicalConditionText(medicalConditions);
      }
      if (physicalDisabilities) {
        enablePhysicalDisabilities();
      }
      hasDataLoaded.current = true;
    }
  }, [travelProfileData || {}]);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
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
              toggleSuggestedRatingDetailsByIndex(item.index);
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
            value={medicalCondition}
            onChangeText={text => onChangeMedicalConditionText(text)}
            hasError={false}
            placeholder="Please input your medical conditions"
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
    </KeyboardAwareScrollView>
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
