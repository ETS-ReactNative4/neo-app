import React, {Fragment, useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  Platform,
} from 'react-native';
import useDeepCompareEffect from 'use-deep-compare-effect';
import SearchBox from '../../CommonComponents/SearchBox/SearchBox';
import {CONSTANT_white} from '../../constants/colorPallete';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../constants/fonts';
import {SearchSection} from './components/Section';
import {SearchLineItem} from './components/SearchLineItem';
import {VacationTheme} from './components/VacationTheme';
import {
  SCREEN_ITINERARY,
  SCREEN_LISTING_PAGE,
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_SEARCH_LISTING_CARDS_PAGE,
  SCREEN_SEARCH_TAB,
} from '../../NavigatorsV2/ScreenNames';
import {IPackageItinerary} from '../../TypeInterfaces/IPackageItinerary';
import {createAnimatableComponent} from 'react-native-animatable';
import EmptyListPlaceholder from '../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder';
import useSearchScreenDataRequest, {
  TopResortType,
  VacationThemeType,
} from './hook/useSearchScreenDataRequest';
import {CONSTANT_onVactionFaqIcon} from '../../constants/imageAssets';
import constants from '../../constants/constants';
import usePackagesSearchV2Api from './hook/usePackagesSearchApi';
import openCustomTab from '../../Services/openCustomTab/openCustomTab';
import BlankSpacer from '../../CommonComponents/BlankSpacer/BlankSpacer';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {
  CONSTANT_platformAndroid,
  STAYCATION_VERSION,
} from '../../constants/stringConstants';
import {CONSTANT_productUrl} from '../../constants/serverUrls';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamsType} from '../../NavigatorsV2/AppNavigator';
import {PreTripHomeTabsType} from '../../NavigatorsV2/PreTripHomeTabs';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

export type SearchScreenNavigationType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_PRETRIP_HOME_TABS>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_SEARCH_TAB>
>;

export interface SearchScreenProps {
  navigation: SearchScreenNavigationType;
}

interface SearchScreenDataProps {
  vacationTheme: VacationThemeType;
  topResort: TopResortType;
}
const limit = 3;

