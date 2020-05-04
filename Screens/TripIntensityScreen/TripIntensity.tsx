import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import {
  CONSTANT_white,
  CONSTANT_black1,
  CONSTANT_twentyOneColor,
  CONSTANT_twentyTwoColor,
  CONSTANT_shade6
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import {
  CONSTANT_laidBackIntensityAnimation,
  CONSTANT_packedIntensityAnimation,
  CONSTANT_moderateIntensityAnimation
} from "../../constants/imageAssets";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_TRIP_INTENSITY,
  SCREEN_BUDGET_PREFERENCES
} from "../../NavigatorsV2/ScreenNames";
import skipUserProfileBuilder from "../../Services/skipUserProfileBuilder/skipUserProfileBuilder";
import { observer, inject } from "mobx-react";
import LottieView from "lottie-react-native";
import WelcomeHeader from "../../NavigatorsV2/Components/WelcomeHeader";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import WelcomeState from "../../mobx/WelcomeState";
import TravelProfile, { tripIntensityType } from "../../mobx/TravelProfile";
import createReadableText from "../../Services/createReadableText/createReadableText";

export type TripIntensityNavTypes = AppNavigatorProps<
  typeof SCREEN_TRIP_INTENSITY
>;

export interface TripIntensityProps extends TripIntensityNavTypes {
  welcomeStateStore: WelcomeState;
  travelProfileStore: TravelProfile;
}

export interface ITripIntensityOption {
  label: string;
  value: tripIntensityType;
}

const TripIntensity = ({
  navigation,
  welcomeStateStore,
  travelProfileStore
}: TripIntensityProps) => {
  const { tripIntensityOptions: tripIntensityValues } = travelProfileStore;

  const [selectedOption, setSelectedOption] = useState<tripIntensityType>(
    "LAID_BACK"
  );

  const [tripIntensityOptions, setTripIntensityOptions] = useState<
    ITripIntensityOption[]
  >([]);

  const selectIntensity = (intensity: tripIntensityType) =>
    setSelectedOption(intensity);

  const prevScreen = () => {
    navigation.goBack();
  };

  const skipFlow = () => {
    welcomeStateStore.patchWelcomeState("skippedAt", SCREEN_TRIP_INTENSITY);
    navigation.dispatch(skipUserProfileBuilder());
  };

  const continueFlow = () => {
    welcomeStateStore.patchWelcomeState("seenTripIntensity", true);
    travelProfileStore.updateTravelProfileData({
      tripIntensity: selectedOption
    });
    navigation.navigate(SCREEN_BUDGET_PREFERENCES);
  };

  useEffect(() => {
    navigation.setOptions({
      header: options =>
        WelcomeHeader(options, {
          rightLinkText: "Skip",
          onRightLinkClick: skipFlow,
          leftLinkText: "Back",
          onLeftLinkClick: prevScreen
        })
    });

    setTripIntensityOptions(
      tripIntensityValues.map(value => {
        return {
          label: createReadableText(value) as string,
          value: value
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <View style={[styles.tripIntensityContainerStyle]}>
      <View style={styles.tripIntensityContent}>
        <SectionTitle
          containerStyle={styles.sectionTitleContainer}
          title={"How do you like your holidays?"}
          description={
            "A relaxing getway, an adventure-packed trip, or somewhere in between?"
          }
        />
        <View style={styles.animationWrapper}>
          {selectedOption === "LAID_BACK" ? (
            <LottieView
              source={CONSTANT_laidBackIntensityAnimation()}
              autoPlay
              loop
            />
          ) : selectedOption === "MODERATE" ? (
            <LottieView
              source={CONSTANT_moderateIntensityAnimation()}
              autoPlay
              loop
            />
          ) : (
            <LottieView
              source={CONSTANT_packedIntensityAnimation()}
              autoPlay
              loop
            />
          )}
        </View>

        <View style={styles.tripIntensityButtonWrapper}>
          {tripIntensityOptions.map((intensity, intensityIndex) => {
            const clickHandler = () => selectIntensity(intensity.value);

            return (
              <TouchableOpacity
                key={intensityIndex}
                activeOpacity={0.8}
                onPress={clickHandler}
                style={[
                  styles.tripIntensityButton,
                  intensity.value === selectedOption
                    ? styles.activeTripIntensityButton
                    : null
                ]}
              >
                <Text
                  style={[
                    styles.tripIntensityButtonText,
                    intensity.value === selectedOption
                      ? styles.activeTripIntensityButtonText
                      : null
                  ]}
                >
                  {intensity.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <PrimaryButton
        text={"Up Next - Budget Preferences"}
        clickAction={continueFlow}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: CONSTANT_shade6
  },

  tripIntensityContainerStyle: {
    flex: 1,
    backgroundColor: CONSTANT_shade6
  },
  tripIntensityContent: {
    flex: 1,
    paddingTop: 16
  },

  sectionTitleContainer: {
    marginHorizontal: 32,
    marginBottom: 16
  },

  animationWrapper: {
    flex: 1,
    width: responsiveWidth(100),
    marginBottom: 32,
    alignSelf: "center"
  },

  tripIntensityButtonWrapper: {
    flexDirection: "row",
    marginHorizontal: 32,
    marginBottom: 24
  },
  tripIntensityButton: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    padding: 20,
    borderRadius: 25,
    marginRight: 8
  },
  tripIntensityButtonText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13),
    textAlign: "center"
  },
  activeTripIntensityButton: {
    backgroundColor: CONSTANT_twentyOneColor
  },
  activeTripIntensityButtonText: {
    color: CONSTANT_twentyTwoColor
  },
  noMarginRight: {
    marginRight: 0
  },

  buttonStyle: {
    marginTop: 16,
    marginHorizontal: 32,
    marginBottom: 24 + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  }
});

export default ErrorBoundary()(
  inject("welcomeStateStore")(
    inject("travelProfileStore")(observer(TripIntensity))
  )
);
