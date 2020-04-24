import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";

import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom
} from "../../constants/fonts";
import {
  CONSTANT_white1,
  CONSTANT_firstColor
} from "../../constants/colorPallete";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import { isIphoneX } from "react-native-iphone-x-helper";
import SelectablePortraitImage from "../../CommonComponents/SelectablePortraitImage/SelectablePortraitImage";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import MasonryView from "react-native-masonry-scrollview";
import {
  SCREEN_TRAVEL_COUNTRY_PICKER,
  SCREEN_TRAVEL_MARITAL_STATUS
} from "../../NavigatorsV2/ScreenNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import WelcomeHeader from "../../NavigatorsV2/Components/WelcomeHeader";
import { RouteProp } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";

import SearchBox from "../../CommonComponents/SearchBox/SearchBox";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { observer, inject } from "mobx-react";
import TravelProfile from "../../mobx/TravelProfile";
import matchQueryWithText from "../../Services/matchQueryWithText/matchQueryWIthText";
import skipUserProfileBuilder from "../../Services/skipUserProfileBuilder/skipUserProfileBuilder";
import WelcomeState from "../../mobx/WelcomeState";

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);
const AnimatableTouchableOpacity = createAnimatableComponent(TouchableOpacity);

type screenName = typeof SCREEN_TRAVEL_COUNTRY_PICKER;

export type StarterScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamsType,
  screenName
>;

type StarterScreenRouteProp = RouteProp<AppNavigatorParamsType, screenName>;

export interface IMasonryViewData {
  image: string;
}
export interface TravelProfileCityProps {
  navigation: StarterScreenNavigationProp;
  route: StarterScreenRouteProp;
  travelProfileStore: TravelProfile;
  welcomeStateStore: WelcomeState;
}

export interface ISuggestedCountry {
  id: number;
  imageUrl: string;
  name: string;
  isSelected: boolean;
}

export interface ICountryDetail {
  name: string;
  countryId: number;
  imageUrl: string;
}

const PORTRAIT_IMAGE_WIDTH = responsiveWidth(40);
const PORTRAIT_IMAGE_HEIGHT = ratioCalculator(39, 53, PORTRAIT_IMAGE_WIDTH);

