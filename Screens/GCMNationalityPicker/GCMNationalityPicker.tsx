import React, { useState } from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import GCMViewer from "../GCMFormScreen/Components/GCMViewer";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_GCM_NATIONALITY_PICKER } from "../../NavigatorsV2/ScreenNames";
import SearchBox from "../../CommonComponents/SearchBox/SearchBox";
import { CONSTANT_black1 } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
// @ts-ignore
import CountryData from "country-data";
import _ from "lodash";

export interface ICountryData {
  alpha2: string;
  alpha3: string;
  countryCallingCodes: string[];
  currencies: string[];
  emoji: string;
  ioc: string;
  languages: string;
  name: string;
  status: string;
}

type GCMNationalityPickerNavTypes = AppNavigatorProps<
  typeof SCREEN_GCM_NATIONALITY_PICKER
>;

export interface GCMNationalityPicker extends GCMNationalityPickerNavTypes {}

export interface INationalityOption {
  name: string;
  value: string;
}

const GCMNationalityPicker = ({ navigation, route }: GCMNationalityPicker) => {
  const [searchString, setSearchString] = useState<string>("");

  const {
    title = "",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSelect = (selected: INationalityOption) => null,
    bannerImage = "https://pickyourtrail-guides-images.imgix.net/misc/hungary.jpeg"
  } = route.params || {};

  const updateText = (text: string) => setSearchString(text);

  const resetText = () => setSearchString("");

  const goBack = () => navigation.goBack();

  const data = _.orderBy(
    CountryData.countries.all,
    "name",
    "asc"
  ) as ICountryData[];

  // alpha2: "AF"
  // alpha3: "AFG"
  // countryCallingCodes: ["+93"]
  // currencies: ["AFN"]
  // emoji: "🇦🇫"
  // ioc: "AFG"
  // languages: ["pus"]
  // name: "Afghanistan"
  // status: "assigned"

  const countriesToDisplay = !searchString
    ? data
    : data.filter(nationality => {
        const formattedNationality = nationality.name
          .replace(/ /g, "")
          .toUpperCase();
        const formattedSearchString = searchString
          .replace(/ /g, "")
          .toUpperCase();
        const formattedNationalityCode = nationality.alpha2
          .replace(/ /g, "")
          .toUpperCase();

        if (
          formattedNationality.includes(formattedSearchString) ||
          formattedNationalityCode.includes(formattedSearchString)
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
        {countriesToDisplay.map((nationality, nationalityIndex) => {
          const onSelectOption = () => {
            onSelect({
              name: nationality.name,
              value: nationality.alpha2
            });
            goBack();
          };

          return (
            <TouchableOpacity
              key={nationalityIndex}
              activeOpacity={0.8}
              onPress={onSelectOption}
              style={styles.searchList}
            >
              <Text
                style={styles.searchListText}
              >{`${nationality.name} (${nationality.alpha2})`}</Text>
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

export default GCMNationalityPicker;
