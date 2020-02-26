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

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);

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
}

export interface ISuggestedCity {
  index: number;
  imageUrl: string;
  isSelected: boolean;
}

export interface ICountryDetail {
  name: string;
  countryId: number;
  imageUrl: string;
}

const PORTRAIT_IMAGE_WIDTH = responsiveWidth(40);
const PORTRAIT_IMAGE_HEIGHT = ratioCalculator(39, 53, PORTRAIT_IMAGE_WIDTH);

const TravelProfileCity = ({ navigation, route }: TravelProfileCityProps) => {
  const [suggestedCities, setSuggestedCities] = useState<ISuggestedCity[]>([]);
  const [cityData] = useState<IMasonryViewData[]>([
    {
      image:
        "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/paris.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/london.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/city/zagreb.jpg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    },
    {
      image:
        "https://pyt-images.imgix.net/images/misc/germany.jpeg?w=146&h=200&fit=crop&dpr=2&auto=format,compress,enhance&q=20"
    }
  ]);

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

    setSuggestedCities(
      cityData.map((city, cityIndex) => {
        return {
          index: cityIndex,
          imageUrl: city.image,
          isSelected: false
        };
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const prevScreen = () => {};

  const skipFlow = () => {};

  const selectSuggestedCity = (cityIndex: number) => {
    const citiesList = [...suggestedCities];
    citiesList[cityIndex].isSelected = !citiesList[cityIndex].isSelected;
    setSuggestedCities(citiesList);
  };

  const { isPositive } = route.params;
  const sectionTitle = isPositive
    ? "Tell us where you’ve been"
    : "Tell us where you wish to go";
  const sectionDescription = isPositive
    ? "So we can recommend where you can go next."
    : "So we can recommend where you can go next.";

  const selectedCities = suggestedCities.filter(
    suggestedCity => suggestedCity.isSelected
  );

  const continueFlow = () => {
    navigation.navigate(SCREEN_TRAVEL_MARITAL_STATUS);
  };

  const [search, setSearch] = useState<string>("");

  const clearSearch = () => setSearch("");

  /**
   * TODO: requires real data for search
   */
  const citiesToDisplay = !search
    ? suggestedCities
    : suggestedCities.filter(() => true);

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
              selectSuggestedCity(suggestedCity.index);
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

      <AnimatableView
        animation={selectedCities.length ? "fadeInUp" : "fadeOutDown"}
        useNativeDriver={true}
        duration={150}
        style={styles.buttonWrapperStyle}
      >
        <TouchableOpacity onPress={continueFlow} activeOpacity={0.8}>
          <View style={styles.buttonTextWrapperStyle}>
            <Text
              style={styles.selectedTextStyle}
            >{`${selectedCities.length} Selected`}</Text>
            <Text style={styles.textStyle}>Next - Marital Status</Text>
          </View>
        </TouchableOpacity>
      </AnimatableView>
    </View>
  );
};

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
    justifyContent: "center",
    position: "absolute",
    left: LEFT_SPACING,
    right: RIGHT_SPACING,
    bottom: BOTTOM_SPACING + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  },

  buttonTextWrapperStyle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
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

export default ErrorBoundary()(TravelProfileCity);