const Search = ({navigation}: SearchScreenProps) => {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState<IPackageItinerary[]>([]);
  const [searchScreenData, setSearchScreenData] = useState<
    SearchScreenDataProps
  >({vacationTheme: {title: '', data: []}, topResort: {title: '', data: []}});

  const abortFetchRef = useRef<any>(null);
  const [
    searchScreenApiDetails,
    loadSearchScreenData,
  ] = useSearchScreenDataRequest();
  const [packagesApiDetails, searchPackages] = usePackagesSearchV2Api();

  const {
    successResponseData: packageResponseData,
    isLoading: isPackagesApiLoading,
  } = packagesApiDetails;
  const {successResponseData} = searchScreenApiDetails;

  useEffect(() => {
    loadSearchScreenData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSearchResults([]);
    if (searchString) {
      if (abortFetchRef.current) {
        abortFetchRef.current.abort();
      }
      // @ts-ignore
      // eslint-disable-next-line no-undef
      abortFetchRef.current = new AbortController();
      searchPackages({
        limit,
        offset: 0,
        searchString,
        abortController: abortFetchRef.current,
      }).catch(() => null);
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  useDeepCompareEffect(() => {
    const {dealItineraries = [], nonDealItineraries = []} =
      packageResponseData?.data || {};
    setSearchResults([
      ...searchResults,
      ...(dealItineraries || []),
      ...(nonDealItineraries || []),
    ]);
  }, [packageResponseData || {}]);

  useDeepCompareEffect(() => {
    if (successResponseData) {
      const {data} = successResponseData || {};
      setSearchScreenData(data?.[0]?.value ?? {});
    }
  }, [successResponseData || {}]);

  const resetSearchString = () => {
    setSearchString('');
    setSearchResults([]);
  };

  const onClickThemeCard = ({searchQuery}: {searchQuery: string}) => {
    navigation.navigate(SCREEN_LISTING_PAGE, {
      slug: searchQuery,
      apiUrl: '',
    });
  };

  const openItinerary = (slug: string, isDeal?: boolean) => {
    if (isDeal) {
      openCustomTab(`${CONSTANT_productUrl}${slug}`);
    } else {
      navigation.navigate(SCREEN_ITINERARY, {
        slug,
        itinerarySource: SCREEN_SEARCH_TAB,
      });
    }
  };

  const openSearchListing = ({searchQuery}: {searchQuery: string}) => {
    navigation.navigate(SCREEN_SEARCH_LISTING_CARDS_PAGE, {
      searchString: searchQuery,
    });
  };
  const AnimatableView = createAnimatableComponent(View);

  const {vacationTheme, topResort} = searchScreenData;
  const searchResultList = searchResults.slice(0, 6);

  const listBottomSpace =
    Platform.OS === CONSTANT_platformAndroid ? (
      <BlankSpacer height={responsiveHeight(10)} />
    ) : (
      <BlankSpacer height={24} />
    );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox
        text={searchString}
        onChangeText={setSearchString}
        textPlaceholder={'Seach for places...'}
        onClear={resetSearchString}
        containerStyle={styles.search}
        iconColor="#00774F"
        placeholderTextColor="#333333"
        innerBoxStyle={styles.searchInnerBox}
        inputStyle={styles.searchInput}
      />

      <View style={styles.listContainer}>
        {!searchString ? (
          <Fragment>
            {vacationTheme ? (
              <VacationTheme
                title={vacationTheme?.title}
                list={vacationTheme?.data}
                onClick={onClickThemeCard}
              />
            ) : null}
            {topResort ? (
              <SearchSection title={topResort?.title}>
                {topResort?.data?.map(
                  (
                    resort: {
                      slug: string;
                      title: string;
                      image: string;
                      isDeal?: boolean;
                    },
                    index: number,
                  ) => {
                    const onClick = () =>
                      openItinerary(resort.slug, resort.isDeal);
                    return (
                      <SearchLineItem
                        text={resort.title}
                        image={resort.image}
                        action={onClick}
                        key={`resort-${index}`}
                        noBorder={topResort.data.length - 1 === index}
                      />
                    );
                  },
                )}
              </SearchSection>
            ) : null}
          </Fragment>
        ) : null}
        {!isPackagesApiLoading && !searchResults.length && searchString ? (
          <AnimatableView
            style={styles.placeholderWrapper}
            delay={1000}
            animation={'fadeIn'}>
            <EmptyListPlaceholder
              text={'No itineraries found matching your criteria'}
            />
          </AnimatableView>
        ) : searchResults.length && searchString ? (
          <View style={styles.searchList}>
            <FlatList
              data={searchString ? searchResultList : []}
              renderItem={({item}) => {
                const isDeal = item.type === STAYCATION_VERSION;
                const onClick = () => openItinerary(item.slug, isDeal);
                return (
                  <SearchLineItem
                    text={item.title}
                    image={item.image}
                    action={onClick}
                    isDeals={isDeal}
                  />
                );
              }}
              ListFooterComponent={() => {
                if (
                  packageResponseData?.data?.nonDealItineraries?.length ===
                  limit
                ) {
                  return (
                    <Fragment>
                      <SearchLineItem
                        text={
                          <Text>
                            See all <Text style={styles.bold}>Packages</Text>
                          </Text>
                        }
                        tagText=""
                        image=""
                        icon={CONSTANT_onVactionFaqIcon}
                        action={() =>
                          openSearchListing({searchQuery: searchString})
                        }
                      />
                      {listBottomSpace}
                    </Fragment>
                  );
                } else {
                  return listBottomSpace;
                }
              }}
              keyExtractor={(item, itemIndex) => `${itemIndex}`}
            />
          </View>
        ) : null}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANT_white,
  },
  searchInput: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 20),
    color: '#333333',
  },
  searchInnerBox: {
    backgroundColor: '#F7F8FB',
    shadowColor: constants.shade4,
    shadowOffset: {
      height: 5,
      width: 0,
    },
    shadowRadius: 5,
    shadowOpacity: 0.8,
    elevation: 10,
  },
  search: {
    height: 56,
    backgroundColor: CONSTANT_white,
    marginBottom: 0,
  },
  listContainer: {
    backgroundColor: '#F7F8FB',
  },
  bold: {
    fontWeight: '700',
  },
  placeholderWrapper: {flex: 1, backgroundColor: CONSTANT_white},
  searchList: {
    backgroundColor: CONSTANT_white,
  },
});

export default Search;
