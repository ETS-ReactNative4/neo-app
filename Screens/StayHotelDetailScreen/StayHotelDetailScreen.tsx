import {Box, Button, DotSeparateList, Text} from '@pyt/micros';
import {AnimatedInputBox} from '@pyt/micros/src/animated-input-box';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React, { useEffect, useState } from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import {FlatList, ScrollView} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {identity} from 'lodash';
import {Included} from '@pyt/icons';
import {MiniImageSlider} from '@pyt/widgets/dist/esm/mini-image-slider';
import {ReadMoreCard} from '../TripFeedScreen/Components/ReadMoreCard';
import {SCREEN_STAY_HOTEL_REVIEW} from '../../NavigatorsV2/ScreenNames';
import useCreateItineraryApi from './hook/useCreateItineraryApi';
import StaySection from '../StayHotelListScreen/Components/StaySection';

// import StaySection from '../../CommonComponents/StaySection/StaySection';
interface StayHotelDetailScreenProps {}
// @inject('otaHotel')



const AmenitiesList = ({data, fontFamily}: {data: []; fontFamily: string}) => {
  console.log('arrived', data);
  return (
    <Box flexDirection="row" flexWrap="wrap" marginTop={12} marginBottom={4}>
      {data.map(
        (
          item: {
            icon: React.ReactElement | null;
            text: string;
          },
          index: number,
        ) => (
          <Box
            flexDirection="row"
            marginBottom={8}
            marginEnd={12}
            alignItems="center"
            key={`${index}-${item.text}`}>
            {/* {item.icon ? item.icon: null} */}
            <Text
              fontFamily={fontFamily}
              fontSize={14}
              lineHeight={18}
              color="#333333"
              marginStart={item.icon ? 8 : 0}>
              {item.text}
            </Text>
          </Box>
        ),
      )}
    </Box>
  );
};

const StayHotelDetailScreen = ({data = {}, route, navigation}) => {
  const hotelData = route?.params || {};
  console.log('route', route, hotelData.name);

  const [itineraryDetails, createItinerary] = useCreateItineraryApi();
  const [selectedRoomList, setSelectedRoomList] = useState([])
  
  useEffect(()=>{
    setSelectedRoomList([
      ...(hotelData?.roomsInHotel ?? [])
    ])
  },[])

  const nextScreen = () => {
    const { identifier, sourceProvider, searchIdentifier } = hotelData
    const requestBody = {
      entity: "HOTELS",
      searchIdentifier,
      identifier,
      sourceProvider,
      subIdentifiers: selectedRoomList.map(
        (room: { identifier: string }) => room.identifier,
      ),
      costingConfig: {
          departureAirport: "$$$",
          arrivalAirport: "$$$",
          departureDate: "27/May/2021",
          hotelGuestRoomConfigurations: [
              {
                  "adultCount": 2,
                  "childAges": []
              }
          ],
          nights: "3",
          nationality: "IN"
      }
  }
  console.log('data check',requestBody)
    // createItinerary(requestBody).then((response)=>{
      const response = {
        data: '6097075b612cae0001cd5dc4'
      }
      navigation.navigate(SCREEN_STAY_HOTEL_REVIEW, {hotelData,itineraryId: response.data})
    // })
  }

  const displayCurrency = 'INR';
  const dotSeparateList = [
    `${hotelData.stars} star hotel`,
    hotelData.cityName,
  ].map((list, index) => (
    <Text
      fontFamily={CONSTANT_fontPrimaryRegular}
      fontSize={14}
      color={'#333333'}
      key={index}>
      {list}
    </Text>
  ));
  const list = hotelData.hotelAmenities.map(item => ({
    icon: <Included fill="red" />,
    text: item.amenity,
  }));

  const l = [...hotelData.hotelAmenities].map(it => ({text: it.amenity}));
  console.log('itineraryDetails', itineraryDetails);

  const onProceedToBook = () =>{
   
  }
  return (
    <Box backgroundColor="#E5E5E5" flex={1} >
      <ScrollView>
        <MiniImageSlider
          height={326}
          width={'100%'}
          // autoplay
          images={hotelData.otherImages}
        />
        {/* <Box> */}
        <StaySection title={hotelData.name}>
          <DotSeparateList list={dotSeparateList} marginVertical={12} />
          {/* <Box height={1} backgroundColor='#F0F0F0'/> */}
        </StaySection>
        <StaySection title={'Amenities'}>
          {list.length ? (
            <ReadMoreCard
              data={list}
              defaultVisibleItemCount={4}
              fontFamily={CONSTANT_fontPrimaryRegular}
              showViewLess={false}
              RenderItem={
                <AmenitiesList
                  data={[]}
                  fontFamily={CONSTANT_fontPrimaryRegular}
                />
              }
            />
          ) : null}
        </StaySection>
        <StaySection title={'About hotel'}>
          <Text
            fontSize={14}
            lineHeight={18}
            color="#333333"
            marginTop={12}
            numberOfLines={4}>
            {hotelData.description}
          </Text>
        </StaySection>
        <Box  marginHorizontal={16}>
        {selectedRoomList.map((roomData, index) => {
           const cost = getGlobalPriceWithoutSymbol({
            amount: parseInt((roomData.publishedCost as unknown) as string, 10),
            currency: displayCurrency,
          });
          const costSymbol = getSymbolFromCurrency(displayCurrency);
          return (
            <HotelCard
              // width={'100%'}
              title={roomData.name}
              fontFamily={CONSTANT_fontPrimaryRegular}
              cost={`${costSymbol}${cost}`}
              costSubText="2 nights & 2 adults"
              marginBottom={20}
              backgroundColor="#ffffff"
              amenities={[]
              //   [
              //   {
              //     text: 'Free WiFi',
              //     available: Object.values(roomData.valueAddsMap)?.includes(
              //       'Free WiFi',
              //     ),
              //   },
              //   {
              //     text: 'Breakfast included',
              //     available: roomData.freeBreakfast,
              //   },
              //   {text: 'Free cancellation', available: roomData.refundable},
              // ].reduce((amenities, amenity) => {
              //   if (amenity.available) {
              //     amenities.push({
              //       text: amenity.text,
              //       icon: <Included fill="red" />,
              //     });
              //   }
              //   return amenities;
              // }, [])
            }
              // fontFamily={CONSTANT_fontPrimaryLight}
              sliderProps={{
                images: roomData.roomImages,
              }}
              dotSeparateList={[]}
              // footerRightElement={<></>}
            />
          );
        })}
        </Box>
      {/* </Box> */}
      </ScrollView>
      <Box
        height={72}
        paddingHorizontal={20}
        backgroundColor="#ffffff"
        justifyContent="center">
        <Button
          backgroundColor={'#00C684'}
          paddingHorizontal={16}
          borderRadius={8}
          onPress={nextScreen}
          text="Proceed to book"
          textProps={{
            color: '#ffffff',
            fontFamily: CONSTANT_fontPrimarySemiBold,
          }}
          alignSelf="flex-end"
        />
      </Box>
    </Box>
  );
};

export default StayHotelDetailScreen;
