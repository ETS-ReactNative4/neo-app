import React, {Fragment, useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
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
  SCREEN_SEARCH_TAB,
} from '../../NavigatorsV2/ScreenNames';
import usePackagesSearchApi from '../SearchScreen/hooks/usePackagesSearchApi';
import {IPackageItinerary} from '../../TypeInterfaces/IPackageItinerary';
import {createAnimatableComponent} from 'react-native-animatable';
import EmptyListPlaceholder from '../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder';
import useSearchScreenDataRequest from './hook/useSearchScreenDataRequest';
import {CONSTANT_onVactionFaqIcon} from '../../constants/imageAssets';
import constants from '../../constants/constants';
const limit = 4;

// const data = {
//   vacationTheme: {
//     title: 'Vacation themes',
//     data: [
//       {
//         image:
//           'https://d3lf10b5gahyby.cloudfront.net/packages/banners/themed/m-honeymoon-banner.jpg',
//         title: 'Honeymoon',
//         searchQuery: 'honeymoon-packages',
//       },
//       {
//         image:
//           'https://d3lf10b5gahyby.cloudfront.net/packages/banners/themed/m-honeymoon-banner.jpg',
//         title: 'Family',
//         searchQuery: 'family-packages',
//       },
//       {
//         image:
//           'https://d3lf10b5gahyby.cloudfront.net/packages/banners/themed/m-honeymoon-banner.jpg',
//         title: 'Beach',
//         searchQuery: 'beach-packages',
//       },
//       {
//         image:
//           'https://d3lf10b5gahyby.cloudfront.net/packages/banners/themed/m-honeymoon-banner.jpg',
//         title: 'Adventure',
//         searchQuery: 'adventure-packages',
//       },
//     ],
//   },
//   topResort: {
//     title: 'Top selling resorts',
//     data: [
//       {
//         image:
//           'https://d3lf10b5gahyby.cloudfront.net/packages/banners/themed/m-honeymoon-banner.jpg',
//         title: 'Coco Budhu Hiti, Maldvies',
//         slug: 'packages/stunning-5-day-trip-to-maldives-for-honeymoon',
//         isDeals: false,
//       },
//     ],
//   },
// };
const Search = ({navigation}) => {
  const [searchString, setSearchString] = useState('');
  const [searchResults, setSearchResults] = useState<IPackageItinerary[]>([]);
  const [searchScreenData, setSearchScreenData] = useState({});

  const abortFetchRef = useRef<any>(null);
  const [
    searchScreenApiDetails,
    loadSearchScreenData,
  ] = useSearchScreenDataRequest();
  const [packagesApiDetails, searchPackages] = usePackagesSearchApi();

  const {
    successResponseData: packageResponseData,
    isLoading: isPackagesApiLoading,
  } = packagesApiDetails;
  const {successResponseData} = searchScreenApiDetails;

  useEffect(() => {
    loadSearchScreenData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const delayedQuery = _debounce(() => {
  //   if (abortFetchRef.current) {
  //     abortFetchRef.current.abort();
  //   }
  //   // @ts-ignore
  //   // eslint-disable-next-line no-undef
  //   abortFetchRef.current = new AbortController();
  //   searchPackages({
  //     limit,
  //     offset: 0,
  //     searchString,
  //     abortController: abortFetchRef.current,
  //   }).catch(() => null);
  // }, 300);

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
      // delayedQuery();
    } else {
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchString]);

  useDeepCompareEffect(() => {
    setSearchResults([...searchResults, ...(packageResponseData?.data || [])]);
  }, [packageResponseData || {}]);

  useDeepCompareEffect(() => {
    if (successResponseData) {
      setSearchScreenData(successResponseData?.data?.[0]?.value ?? {});
    }
  }, [successResponseData || {}]);

  const resetSearchString = () => {
    setSearchString('');
    setSearchResults([]);
  };

  const onClickThemeCard = ({searchQuery}: {searchQuery: string}) => {
    navigation.navigate(SCREEN_LISTING_PAGE, {
      slug: searchQuery,
    });
  };

  const openItinerary = (slug: string) => {
    navigation.navigate(SCREEN_ITINERARY, {
      slug,
      itinerarySource: SCREEN_SEARCH_TAB,
    });
  };

  const AnimatableView = createAnimatableComponent(View);

  const {vacationTheme, topResort} = searchScreenData;
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
                title={vacationTheme.title}
                list={vacationTheme.data}
                onClick={onClickThemeCard}
              />
            ) : null}
            {topResort ? (
              <SearchSection title={topResort.title}>
                {topResort.data.map(
                  (
                    resort: {slug: string; title: string; image: string},
                    index: number,
                  ) => {
                    const onClick = () => openItinerary(resort.slug);
                    return (
                      <SearchLineItem
                        text={resort.title}
                        image={resort.image}
                        action={onClick}
                        key={`resort-${index}`}
                      />
                    );
                  },
                )}
              </SearchSection>
            ) : null}
          </Fragment>
        ) : null}
        {/* tagText='🔥 Top selling'  */}
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
          <SearchSection>
            {searchResults
              .slice(0, 3)
              .map(
                ({
                  title,
                  image,
                  slug,
                }: {
                  title: string;
                  image: string;
                  slug: string;
                }) => {
                  const onClick = () => openItinerary(slug);
                  return (
                    <SearchLineItem
                      text={title}
                      image={image}
                      action={onClick}
                    />
                  );
                },
              )}

            {searchResults.length === limit ? (
              <SearchLineItem
                text={
                  <Text>
                    See all <Text style={styles.bold}>Packages</Text>
                  </Text>
                }
                tagText="200+ packages"
                image=""
                icon={CONSTANT_onVactionFaqIcon}
                action={() => openItinerary(searchString)}
              />
            ) : null}
          </SearchSection>
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
    elevation: 5,
  },
  search: {
    height: 56,
    backgroundColor: CONSTANT_white,
    marginBottom: 12,
  },
  listContainer: {
    backgroundColor: '#F7F8FB',
    // flex: 1,
  },
  bold: {
    fontWeight: '700',
  },
  placeholderWrapper: {flex: 1, backgroundColor: CONSTANT_white},
});

export default Search;
