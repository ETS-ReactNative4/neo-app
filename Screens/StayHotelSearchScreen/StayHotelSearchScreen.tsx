import {Box, Button, Text} from '@pyt/micros';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {
  SCREEN_GCM_ROOM_CONFIG,
  SCREEN_SEARCH_TAB,
  SCREEN_STAY_HOTEL_LIST,
  SCREEN_STAY_SEARCH,
} from '../../NavigatorsV2/ScreenNames';
import {SearchSelect} from '@pyt/widgets/dist/esm/search-select';
import {DateInputBox} from './Components/DateInputBox';
import useCityListApi, {OptionType} from './hook/useCityListApi';
import moment from 'moment';
import {
  CONSTANT_GCMDateFormat,
  CONSTANT_voucherDateFormat,
} from '../../constants/styles';
import {getPaxConfigText} from './util/getPaxConfigText';
import {ClickableInputBox} from './Components/ClickableInputBox';
import User from '../../mobx/User';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamsType} from '../../NavigatorsV2/AppNavigator';
import OTAHotel from '../../mobx/OTAHotel';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';
import {CONSTANT_searchIcon} from '../../constants/imageAssets';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from '../../CommonComponents/Icon/Icon';
import {PreTripHomeTabsType} from '../../NavigatorsV2/PreTripHomeTabs';
import {CompositeNavigationProp} from '@react-navigation/core';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import useDeepCompareEffect from 'use-deep-compare-effect';

const nextWeekDate = moment(new Date()).add(1, 'week');
const dateFormat = CONSTANT_voucherDateFormat;

type StayHotelSearchScreenType = CompositeNavigationProp<
  StackNavigationProp<AppNavigatorParamsType, typeof SCREEN_STAY_SEARCH>,
  BottomTabNavigationProp<PreTripHomeTabsType, typeof SCREEN_STAY_SEARCH>
>;

export interface StayHotelRoomConfigurationType {
  adultCount: number;
  childAges: number[];
}
export interface StayHotelSearchDataType {
  checkInDate: string;
  checkOutDate: string;
  hotelGuestRoomConfiguration: StayHotelRoomConfigurationType[];
  filters: {};
  city: OptionType;
}

type HotelGuestRoomConfigurationType = {
  hotelGuestRoomConfiguration: StayHotelRoomConfigurationType[];
};
export interface StayHotelSearcRequestType {
  checkInDate: string;
  checkOutDate: string;
  passengerConfiguration: HotelGuestRoomConfigurationType;
  filters: {};
  city: OptionType;
}

// export interface StayHotelSearchParamType {
//   checkInDate?: string
//   checkOutDate?: string
//   hotelGuestRoomConfiguration?: StayHotelRoomConfigurationType[]
//   filters?: {},
//   cityId?: number,
// }
interface StayHotelSearchScreenProps {
  userStore: User;
  navigation: StayHotelSearchScreenType;
  otaHotelStore: OTAHotel;
}

