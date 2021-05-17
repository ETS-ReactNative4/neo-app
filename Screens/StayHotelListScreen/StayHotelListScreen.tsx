import {Box, Text} from '@pyt/micros';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import _cloneDeep from 'lodash/cloneDeep';
import {
  SCREEN_SEARCH_TAB,
  SCREEN_STAY_HOTEL_DETAIL,
  SCREEN_STAY_HOTEL_LIST,
  SCREEN_STAY_SEARCH,
} from '../../NavigatorsV2/ScreenNames';
import Icon from '../../CommonComponents/Icon/Icon';
import {
  CONSTANT_dropDownArrowDarkIcon,
  CONSTANT_filterIcon,
  CONSTANT_searchIcon,
  CONSTANT_starActive,
} from '../../constants/imageAssets';
import _orderBy from 'lodash/orderBy';
import {StayHotelListFilter} from './Components/StayHotelListFilter';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';
import {getPaxConfigText} from '../StayHotelSearchScreen/util/getPaxConfigText';
import {StayHotelSearcRequestType} from '../StayHotelSearchScreen/StayHotelSearchScreen';
import {getSimilarHotel} from './util/getSimilarHotel';
import {HotelDataType} from '../StayHotelDetailScreen/StayHotelDetailScreen';
import {HotelCardWrapper} from './Components/HotelCardWrapper';

import {TopHotelCard} from './Components/TopHotelCard';
type StayHotelListScreenNavType = AppNavigatorProps<
  typeof SCREEN_STAY_HOTEL_LIST
>;
interface StayHotelListScreenProps extends StayHotelListScreenNavType {
  otaHotelStore: {
    isLoading: boolean;
    displayCurrency: string;
    hotelSearchRequest: StayHotelSearcRequestType;
    hotels: SearchHotelResponseDataType;
    getHotelList: () => unknown;
  };
}

interface SearchHotelResponseDataType {
  cityName: string;
  hotelCostingVOList: HotelDataType[];
  searchIdentfier: string;
  alternateHotelFilters: {};
}

const width = Dimensions.get('window').width;

const filterAppliedIndicator = (
  <Box
    width={4}
    height={4}
    position="absolute"
    backgroundColor="#EF435D"
    borderRadius={4}
    top={'35%'}
    right={'30%'}
  />
);

