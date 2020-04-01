import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, FlatList } from "react-native";
import SearchTabPills from "./Components/SearchTabPills";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import { CONSTANT_shade3, CONSTANT_white } from "../../constants/colorPallete";
import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import {
  SCREEN_SEARCH_TAB,
  SCREEN_PRETRIP_HOME_TABS
} from "../../NavigatorsV2/ScreenNames";
import SearchBox from "../../CommonComponents/SearchBox/SearchBox";
import { PreTripHomeTabsType } from "../../NavigatorsV2/PreTripHomeTabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import SearchItem from "./Components/SearchItem";
import { IPackageItinerary } from "../../TypeInterfaces/IPackageItinerary";
import usePackagesSearchApi from "./hooks/usePackagesSearchApi";
import useDeepCompareEffect from "use-deep-compare-effect";

export type SearchScreenNavigationType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_PRETRIP_HOME_TABS>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_SEARCH_TAB>
>;

export type SearchScreenRouteProp = RouteProp<
  PreTripHomeTabsType,
  typeof SCREEN_SEARCH_TAB
>;

export interface SearchScreenProps {
  navigation: SearchScreenNavigationType;
  route: SearchScreenRouteProp;
}

const Search = ({}: SearchScreenProps) => {
  const [searchText, setSearchText] = useState("");

  const updateText = (newText: string) => setSearchText(newText);

  const resetText = () => setSearchText("");

  const [packagesApiDetails, searchPackages] = usePackagesSearchApi();

  const [searchResults, setSearchResults] = useState<IPackageItinerary[]>([]);

  useEffect(() => {
    searchPackages({
      limit: 15,
      offset: 1,
      searchString: searchText
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  const { successResponseData } = packagesApiDetails;

  useDeepCompareEffect(() => {
    setSearchResults(successResponseData?.data || []);
  }, [successResponseData || {}]);

  return (
    <SafeAreaView style={styles.searchScreenContainerStyle}>
      <SearchBox
        text={searchText}
        onChangeText={updateText}
        textPlaceholder={"Search for places"}
        onClear={resetText}
        containerStyle={styles.inputStyle}
      />
      {!searchText ? <SearchTabPills /> : null}
      <BlankSpacer height={1} containerStyle={styles.dividerStyle} />
      <BlankSpacer height={8} />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => {
          const onClick = () => null;
          return (
            <SearchItem title={item.title} emoji={"😄"} action={onClick} />
          );
        }}
        keyExtractor={item => item.campaignItineraryId}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchScreenContainerStyle: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  inputStyle: {
    backgroundColor: CONSTANT_white
  },
  dividerStyle: {
    backgroundColor: CONSTANT_shade3
  }
});

export default Search;
