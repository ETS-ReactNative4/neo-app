import React, { useState, useEffect, useRef } from "react";
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

export type searchCategoriesType =
  | "ALL"
  | "ADVENTURE"
  | "ATTRACTION"
  | "CULTURE"
  | "LEISURE"
  | "NATURE"
  | "KID_FRIENDLY"
  | "BEACH"
  | "ART_AND_CULTURE";

export interface ISearchCategory {
  text: searchCategoriesType;
  emoji: string;
}

const categories: ISearchCategory[] = [
  {
    text: "ALL",
    emoji: "😄"
  },
  {
    text: "ADVENTURE",
    emoji: "🐊"
  },
  {
    text: "ATTRACTION",
    emoji: "🎪"
  },
  {
    text: "CULTURE",
    emoji: "👨🏽‍💼"
  },
  {
    text: "LEISURE",
    emoji: "🏍"
  },
  {
    text: "NATURE",
    emoji: "😄"
  },
  {
    text: "KID_FRIENDLY",
    emoji: "😄"
  },
  {
    text: "BEACH",
    emoji: "😄"
  },
  {
    text: "ART_AND_CULTURE",
    emoji: "😄"
  }
];

const Search = ({}: SearchScreenProps) => {
  const limit = useRef(15).current;

  const [searchString, setSearchString] = useState("");

  const [selectedCategory, setSelectedCategory] = useState<
    searchCategoriesType
  >("ALL");

  const [offset, setOffset] = useState(1);

  const updateText = (newText: string) => setSearchString(newText);

  const resetText = () => setSearchString("");

  const [packagesApiDetails, searchPackages] = usePackagesSearchApi();

  const [searchResults, setSearchResults] = useState<IPackageItinerary[]>([]);

  useEffect(() => {
    setOffset(1);
    if (searchString) {
      searchPackages({
        limit,
        offset,
        searchString
      });
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  useEffect(() => {
    if (searchString) {
      searchPackages({
        limit,
        offset,
        searchString
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const { successResponseData } = packagesApiDetails;

  const paginate = () => {
    if (successResponseData?.data.length) {
      setOffset(offset + 1);
    }
  };

  useDeepCompareEffect(() => {
    setSearchResults([...searchResults, ...(successResponseData?.data || [])]);
  }, [successResponseData || {}]);

  const selectCategory = (newCategory: searchCategoriesType) => {
    setSelectedCategory(newCategory);
  };

  /**
   * PT TODO: finish after itinerary screen is built
   */
  const openItinerary = () => {};

  return (
    <SafeAreaView style={styles.searchScreenContainerStyle}>
      <SearchBox
        text={searchString}
        onChangeText={updateText}
        textPlaceholder={"Search for places"}
        onClear={resetText}
        containerStyle={styles.inputStyle}
      />
      {!searchString ? (
        <SearchTabPills
          selectedCategory={selectedCategory}
          categories={categories}
          selectCategory={selectCategory}
        />
      ) : null}
      <BlankSpacer height={1} containerStyle={styles.dividerStyle} />
      <BlankSpacer height={8} />
      <FlatList
        data={searchResults}
        renderItem={({ item }) => {
          const onClick = () => openItinerary();
          return (
            <SearchItem title={item.title} emoji={"😄"} action={onClick} />
          );
        }}
        keyExtractor={(item, itemIndex) => `${itemIndex}`}
        onEndReached={paginate}
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
