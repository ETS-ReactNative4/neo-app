import {Box, Button, Text} from '@pyt/micros';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {SCREEN_STAY_HOTEL_LIST} from '../../NavigatorsV2/ScreenNames';
import {AnimatedInputBox} from './animated-input-box';
import {SearchSelect} from './search-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {DateInputBox} from './Components/DateInputBox';
import useCityListApi from './hook/useCityListApi';
import moment from 'moment';
import {CONSTANT_costingDateFormat} from '../../constants/styles';
import apiCall from '../../Services/networkRequests/apiCall';
import GuestNumberCounter from '../GCMRoomConfig/Components/GuestNumberCounter';
import { PaxSelectionModal } from './Components/PaxSelectionModal';

interface StayHotelSearchScreenProps {}
// @inject('otaHotel')
const StayHotelSearchScreen = inject('userStore')(
  inject('otaHotelStore')(
    observer(({otaHotelStore, userStore, navigation}) => {
      const {getHotelList,setHotelSearchData, isLoading, hasError, hotelList} = otaHotelStore ?? {};
      const {userDisplayDetails} = userStore;
      console.log('getHotelList', hotelList, userDisplayDetails, isLoading);
      const [searchData, setSearchData] = useState({
        checkInDate: moment(new Date()).format(CONSTANT_costingDateFormat),
        checkOutDate: moment(new Date()).format(CONSTANT_costingDateFormat),
        passengerConfiguration: {
          hotelGuestRoomConfiguration: [{adultCount: 2, childAges: []}],
        },
        filters: {},
        cityId: 7,
      });

      const callHotelList = () => {
        searchData.cityId = searchData.city?.value
        // searchData.filters = {
        //   "amenities":[1]
        // }
        delete searchData.city
        
        getHotelList(searchData);
        // navigation.navigate(SCREEN_STAY_HOTEL_LIST);
      };

      //user/rewards/${userId}?includeReferral=false
      const [cityApiDetails, getCityList] = useCityListApi();
      const {successResponseData} = cityApiDetails;
      useEffect(() => {
        getCityList();
        //       apiCall('user/rewards/6049c905612cae00017ea815?includeReferral=false',{},'GET')
        //       fetch('https://rewards.wwmib.com/api/user/rewards/6049c905612cae00017ea815?includeReferral=false').then((response)=>{

        // return response.json()
        //       }).then((data)=>{
        //         console.log('fetch',data)
        //       }).catch(()=>{
        //         console.log('error')
        //       })
      }, []);

      useEffect(() => {
        if( isLoading && !hasError){
          navigation.navigate(SCREEN_STAY_HOTEL_LIST);
        }
      }, [isLoading, hasError]);
      console.log(
        'cityApiDetails-->',
        searchData,
        isLoading,
        successResponseData,
      );
      return (
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
              options={successResponseData?.options || []}
              onSelect={(data)=>{
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
                  color={ searchData.city ? '#333333' : '#D4D4D4'}
                  marginTop={8}>
                  {searchData.city?.label || 'City'}
                </Text>
              }
            />
          </Box>
          {/* <DateTimePickerModal
          isVisible={true}
          mode="date"
          // onConfirm={handleConfirm}
          // onCancel={hideDatePicker}
          // date={formFields.departingOn}
          // minimumDate={tomorrow}
        /> */}
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginTop={16}>
            <DateInputBox
              label="Check-in"
              date={searchData.checkInDate}
              containerProps={{
                flex: 1,
                marginEnd: 8,
              }}
              onDateSelect={date => {
                searchData.checkInDate = date;
                setSearchData({
                  ...searchData,
                });
              }}
              minDate={new Date()}
            />
            <DateInputBox
              label="Check-out"
              date={searchData.checkOutDate}
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
              minDate={new Date()}
            />
          </Box>
          
          <AnimatedInputBox
            label="No. of persons"
            value={'4 adults - 2 rooms'}
            containerProps={{
              marginTop: 16,
            }}
          />
          {/* <SearchSelect fontFamily={CONSTANT_fontPrimaryRegular} /> */}
          <Button
            text={isLoading ? 'Searching' : 'Search'}
            textProps={{
              color: 'white',
              fontSize: 15,
              fontFamily: CONSTANT_fontPrimaryRegular,
            }}
            backgroundColor="#00C684"
            height={48}
            marginTop={20}
            onPress={callHotelList}
            opacity={isLoading ? 0.6 : 1}
          />
        </Box>
      );
    }),
  ),
);

export default StayHotelSearchScreen;