const StayHotelSearchScreen = inject('userStore')(
  inject('otaHotelStore')(
    observer(({otaHotelStore, navigation}: StayHotelSearchScreenProps) => {
      // const { checkInDate: defaultCheckInDate, checkoutDate: defaultCheckOutDate, cityId: defaultCityId } = route.params ?? {}
      const [cityApiDetails, getCityList] = useCityListApi();
      const {successResponseData} = cityApiDetails;

      const [searchData, setSearchData] = useState<StayHotelSearchDataType>({
        checkInDate: nextWeekDate.format(dateFormat),
        checkOutDate: nextWeekDate.add(1, 'days').format(dateFormat),
        hotelGuestRoomConfiguration: [{adultCount: 2, childAges: []}],
        filters: {},
        city: {label: '', value: ''},
      });
      const [searchClicked, setSearchClicked] = useState(false);

      useEffect(() => {
        getCityList();
      }, []);

      // useEffect(()=>{
      //   if(successResponseData?.options && defaultCityId){
      //     successResponseData.options.some(city => {
      //       if(city.value === defaultCityId){
      //         searchData.city = city;
      //             setSearchData({
      //               ...searchData,
      //             });
      //         return true
      //       }
      //     })
      //   }
      // },[successResponseData?.options || []])

      const {getHotelList, isLoading, hotels, hotelSearchRequest} =
        otaHotelStore ?? {};

      const onSearch = () => {
        const requestBody = {
          checkInDate: searchData.checkInDate,
          checkOutDate: searchData.checkOutDate,
          passengerConfiguration: {
            hotelGuestRoomConfiguration: searchData.hotelGuestRoomConfiguration,
          },
          filters: {},
          cityId: searchData.city?.value,
        };

        getHotelList(requestBody);
      };

      useEffect(() => {
        if (isLoading) {
          setSearchClicked(true);
        }
        if (searchClicked && !isLoading) {
          setSearchClicked(false);
          navigation.navigate(SCREEN_STAY_HOTEL_LIST);
        }
      }, [isLoading, hotels, hotelSearchRequest, searchClicked, navigation]);

      const setCheckInDate = (date: string) => {
        if (moment(searchData.checkOutDate).diff(date, 'days') < 0) {
          searchData.checkOutDate = date;
          searchData.checkInDate = date;
        } else {
          searchData.checkInDate = date;
        }
        setSearchData({
          ...searchData,
        });
      };

      const openGcm = () => {
        navigation.navigate(SCREEN_GCM_ROOM_CONFIG, {
          maxRoom: 6,
          roomConfig: searchData.hotelGuestRoomConfiguration,
          childAgeOptions: Array.from([...Array(18)], (_, index) => ({
            text: `${index} ${index > 1 ? 'years' : 'year'}`,
            value: index,
          })),
          onSelect: selectedConfig => {
            searchData.hotelGuestRoomConfiguration = [...selectedConfig];
            setSearchData({
              ...searchData,
            });
          },
        });
      };

      const onPressBack = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
        }
      };

      const onPressSearch = () => {
        navigation.navigate(SCREEN_SEARCH_TAB);
      };

      const header = useRef(
        PrimaryHeader({
          leftAction: onPressBack,
          headerText: 'Hotels',
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

      const disableSearch = !searchData.city.label;
      return (
        <>
          {header}
          <Box
            borderRadius={12}
            backgroundColor={'#FFFFFF'}
            margin={16}
            padding={16}>
            <Box borderBottomWidth={1} borderColor="#F7F7F7" paddingBottom={16}>
              <Text
                fontFamily={CONSTANT_fontPrimarySemiBold}
                fontSize={18}
                lineHeight={22}
                fontWeight={'600'}
                color={'#777777'}>
                Destination city
              </Text>
              <SearchSelect
                label="Search City"
                fontFamily={CONSTANT_fontPrimaryRegular}
                options={successResponseData?.options || []}
                onSelect={data => {
                  searchData.city = data;
                  setSearchData({
                    ...searchData,
                  });
                }}
                RenderView={
                  <Text
                    fontFamily={CONSTANT_fontPrimarySemiBold}
                    fontSize={24}
                    lineHeight={30}
                    fontWeight={'600'}
                    color={searchData.city.label ? '#333333' : '#D4D4D4'}
                    marginTop={8}>
                    {searchData.city.label || 'City'}
                  </Text>
                }
                isLoading={cityApiDetails.isLoading}
              />
            </Box>
            <Box
              flexDirection="row"
              justifyContent="space-between"
              marginTop={16}>
              <DateInputBox
                label="Check-in"
                date={searchData.checkInDate}
                dateFormat={dateFormat}
                displayFormat={CONSTANT_GCMDateFormat}
                containerProps={{
                  flex: 1,
                  marginEnd: 8,
                }}
                onDateSelect={date => setCheckInDate(date)}
                minDate={new Date()}
              />
              <DateInputBox
                label="Check-out"
                date={searchData.checkOutDate}
                dateFormat={dateFormat}
                displayFormat={CONSTANT_GCMDateFormat}
                onDateSelect={date => {
                  searchData.checkOutDate = date;
                  setSearchData({
                    ...searchData,
                  });
                }}
                containerProps={{
                  flex: 1,
                  marginStart: 8,
                }}
                minDate={new Date(searchData.checkInDate)}
              />
            </Box>

            <ClickableInputBox
              label="No. of persons"
              value={getPaxConfigText(
                searchData?.hotelGuestRoomConfiguration || [],
                true,
              )}
              containerProps={{
                marginTop: 16,
              }}
              fontFamily={CONSTANT_fontPrimaryRegular}
              onPress={openGcm}
            />

            <Button
              text={isLoading ? 'Searching...' : 'Search'}
              textProps={{
                color: 'white',
                fontSize: 15,
                fontFamily: CONSTANT_fontPrimaryRegular,
              }}
              backgroundColor="#00C684"
              height={48}
              marginTop={20}
              onPress={disableSearch ? () => null : onSearch}
              opacity={isLoading || disableSearch ? 0.6 : 1}
            />
          </Box>
        </>
      );
    }),
  ),
);

const styles = StyleSheet.create({
  search: {
    position: 'absolute',
    right: 20,
  },
});
export default StayHotelSearchScreen;
