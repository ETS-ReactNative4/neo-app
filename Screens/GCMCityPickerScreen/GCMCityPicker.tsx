import React, { useState, useEffect } from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import GCMViewer from "../GCMFormScreen/Components/GCMViewer";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_GCM_CITY_PICKER } from "../../NavigatorsV2/ScreenNames";
import SearchBox from "../../CommonComponents/SearchBox/SearchBox";
import useGetIndianCities from "./hooks/useGetIndianCities";
import { CONSTANT_black1 } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { IIndianCity } from "../GCMScreen/hooks/useGCMForm";

type GCMCityPickerNavTypes = AppNavigatorProps<typeof SCREEN_GCM_CITY_PICKER>;

export interface GCMCityPicker extends GCMCityPickerNavTypes {}

const GCMCityPicker = ({ navigation, route }: GCMCityPicker) => {
  const [searchString, setSearchString] = useState<string>("");

  const {
    title = "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSelect = (selected: IIndianCity) => null,
    bannerImage = "https://pickyourtrail-guides-images.imgix.net/misc/hungary.jpeg"
  } = route.params || {};

  const [citiesApiDetail, loadCityDetails] = useGetIndianCities();

  useEffect(() => {
    loadCityDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateText = (text: string) => setSearchString(text);

  const resetText = () => setSearchString("");

  const goBack = () => navigation.goBack();

  const { successResponseData } = citiesApiDetail;

  const { data = [] } = successResponseData || {};

  const citiesToDisplay = !searchString
    ? data
    : data.filter(city => {
        const formattedCityName = city.cityName.replace(/ /g, "").toUpperCase();
        const formattedSearchString = searchString
          .replace(/ /g, "")
          .toUpperCase();
        const formattedAirportCode = city.airportCode
          .replace(/ /g, "")
          .toUpperCase();

        if (
          formattedCityName.includes(formattedSearchString) ||
          formattedAirportCode.includes(formattedSearchString)
        ) {
          return true;
        }
        return false;
      });

  return (
    <GCMViewer bannerImage={bannerImage} backAction={goBack} title={title}>
      <SearchBox
        text={searchString}
        onChangeText={updateText}
        textPlaceholder={"Search for places"}
        onClear={resetText}
        containerStyle={styles.inputStyle}
      />
      <Text style={styles.titleStyle}>Departing from</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.searchContainerStyle}
      >
        {citiesToDisplay.map((city, cityIndex) => {
          const onSelectOption = () => {
            onSelect(city);
            goBack();
          };

          return (
            <TouchableOpacity
              key={cityIndex}
              activeOpacity={0.8}
              onPress={onSelectOption}
              style={styles.searchList}
            >
              <Text
                style={styles.searchListText}
              >{`${city.cityName} (${city.airportCode})`}</Text>
            </TouchableOpacity>
          );
        })}
        <XSensorPlaceholder />
      </ScrollView>
    </GCMViewer>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    marginTop: 16,
    backgroundColor: "white"
  },
  titleStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 16,
    paddingHorizontal: 24
  },
  searchContainerStyle: {
    paddingHorizontal: 24
  },
  searchList: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 8
  },
  searchListText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 24)
  }
});

export default GCMCityPicker;
