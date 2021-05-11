import {AnimatedInputBox, Box, Button, Text} from '@pyt/micros';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
  CONSTANT_fontPrimaryLight,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {identity} from 'lodash';
import {Included, Bed} from '@pyt/icons';
import {
  SCREEN_SEARCH_TAB,
  SCREEN_STAY_HOTEL_DETAIL,
  SCREEN_STAY_HOTEL_LIST,
} from '../../NavigatorsV2/ScreenNames';
import Icon from '../../CommonComponents/Icon/Icon';
import {
  CONSTANT_dropDownArrowDarkIcon,
  CONSTANT_filterIcon,
  CONSTANT_searchIcon,
} from '../../constants/imageAssets';
import _orderBy from 'lodash/orderBy';
import {StayHotelListFilter} from './Components/StayHotelListFilter';
import Modal from 'react-native-modal';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import OTAHotel from '../../mobx/OTAHotel';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';
import {getPaxConfigText} from '../StayHotelSearchScreen/util/getPaxConfigText';
import {StayHotelRoomConfigurationType} from '../StayHotelSearchScreen/StayHotelSearchScreen';


type StayHotelListScreenNavType = AppNavigatorProps<
  typeof SCREEN_STAY_HOTEL_LIST
>;
interface StayHotelListScreenProps extends StayHotelListScreenNavType {
  otaHotelStore: OTAHotel;
}

const width = Dimensions.get('window').width;
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
    const onPress = hotelData => {
      // console.log('press',{...hotelData,searchIdentifier: hotelList.searchIdentfier, hotelSearchRequest});
      navigation.navigate(SCREEN_STAY_HOTEL_DETAIL, {
        hotelData,
        searchIdentifier: hotels.searchIdentfier,
        hotelSearchRequest,
        displayCurrency,
      });
    };

    const [allHotelData, setAllHotelData] = useState([]);
    const [sort, setSort] = useState(false);
    const [openFilter, setOpenFilter] = useState<boolean>(false);

    useEffect(() => {
      if (hotels?.hotelCostingVOList) {
        setAllHotelData([...hotels.hotelCostingVOList]);
      }
    }, []);

    useEffect(() => {
      if (openFilter && !isLoading) {
        if (hotels?.hotelCostingVOList) {
          console.log('checking-->', hotels.hotelCostingVOList);
          if (sort) {
            applySort([...hotels.hotelCostingVOList]);
          } else {
            setAllHotelData([...hotels.hotelCostingVOList]);
          }
        }
        // setOpenFilter(false);
      }
    }, [isLoading]);

    const applySort = data => {
      let currentAllItems = [...allHotelData];
      if (sort) {
        setSort(false);
        currentAllItems = _orderBy(allHotelData, ['publishedCost'], ['asc']);
      } else {
        setSort(true);
        currentAllItems = _orderBy(allHotelData, ['publishedCost'], ['desc']);
      }
      setAllHotelData(currentAllItems);
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
    const nights = hotels?.hotelCostingVOList[0]?.numberOfNights || 0;
    const nightText = `${nights} ${nights > 1 ? 'nights' : 'night'}`;
    const paxText = getPaxConfigText(hotelGuestRoomConfiguration);
    const header = useRef(
      PrimaryHeader({
        leftAction: onPressBack,
        headerText: `${hotels.cityName} - ${nightText}, ${paxText} - ${hotelGuestRoomConfiguration.length} room`,
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
          {!allHotelData.length
            ? null
            : allHotelData.map((item, cardIndex) => {
                const {
                  imageURL,
                  otherImages = [],
                  name,
                  publishedCost,
                  strikedCost,
                  distanceFromCityCenter,
                  stars,
                  amenitiesList,
                  breakFastAvailable,
                  refundable,
                  amenities,
                } = item;
                const image = imageURL || otherImages?.[0];

                const cost = getGlobalPriceWithoutSymbol({
                  amount: parseInt((publishedCost as unknown) as string, 10),
                  currency: displayCurrency,
                });
                const costSymbol = getSymbolFromCurrency(displayCurrency);

                const dotSeparateList = [
                  `${parseInt(
                    distanceFromCityCenter || 0,
                    10,
                  )} from city center`,
                  `${Math.round(stars)} star hotel`,
                ].map((list, index) => (
                  <Text
                    fontFamily={CONSTANT_fontPrimaryRegular}
                    fontSize={13}
                    color={'#333333'}
                    key={index}>
                    {list}
                  </Text>
                ));

                return (
                  <HotelCard
                    width={width - 32}
                    title={name}
                    key={`${name}-${cardIndex}`}
                    strikedCost={
                      strikedCost ? `${costSymbol}${strikedCost}` : ''
                    }
                    cost={`${costSymbol}${cost}`}
                    costSubText={`${nightText} & ${paxText}`}
                    marginTop={20}
                    backgroundColor="#ffffff"
                    amenities={[
                      {
                        text: 'Free WiFi',
                        available: amenitiesList?.includes('Free WiFi'),
                      },
                      {
                        text: 'Breakfast included',
                        available: breakFastAvailable,
                      },
                      {text: 'Free cancellation', available: refundable},
                      {
                        text: 'Air condition',
                        available: amenities?.some(
                          ({name}) => name.toUpperCase() === 'AIR CONDITIONING',
                        ),
                      },
                    ].reduce((amenities, amenity) => {
                      if (amenity.available) {
                        amenities.push({
                          text: amenity.text,
                          icon: <Included fill="#AAAAAA" />,
                        });
                      }
                      return amenities;
                    }, [])}
                    // fontFamily={CONSTANT_fontPrimaryLight}
                    sliderProps={{
                      images: image ? [image] : [],
                      showArrow: true,
                    }}
                    dotSeparateList={dotSeparateList}
                    footerRightElement={<></>}
                    onPress={() => onPress(item)}
                  />
                );
              })}
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
          <TouchableOpacity style={{flex: 1}} onPress={openFilterPanel}>
            <Box
              flex={1}
              justifyContent="center"
              alignItems="center"
              flexDirection="row"
              borderRightWidth={1}
              height={51}
              borderColor={'#F7F8FB'}>
              <Icon name={CONSTANT_filterIcon} size={16} color="#777777" />
              <Text
                fontSize={15}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                color="#555555"
                marginStart={8}>
                Filter
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => applySort([...allHotelData])}>
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
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
});

export default StayHotelListScreen;
