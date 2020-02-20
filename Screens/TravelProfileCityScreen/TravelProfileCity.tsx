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
import { SCREEN_TRAVEL_COUNTRY_PICKER } from "../../NavigatorsV2/ScreenNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import WelcomeHeader from "../../NavigatorsV2/Components/WelcomeHeader";
import { RouteProp } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";

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
          onRightLinkClick: () => null,
          leftLinkText: "Part 1 of 5",
          onLeftLinkClick: () => null
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

  return (
    <View style={styles.travelProfileCityContainer}>
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
          {suggestedCities.map((suggestedCity, suggestedCityIndex) => {
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
                  containerStyle={styles.selectablePortraitImageStyle}
                />
              </AnimatableView>
            );
          })}
        </MasonryView>
      </ScrollView>

      <View style={styles.buttonWrapperStyle}>
        <TouchableOpacity activeOpacity={0.8}>
          <View style={styles.buttonTextWrapperStyle}>
            <Text style={styles.selectedTextStyle}>1 Selected</Text>
            <Text style={styles.textStyle}>Next - Marital Status</Text>
          </View>
        </TouchableOpacity>
      </View>
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

export default TravelProfileCity;
