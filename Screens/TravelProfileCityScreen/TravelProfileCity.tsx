import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
  Platform
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
import { responsiveWidth } from "react-native-responsive-dimensions";
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
import WelcomeState from "../../mobx/WelcomeState";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import { CONSTANT_platformIos } from "../../constants/stringConstants";

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
  id: number | string;
  imageUrl: string;
  name: string;
  isSelected: boolean;
}

export interface IRegionDetail {
  regionCode: string;
  regionname: string;
  mobileImage: string;
}

export interface ICountryDetail {
  name: string;
  countryId: number;
  imageUrl: string;
}

const PORTRAIT_IMAGE_WIDTH = responsiveWidth(40);
const PORTRAIT_IMAGE_HEIGHT = ratioCalculator(39, 53, PORTRAIT_IMAGE_WIDTH);

export const regionTypeGuard = (
  region: ICountryDetail | IRegionDetail
): region is IRegionDetail => {
  // @ts-ignore
  return !!region.regionname;
};

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
          rightLinkText: "Skip",
          onRightLinkClick: skipFlow,
          leftLinkText: "Back",
          onLeftLinkClick: prevScreen
        })
    });

    setSuggestedCountries(
      countriesList.map(country => {
        if (regionTypeGuard(country)) {
          return {
            id: country.regionCode,
            name: country.regionname,
            imageUrl: country.mobileImage,
            isSelected: false
          };
        }
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
    navigation.navigate(SCREEN_TRAVEL_MARITAL_STATUS);
  };

  const selectSuggestedCountry = (countryId: number | string) => {
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
    ? "Where do you wish to travel?"
    : "Tell us where you???ve travelled before";
  const sectionDescription = isPositive
    ? "We???ve got the world right here!"
    : "And we???ll show you what more can be discovered!";

  const selectedCities = suggestedCountries.filter(
    suggestedCity => suggestedCity.isSelected
  );

  const continueFlow = () => {
    travelProfileStore.updateTravelProfileData({
      [isPositive
        ? "wishlistCountries"
        : "travelledCountries"]: selectedCities
        .filter(country => typeof country.id === "number")
        .map(country => country.id),
      [!isPositive ? "wishlistCountries" : "travelledCountries"]: [],
      regionCode: selectedCities
        .filter(country => typeof country.id === "string")
        .map(country => country.id as string)
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
        textPlaceholder={"Type destination name"}
        text={search}
        onChangeText={setSearch}
        onClear={clearSearch}
      />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle
          titleNumberOfLines={2}
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

            const Wrapper =
              Platform.OS === CONSTANT_platformIos ? View : AnimatableView;

            const wrapperProps =
              Platform.OS === CONSTANT_platformIos
                ? {}
                : {
                    animation: "fadeInUp",
                    delay: 300 * (suggestedCityIndex + 1),
                    useNativeDriver: true
                  };

            return (
              <Wrapper
                key={suggestedCityIndex}
                style={styles.selectablePortraitImageStyle}
                {...wrapperProps}
              >
                <SelectablePortraitImage
                  onPress={onSelect}
                  isSelected={suggestedCity.isSelected}
                  imageSource={suggestedCity.imageUrl}
                  portraitImageHeight={PORTRAIT_IMAGE_HEIGHT}
                  containerStyle={styles.selectablePortraitImageStyle}
                />
              </Wrapper>
            );
          })}
        </MasonryView>
        <BlankSpacer height={90} />
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
        <Text style={styles.textStyle}>Continue</Text>
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
    marginBottom: 8
  }
});

export default TravelProfileCity;
