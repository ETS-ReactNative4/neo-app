import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
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
  CONSTANT_ZESTImageUrl,
  CONSTANT_midRangeAnimation,
  CONSTANT_flexibleAnimation,
  CONSTANT_dealHunterAnimation
} from "../../constants/imageAssets";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_BUDGET_PREFERENCES,
  SCREEN_APP_LOGIN
} from "../../NavigatorsV2/ScreenNames";
import { observer, inject } from "mobx-react";
import LottieView from "lottie-react-native";
import WelcomeHeader from "../../NavigatorsV2/Components/WelcomeHeader";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import WelcomeState from "../../mobx/WelcomeState";
import TravelProfile, { budgetRangeType } from "../../mobx/TravelProfile";
import createReadableText from "../../Services/createReadableText/createReadableText";
import launchPretripHome from "../../Services/launchPretripHome/launchPretripHome";
import isUserLoggedIn from "../../Services/isUserLoggedIn/isUserLoggedIn";

export type BudgetPreferencesNavTypes = AppNavigatorProps<
  typeof SCREEN_BUDGET_PREFERENCES
>;

export interface BudgetPreferencesProps extends BudgetPreferencesNavTypes {
  welcomeStateStore: WelcomeState;
  travelProfileStore: TravelProfile;
}

export interface IBudgetPreferenceOption {
  label: string;
  value: budgetRangeType;
}

const BudgetPreferences = ({
  navigation,
  welcomeStateStore,
  travelProfileStore
}: BudgetPreferencesProps) => {
  const { budgetRangeOptions: budgetRangeValues } = travelProfileStore;

  const [selectedOption, setSelectedOption] = useState<budgetRangeType>(
    "DEAL_HUNTER"
  );

  const [budgetRangeOptions, setBudgetRangeOptions] = useState<
    IBudgetPreferenceOption[]
  >([]);

  const selectBudget = (budget: budgetRangeType) => setSelectedOption(budget);

  const prevScreen = () => {
    navigation.goBack();
  };

  const skipFlow = () => {
    welcomeStateStore.patchWelcomeState("skippedAt", SCREEN_BUDGET_PREFERENCES);
    navigation.navigate(SCREEN_APP_LOGIN, {
      launchSource: "PRETRIP_WELCOME_FLOW"
    });
  };

  const continueFlow = () => {
    welcomeStateStore.patchWelcomeState("seenBudgetPreferences", true);
    travelProfileStore.updateTravelProfileData({
      tripBudget: selectedOption
    });
    isUserLoggedIn()
      .then(isLoggedIn => {
        if (!isLoggedIn) {
          navigation.navigate(SCREEN_APP_LOGIN, {
            launchSource: "PRETRIP_WELCOME_FLOW"
          });
        } else {
          navigation.dispatch(
            launchPretripHome({ source: "TravelProfileFlow" })
          );
        }
      })
      .catch(() => {
        navigation.dispatch(launchPretripHome({ source: "TravelProfileFlow" }));
      });
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

    setBudgetRangeOptions(
      budgetRangeValues.map(value => {
        return {
          label: createReadableText(value) as string,
          value: value
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={[styles.tripIntensityContainerStyle]}>
      <View style={styles.tripIntensityContent}>
        <SectionTitle
          containerStyle={styles.sectionTitleContainer}
          title={"What’s your budget preference?"}
          description={
            "This will allow us to offer you the best suited travel plans for your holiday."
          }
        />

        {selectedOption === "DEAL_HUNTER" ? (
          <View style={styles.animationWrapper}>
            <LottieView source={CONSTANT_dealHunterAnimation()} autoPlay loop />
          </View>
        ) : selectedOption === "VALUE_FOR_MONEY" ? (
          <View style={styles.animationWrapper}>
            <LottieView source={CONSTANT_midRangeAnimation()} autoPlay loop />
          </View>
        ) : (
          <View style={styles.animationWrapper}>
            <LottieView source={CONSTANT_flexibleAnimation()} autoPlay loop />
          </View>
        )}

        <View style={styles.tripIntensityButtonWrapper}>
          {budgetRangeOptions.map((budgetRange, budgetRangeIndex) => {
            const clickHandler = () => selectBudget(budgetRange.value);

            return (
              <TouchableOpacity
                key={budgetRangeIndex}
                activeOpacity={0.8}
                onPress={clickHandler}
                style={[
                  styles.tripIntensityButton,
                  budgetRange.value === selectedOption
                    ? styles.activeTripIntensityButton
                    : null
                ]}
              >
                <Text
                  style={[
                    styles.tripIntensityButtonText,
                    budgetRange.value === selectedOption
                      ? styles.activeTripIntensityButtonText
                      : null
                  ]}
                >
                  {budgetRange.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.emiParteners}>
          <Text style={styles.emiPartenersText}>
            Avail easy No Cost EMIs with
          </Text>
          <SmartImageV2
            source={{ uri: CONSTANT_ZESTImageUrl }}
            fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
            style={styles.emiPartenersImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <PrimaryButton
        text={"Continue"}
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
    inject("travelProfileStore")(observer(BudgetPreferences))
  )
);
