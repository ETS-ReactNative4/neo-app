import React, { useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import {
  CONSTANT_white,
  CONSTANT_black1,
  CONSTANT_twentyOneColor,
  CONSTANT_twentyTwoColor,
  CONSTANT_shade6,
  CONSTANT_shade1
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import {
  CONSTANT_defaultPlaceImage,
  CONSTANT_laidBackIntensityAnimation
} from "../../constants/imageAssets";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_TRIP_INTENSITY } from "../../NavigatorsV2/ScreenNames";
import skipUserProfileBuilder from "../../Services/skipUserProfileBuilder/skipUserProfileBuilder";
import { observer, inject } from "mobx-react";
import LottieView from "lottie-react-native";
import WelcomeHeader from "../../NavigatorsV2/Components/WelcomeHeader";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import WelcomeState from "../../mobx/WelcomeState";

export type TripIntensityNavTypes = AppNavigatorProps<
  typeof SCREEN_TRIP_INTENSITY
>;

export interface TripIntensityProps extends TripIntensityNavTypes {
  welcomeStateStore: WelcomeState;
}

const TripIntensity = ({
  navigation,
  welcomeStateStore
}: TripIntensityProps) => {
  const prevScreen = () => {
    navigation.goBack();
  };

  const skipFlow = () => {
    welcomeStateStore.patchWelcomeState("skippedAt", SCREEN_TRIP_INTENSITY);
    navigation.dispatch(skipUserProfileBuilder());
  };

  const continueFlow = () => {};

  useEffect(() => {
    navigation.setOptions({
      header: options =>
        WelcomeHeader(options, {
          rightLinkText: "Skip question",
          onRightLinkClick: skipFlow,
          leftLinkText: "Part 3 of 4",
          onLeftLinkClick: prevScreen
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.tripIntensityContainerStyle]}>
      <View style={styles.tripIntensityContent}>
        <SectionTitle
          containerStyle={styles.sectionTitleContainer}
          title={"How do you like your holidays?"}
          description={
            "This will help us customize our suggestions to suit your travel style."
          }
        />
        <View style={styles.animationWrapper}>
          <LottieView
            source={CONSTANT_laidBackIntensityAnimation()}
            autoPlay
            loop
          />
        </View>

        <View style={styles.tripIntensityButtonWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={[
              styles.tripIntensityButton,
              styles.activeTripIntensityButton
            ]}
          >
            <Text
              style={[
                styles.tripIntensityButtonText,
                styles.activeTripIntensityButtonText
              ]}
            >
              Laid back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={styles.tripIntensityButton}
          >
            <Text style={styles.tripIntensityButtonText}>Moderate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={[styles.tripIntensityButton, styles.noMarginRight]}
          >
            <Text style={styles.tripIntensityButtonText}>Packed</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emiParteners}>
          <Text style={styles.emiPartenersText}>
            Easy EMIs with our partners
          </Text>
          <SmartImageV2
            source={{ uri: "https://i.imgur.com/M20FIDf.png" }}
            fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
            style={styles.emiPartenersImage}
            resizeMode="cover"
          />
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
  },

  emiParteners: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginBottom: 8
  },
  emiPartenersText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 15),
    marginRight: 6
  },
  emiPartenersImage: {
    width: 68,
    height: 22
  }
});

export default ErrorBoundary()(
  inject("welcomeStateStore")(
    inject("travelProfileStore")(observer(TripIntensity))
  )
);
