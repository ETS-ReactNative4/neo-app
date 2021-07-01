import React, {useState, useEffect, useRef} from 'react';
import {observer, inject} from 'mobx-react';
import {IPackageItinerary} from '../../TypeInterfaces/IPackageItinerary';
import usePackagesSearchApi from '../SearchScreen/hooks/usePackagesSearchApi';
import useDeepCompareEffect from 'use-deep-compare-effect';
import {
  SCREEN_ITINERARY,
  SCREEN_LISTING_PAGE,
  SCREEN_SEARCH_LISTING_CARDS_PAGE,
} from '../../NavigatorsV2/ScreenNames';
import {FlatList, StyleSheet, View} from 'react-native';
import ItineraryCard from '../../CommonComponents/ItineraryCard/ItineraryCard';
import getImgIXUrl from '../../Services/getImgIXUrl/getImgIXUrl';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import generateInclusions from '../ExploreScreen/services/generateInclusions';
import BlankSpacer from '../../CommonComponents/BlankSpacer/BlankSpacer';
import {ParallaxScrollViewBannerHeight} from '../../CommonComponents/ParallaxScrollView/ParallaxScrollView';
import {CONSTANT_white} from '../../constants/colorPallete';
import {CONSTANT_visaSuccessAnimation} from '../../constants/imageAssets';
import LottieView from 'lottie-react-native';
import EmptyListPlaceholder from '../../CommonComponents/EmptyListPlaceholder/EmptyListPlaceholder';
import CommonHeader from '../../CommonComponents/CommonHeader/CommonHeader';
import {Text} from 'react-native-animatable';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../constants/fonts';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';

type SearchListingCardsPageTypes = AppNavigatorProps<
  typeof SCREEN_SEARCH_LISTING_CARDS_PAGE
>;

const INITIAL_SEARCH_OFFSET = 0;

const SearchListingCardsPage = ({
  route,
  navigation,
}: SearchListingCardsPageTypes) => {
  const {searchString = ''} = route?.params || {};
  const abortFetchRef = useRef<any>(null);
  const limit = useRef(25).current;
  const [searchResults, setSearchResults] = useState<IPackageItinerary[]>([]);
  const [offset, setOffset] = useState(INITIAL_SEARCH_OFFSET);
  const [packagesApiDetails, searchPackages] = usePackagesSearchApi();

  useEffect(() => {
    if (searchString) {
      if (abortFetchRef.current) {
        abortFetchRef.current.abort();
      }
      // @ts-ignore
      // eslint-disable-next-line no-undef
      abortFetchRef.current = new AbortController();

      searchPackages({
        limit,
        offset,
        searchString,
        abortController: abortFetchRef.current,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const {successResponseData, isLoading} = packagesApiDetails;

  const paginate = () => {
    if (searchString) {
      if (successResponseData?.data.length) {
        setOffset(offset + 1);
      }
    }
  };

  useDeepCompareEffect(() => {
    setSearchResults([...searchResults, ...(successResponseData?.data || [])]);
  }, [successResponseData || {}]);

  return (
    <View style={styles.container}>
      <CommonHeader
        title={
          <View>
            <Text style={styles.title}>Holiday packages</Text>
          </View>
        }
        navigation={navigation}
      />

      <BlankSpacer height={20} />
      {!isLoading && searchResults?.length < 1 ? (
        <EmptyListPlaceholder
          text={'No itineraries found matching your criteria'}
          containerStyle={styles.placeholderWrapper}
        />
      ) : null}
      {isLoading && searchResults.length === 0 ? (
        <View style={styles.placeholderWrapper}>
          <LottieView source={CONSTANT_visaSuccessAnimation()} autoPlay loop />
        </View>
      ) : null}
      <FlatList
        data={searchResults}
        // @ts-ignore
        renderItem={({item}) => {
          const inclusionList = generateInclusions(item);

          return (
            <ItineraryCard
              thumbnailImages={[
                getImgIXUrl({
                  DPR: 0.02,
                  src: item.image,
                  imgFactor: `h=200&w=${responsiveWidth(100)}&crop=fit`,
                }),
              ]}
              images={[
                getImgIXUrl({
                  src: item.image,
                  imgFactor: `h=200&w=${responsiveWidth(100)}&crop=fit`,
                }),
              ]}
              tripType={item.tripType}
              action={() => {
                // @ts-ignore
                navigation.navigate(SCREEN_ITINERARY, {
                  slug: item.slug,
                  itinerarySource: SCREEN_LISTING_PAGE,
                });
              }}
              title={item.title}
              inclusionList={inclusionList}
              itineraryCost={item.itineraryCost}
              cities={item.cityHotelStay}
              containerStyle={styles.itineraryCardStyle}
              displayCurrency={successResponseData?.displayCurrency || 'INR'}
            />
          );
        }}
        keyExtractor={(item, itemIndex) => `${itemIndex}`}
        onEndReachedThreshold={10}
        onEndReached={() => paginate()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANT_white,
  },
  itineraryCardStyle: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  placeholderWrapper: {
    height: responsiveHeight(100) - ParallaxScrollViewBannerHeight,
  },
  title: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15, 19),
    fontWeight: '700',
    color: '#333333',
    textAlignVertical: 'center',
  },
});
export default inject('deviceLocaleStore')(observer(SearchListingCardsPage));
