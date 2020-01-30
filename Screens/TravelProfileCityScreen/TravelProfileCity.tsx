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
import MasonryView from "../../CommonComponents/MasonryView/MasonryView";

export interface IMasonryViewData {
  image: string;
}
export interface TravelProfileCityProps {
  cityData: IMasonryViewData[];
}

export interface ISuggestedCity {
  index: number;
  imageUrl: string;
  isSelected: boolean;
}

const TravelProfileCity = ({ cityData }: TravelProfileCityProps) => {
  const [suggestedCities, setSuggestedCities] = useState<ISuggestedCity[]>([]);

  useEffect(() => {
    setSuggestedCities(
      cityData.map((city, cityIndex) => {
        return {
          index: cityIndex,
          imageUrl: city.image,
          isSelected: false
        };
      })
    );
  }, [cityData]);

  const selectSuggestedCity = (cityIndex: number) => {
    const citiesList = [...suggestedCities];
    citiesList[cityIndex].isSelected = !citiesList[cityIndex].isSelected;
    setSuggestedCities(citiesList);
  };

  return (
    <View style={styles.travelProfileCityContainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionTitle
          title={"Tell us where you’ve been"}
          description={"So we can recommend where you can go next."}
          containerStyle={styles.sectionTitleContainerStyle}
        />

        <MasonryView
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
              <SelectablePortraitImage
                key={suggestedCityIndex}
                onPress={onSelect}
                isSelected={suggestedCity.isSelected}
                imageSource={suggestedCity.imageUrl}
                containerStyle={styles.selectablePortraitImageStyle}
              />
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
    flex: 1
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
  scrollColumn: {
    width: responsiveWidth(50) - 24
  },

  oddColumnStyle: {
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