const StayHotelListScreen = inject('otaHotelStore')(
  observer(({otaHotelStore, navigation}: StayHotelListScreenProps) => {
    const {
      getHotelList,
      isLoading,
      hotels,
      hotelSearchRequest,
      displayCurrency,
    } = otaHotelStore ?? {};

    const {hotelGuestRoomConfiguration} =
      hotelSearchRequest.passengerConfiguration ?? {};

    const [allHotelData, setAllHotelData] = useState<HotelDataType[]>([]);
    const [topHotelList, setTopHotelList] = useState<HotelDataType[]>([]);
    const [sort, setSort] = useState(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);

    const setHotelDataList = (hotelList: HotelDataType[]) => {
      const handPickedHotel: HotelDataType[] = [];
      const list = hotelList.filter((item: HotelDataType) => {
        if (item.sourceProvider === 'DATABASE') {
          handPickedHotel.push(item);
          return false;
        }
        return true;
      });
      setAllHotelData([...list]);
      setTopHotelList([...handPickedHotel]);
    };

    useEffect(() => {
      if (hotels?.hotelCostingVOList) {
        applySort([...hotels.hotelCostingVOList]);
      } else {
        setHotelDataList([]);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hotels]);

    useEffect(() => {
      if (openFilter && !isLoading) {
        if (hotels?.hotelCostingVOList) {
          // if (sort) {
          //   applySort([...hotels.hotelCostingVOList]);
          // } else {
          applySort(hotels.hotelCostingVOList);
          // }
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoading]);

    const applySort = (data: HotelDataType[], sortClicked?: boolean) => {
      let currentAllItems = [];

      if (sortClicked) {
        setSort(true);
        currentAllItems = _orderBy(
          [...data, ...topHotelList],
          ['publishedCost'],
          ['desc'],
        );
      } else {
        setSort(false);
        currentAllItems = _orderBy(
          [...data, ...topHotelList],
          ['publishedCost'],
          ['asc'],
        );
      }
      setHotelDataList(currentAllItems);
    };

    const openFilterPanel = () => {
      setOpenFilter(true);
    };
    const closeFilterPanel = () => {
      setOpenFilter(false);
    };

    const onPressBack = () => {
      if (navigation.canGoBack()) {
        navigation.goBack();
      }
    };

    const onPressSearch = () => {
      navigation.navigate(SCREEN_SEARCH_TAB);
    };

    const onPressHeaderText = () => {
      navigation.navigate(SCREEN_STAY_SEARCH);
    };

    const onPress = (
      hotelData: HotelDataType,
      index: number,
      isTopHotelCard?: boolean,
    ) => {
      const newHotel = _cloneDeep(isTopHotelCard ? topHotelList : allHotelData);
      const allSimilarHotel = getSimilarHotel({newHotel, index});
      navigation.navigate(SCREEN_STAY_HOTEL_DETAIL, {
        hotelData,
        searchIdentifier: hotels.searchIdentfier,
        hotelSearchRequest,
        displayCurrency,
        similarHotel: allSimilarHotel,
      });
    };

    const nights = hotels?.hotelCostingVOList?.[0]?.numberOfNights || 0;
    const nightText = `${nights} ${nights > 1 ? 'nights' : 'night'}`;
    const paxText = getPaxConfigText(hotelGuestRoomConfiguration);
    const isHotelDataAvailable = !!hotels.cityName;
    const header = useRef(
      PrimaryHeader({
        leftAction: onPressBack,
        headerElement: (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={isHotelDataAvailable ? onPressHeaderText : () => null}>
            <Text
              fontFamily={CONSTANT_fontPrimaryRegular}
              fontSize={15}
              lineHeight={19}
              textDecorationLine="underline"
              textDecorationStyle="dotted">
              <Text fontFamily={CONSTANT_fontPrimarySemiBold} fontSize={15}>
                {hotels.cityName}
              </Text>
              {isHotelDataAvailable
                ? ` - ${nightText}, ${paxText} - ${hotelGuestRoomConfiguration.length} room`
                : 'No hotels found'}
            </Text>
          </TouchableOpacity>
        ),
        rightElement: (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.search}
            onPress={onPressSearch}>
            <Icon name={CONSTANT_searchIcon} size={18} />
          </TouchableOpacity>
        ),
      }),
    ).current;

    return (
      <Box backgroundColor="#E5E5E5" flex={1}>
        {header}
        <ScrollView style={styles.container}>
          {topHotelList.length ? (
            <Box
              backgroundColor="#121E35"
              paddingTop={32}
              paddingBottom={22}
              height={414}>
              <Text
                color="#ffffff"
                fontSize={17}
                lineHeight={21}
                fontFamily={CONSTANT_fontPrimaryRegular}
                paddingBottom={22}
                paddingStart={12}>
                <Icon name={CONSTANT_starActive} color="#00C684" size={16} />
                {'  '}Handpicked stays for you
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {topHotelList.map((hotel, index) => {
                  return (
                    <TopHotelCard
                      title={hotel.name}
                      displayCurrency={displayCurrency}
                      cost={hotel.publishedCost}
                      numberOfNights={hotel.numberOfNights}
                      key={`${hotel.name}-${index}`}
                      index={index}
                      strikedCost={hotel.strikedCost}
                      onPress={() => onPress(hotel, index, true)}
                      image={hotel.otherImages[0]}
                    />
                  );
                })}
              </ScrollView>
            </Box>
          ) : null}

          <Box paddingHorizontal={16}>
            {topHotelList.length ? (
              <Text
                fontSize={17}
                lineHeight={22}
                fontFamily={CONSTANT_fontPrimaryRegular}
                marginTop={43}>
                Other Hotels
              </Text>
            ) : null}
            {!allHotelData.length
              ? null
              : allHotelData.map((item, cardIndex) => {
                  const onCardPress = () => onPress(item, cardIndex);
                  return (
                    <HotelCardWrapper
                      hotelData={item}
                      cardIndex={cardIndex}
                      onPress={onCardPress}
                      nightText={nightText}
                      paxText={paxText}
                      displayCurrency={displayCurrency}
                      width={width - 32}
                    />
                  );
                })}
          </Box>
        </ScrollView>

        <StayHotelListFilter
          closeFilterPanel={closeFilterPanel}
          isModalVisible={openFilter}
          hotelSearchRequest={hotelSearchRequest}
          alternateHotelFilters={hotels.alternateHotelFilters}
          getHotelList={getHotelList}
          isLoading={isLoading}
        />

        <Box
          height={52}
          backgroundColor="#FFFFFF"
          flexDirection="row"
          justifyContent="center"
          alignItems="center">
          <TouchableOpacity style={styles.flex} onPress={openFilterPanel}>
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              borderRightWidth={1}
              height={51}
              borderColor={'#F7F8FB'}
              position="relative">
              <Icon name={CONSTANT_filterIcon} size={16} color="#777777" />
              <Text
                fontSize={15}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                color="#555555"
                marginStart={8}>
                Filter
              </Text>
              {Object.values(hotelSearchRequest.filters || {}).filter(value =>
                Array.isArray(value) ? !!value.length : value === 0 || !!value,
              ).length > 1
                ? filterAppliedIndicator
                : null}
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flex}
            onPress={() => applySort([...allHotelData], !sort)}>
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              height={51}>
              <Icon
                name={CONSTANT_dropDownArrowDarkIcon}
                size={16}
                color="#777777"
                style={{transform: [{rotate: sort ? '180deg' : '0deg'}]}}
              />
              <Text
                fontSize={15}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                color="#555555"
                marginStart={8}>
                Sort
              </Text>
              {sort ? filterAppliedIndicator : null}
            </Box>
          </TouchableOpacity>
        </Box>
      </Box>
    );
  }),
);

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    right: 20,
  },
  container: {
    paddingBottom: 20,
  },
  flex: {flex: 1},
});

export default StayHotelListScreen;