const TravelProfileCityComponent = ({
  navigation,
  route,
  travelProfileStore,
  welcomeStateStore
}: TravelProfileCityProps) => {
  const { countriesList } = travelProfileStore;

  const [suggestedCountries, setSuggestedCountries] = useState<
    ISuggestedCountry[]
  >([]);

  useEffect(() => {
    navigation.setOptions({
      header: options =>
        WelcomeHeader(options, {
          rightLinkText: "Skip question",
          onRightLinkClick: skipFlow,
          leftLinkText: "Part 1 of 3",
          onLeftLinkClick: prevScreen
        })
    });

    setSuggestedCountries(
      countriesList.map(country => {
        return {
          id: country.countryId,
          name: country.name,
          imageUrl: country.imageUrl,
          isSelected: false
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevScreen = () => {
    navigation.goBack();
  };

  const skipFlow = () => {
    welcomeStateStore.patchWelcomeState(
      "skippedAt",
      SCREEN_TRAVEL_COUNTRY_PICKER
    );
    navigation.dispatch(skipUserProfileBuilder());
  };

  const selectSuggestedCountry = (countryId: number) => {
    const updatedCountriesList = suggestedCountries.map(country => {
      if (country.id === countryId) {
        return {
          ...country,
          isSelected: !country.isSelected
        };
      }
      return country;
    });
    setSuggestedCountries(updatedCountriesList);
  };

  const isPositive = route.params ? route.params.isPositive : false;
  const sectionTitle = isPositive
    ? "Tell us where you wish to go"
    : "Tell us where you’ve been";
  const sectionDescription = isPositive
    ? "So we can recommend where you can go next."
    : "So we can recommend where you can go next.";

  const selectedCities = suggestedCountries.filter(
    suggestedCity => suggestedCity.isSelected
  );

  const continueFlow = () => {
    travelProfileStore.updateTravelProfileData({
      travelledCountries: suggestedCountries.map(country => country.id)
    });
    welcomeStateStore.patchWelcomeState("seenTravelCountryPicker", true);
    navigation.navigate(SCREEN_TRAVEL_MARITAL_STATUS);
  };

  const [search, setSearch] = useState<string>("");

  const clearSearch = () => setSearch("");

  const citiesToDisplay = !search
    ? suggestedCountries
    : suggestedCountries.filter(country => {
        return matchQueryWithText(search, country.name);
      });

  return (
    <View style={styles.travelProfileCityContainer}>
      <SearchBox
        textPlaceholder={"Find a country"}
        text={search}
        onChangeText={setSearch}
        onClear={clearSearch}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle
          title={sectionTitle}
          description={sectionDescription}
          containerStyle={styles.sectionTitleContainerStyle}
        />

        <MasonryView
          removeClippedSubviews={true}
          style={styles.scrollContainer}
          columns={2}
          columnStyle={styles.scrollColumn}
          oddColumnStyle={styles.oddColumnStyle}
          evenColumnStyle={styles.evenColumnStyle}
        >
          {citiesToDisplay.map((suggestedCity, suggestedCityIndex) => {
            const onSelect = () => {
              selectSuggestedCountry(suggestedCity.id);
            };

            return (
              <AnimatableView
                key={suggestedCityIndex}
                animation={"fadeInUp"}
                delay={300 * (suggestedCityIndex + 1)}
                style={styles.selectablePortraitImageStyle}
                useNativeDriver={true}
              >
                <SelectablePortraitImage
                  onPress={onSelect}
                  isSelected={suggestedCity.isSelected}
                  imageSource={suggestedCity.imageUrl}
                  portraitImageHeight={PORTRAIT_IMAGE_HEIGHT}
                  containerStyle={styles.selectablePortraitImageStyle}
                />
              </AnimatableView>
            );
          })}
        </MasonryView>
      </ScrollView>

      <AnimatableTouchableOpacity
        onPress={continueFlow}
        activeOpacity={0.8}
        style={styles.buttonWrapperStyle}
        animation={selectedCities.length ? "fadeInUp" : "fadeOutDown"}
        useNativeDriver={true}
        duration={150}
      >
        <Text
          style={styles.selectedTextStyle}
        >{`${selectedCities.length} Selected`}</Text>
        <Text style={styles.textStyle}>Next - Marital Status</Text>
      </AnimatableTouchableOpacity>
    </View>
  );
};

const TravelProfileCity = ErrorBoundary()(
  inject("welcomeStateStore")(
    inject("travelProfileStore")(observer(TravelProfileCityComponent))
  )
);

/* GUTTER SPACER */
const GUTTER_SPACING = 24;

const BOTTOM_SPACING = GUTTER_SPACING;
const LEFT_SPACING = GUTTER_SPACING + 8;
const RIGHT_SPACING = GUTTER_SPACING + 8;

const styles = StyleSheet.create({
  travelProfileCityContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white1
  },

  sectionTitleContainerStyle: {
    paddingHorizontal: GUTTER_SPACING,
    marginBottom: GUTTER_SPACING
  },

  buttonWrapperStyle: {
    height: 56,
    backgroundColor: CONSTANT_firstColor,
    borderRadius: 4,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "absolute",
    left: LEFT_SPACING,
    right: RIGHT_SPACING,
    bottom: BOTTOM_SPACING + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  },

  selectedTextStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12)
  },

  textStyle: {
    color: CONSTANT_white1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16)
  },

  scrollContainer: {
    paddingHorizontal: 24
  },

  scrollColumn: {
    width: responsiveWidth(50) - 24
  },

  oddColumnStyle: {
    marginTop: 32,
    paddingLeft: 8
  },

  evenColumnStyle: {
    paddingRight: 8
  },
  selectablePortraitImageStyle: {
    marginBottom: 16
  }
});

export default TravelProfileCity;
