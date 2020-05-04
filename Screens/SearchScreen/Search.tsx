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
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_ITINERARY
} from "../../NavigatorsV2/ScreenNames";
import SearchBox from "../../CommonComponents/SearchBox/SearchBox";
import { PreTripHomeTabsType } from "../../NavigatorsV2/PreTripHomeTabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import SearchItem from "./Components/SearchItem";
import { IPackageItinerary } from "../../TypeInterfaces/IPackageItinerary";
import usePackagesSearchApi from "./hooks/usePackagesSearchApi";
import useDeepCompareEffect from "use-deep-compare-effect";
import EmptyListPlaceholder from "../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder";

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
  searchQuery: string;
}

const categories: ISearchCategory[] = [
  // {
  //   text: "ALL",
  //   emoji: "😄",
  //   searchQuery: "all-packages"
  // },
  {
    text: "ADVENTURE",
    emoji: "🐊",
    searchQuery: "adventure-packages"
  },
  {
    text: "ATTRACTION",
    emoji: "🎪",
    searchQuery: "attraction-packages"
  },
  {
    text: "CULTURE",
    emoji: "👨🏽‍💼",
    searchQuery: "culture-packages"
  },
  {
    text: "LEISURE",
    emoji: "🏍",
    searchQuery: "leisure-packages"
  },
  {
    text: "NATURE",
    emoji: "😄",
    searchQuery: "nature-packages"
  },
  {
    text: "KID_FRIENDLY",
    emoji: "😄",
    searchQuery: "kid-friendly-packages"
  },
  {
    text: "BEACH",
    emoji: "😄",
    searchQuery: "beach-packages"
  },
  {
    text: "ART_AND_CULTURE",
    emoji: "😄",
    searchQuery: "art-and-culture-packages"
  }
];

const Search = ({ navigation }: SearchScreenProps) => {
  const limit = useRef(15).current;

  const [searchString, setSearchString] = useState("");

  const [searchResults, setSearchResults] = useState<IPackageItinerary[]>([]);

  const [categoryResults, setCategoryResults] = useState<IPackageItinerary[]>(
    []
  );

  const [selectedCategory, setSelectedCategory] = useState<ISearchCategory>(
    categories[0]
  );

  const [offset, setOffset] = useState(1);

  const updateText = (newText: string) => setSearchString(newText);

  const resetText = () => setSearchString("");

  const [packagesApiDetails, searchPackages] = usePackagesSearchApi();

  const [categoryOffset, setCategoryOffset] = useState(1);

  const [
    categoryWisePackagesApiDetails,
    loadPackagesByCategory
  ] = usePackagesSearchApi();

  useDeepCompareEffect(() => {
    setCategoryOffset(1);
    setCategoryResults([]);
    loadPackagesByCategory({
      limit,
      offset: 1,
      searchString: selectedCategory.searchQuery
    });
  }, [selectedCategory]);

  useEffect(() => {
    loadPackagesByCategory({
      limit,
      offset: categoryOffset,
      searchString: selectedCategory.searchQuery
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryOffset]);

  useEffect(() => {
    setOffset(1);
    setSearchResults([]);
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

  const {
    successResponseData,
    isLoading: isPackagesApiLoading
  } = packagesApiDetails;
  const {
    successResponseData: categorySuccessResponseData,
    isLoading: isCategoryApiLoading
  } = categoryWisePackagesApiDetails;

  const paginate = () => {
    if (searchString) {
      if (successResponseData?.data.length) {
        setOffset(offset + 1);
      }
    } else {
      if (categorySuccessResponseData?.data.length) {
        setCategoryOffset(categoryOffset + 1);
      }
    }
  };

  useDeepCompareEffect(() => {
    setSearchResults([...searchResults, ...(successResponseData?.data || [])]);
  }, [successResponseData || {}]);

  useDeepCompareEffect(() => {
    setCategoryResults([
      ...categoryResults,
      ...(categorySuccessResponseData?.data || [])
    ]);
  }, [categorySuccessResponseData || {}]);

  const selectCategory = (newCategory: ISearchCategory) => {
    setSelectedCategory(newCategory);
  };

  /**
   * PT TODO: finish after itinerary screen is built
   */
  const openItinerary = (slug: string) => {
    navigation.navigate(SCREEN_ITINERARY, {
      slug
    });
  };

  const isLoading = isPackagesApiLoading || isCategoryApiLoading;

  const isSearchMode = !!searchString;

  const isSearchResultsAvailable = !!searchResults.length;

  const isPackagesResultsAvailable = !!categoryResults.length;

  const isResultsAvailable = isSearchMode
    ? isSearchResultsAvailable
    : isPackagesResultsAvailable;

  return (
    <SafeAreaView style={styles.searchScreenContainerStyle}>
      <SearchBox
        text={searchString}
        onChangeText={updateText}
        textPlaceholder={"Search by city, country, or experience"}
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
      {!isLoading && !isResultsAvailable ? (
        <EmptyListPlaceholder
          text={"No itineraries found matching your criteria"}
        />
      ) : (
        <FlatList
          data={searchString ? searchResults : categoryResults}
          renderItem={({ item }) => {
            const onClick = () => openItinerary(item.slug);
            return (
              <SearchItem title={item.title} emoji={"😄"} action={onClick} />
            );
          }}
          keyExtractor={(item, itemIndex) => `${itemIndex}`}
          onEndReached={paginate}
        />
      )}
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
