import {Box, BoxProps, Button, DotSeparateList, Text} from '@pyt/micros';
import {AnimatedInputBox} from '@pyt/micros/src/animated-input-box';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import {FlatList, ScrollView, SafeAreaView} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {identity} from 'lodash';
import {ChevronRight, Included} from '@pyt/icons';
import {MiniImageSlider} from '@pyt/widgets/dist/esm/mini-image-slider';
import {ReadMoreCard} from '../TripFeedScreen/Components/ReadMoreCard';
import {
  SCREEN_STAY_HOTEL_DETAIL,
  SCREEN_STAY_HOTEL_REVIEW,
  SCREEN_STAY_HOTEL_ROOM_LIST,
} from '../../NavigatorsV2/ScreenNames';
import useCreateItineraryApi from './hook/useCreateItineraryApi';
import StaySection from '../StayHotelListScreen/Components/StaySection';
import Icon from '../../CommonComponents/Icon/Icon';
import {CONSTANT_arrowRight} from '../../constants/imageAssets';
// import {HotelCard} from '../TripFeedScreen/Components/HotelCard';
import useSearchHotelRoomApi from './hook/useSearchHotelRoomApi';
import _findIndex from 'lodash/findIndex';
import moment from 'moment';
import {CONSTANT_costingDateFormat} from '../../constants/styles';
// import { Accordion } from '@pyt/widgets/dist/esm/accordion';
import {Accordion} from '../StayHotelSearchScreen/Accordion';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/fontMap/hotel-amenities.json';
import {getPaxConfigText} from '../StayHotelSearchScreen/util/getPaxConfigText';
import {StayHotelFooter} from '../StayHotelListScreen/Components/StayHotelFooter';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {
  StayHotelRoomConfigurationType,
  StayHotelSearchDataType,
  StayHotelSearcRequestType,
} from '../StayHotelSearchScreen/StayHotelSearchScreen';

export type RoomDataType = {
  roomImages: string[];
  text: string;
  name: string;
  publishedCost: number;
  valueAddsMap: object;
  star: number;
  identifier: string;
  roomConfiguration: StayHotelRoomConfigurationType;
  freeWireless: boolean;
  freeBreakfast: boolean;
  acAvailable: boolean;
  refundable: boolean;
};

export interface HotelDataType {
  amenitiesList: [];
  amenityDisplayList: [];
  checkInDateDisplay: string;
  checkInMonthDisplay: string;
  checkOutMonthDisplay: string;
  checkOutDateDisplay: string;
  hotelAmenities: {};
  otherImages: string[];
  text: string;
  imageURL: string;
  name: string;
  stars: number;
  inPolicy: boolean;
  isRecommended: boolean;
  publishedCost: number;
  identifier: string;
  roomsInHotel: RoomDataType[];
  sourceProvider: string;
  numberOfNights: number;
  description: string;
}

type StayHotelDetailScreenNavType = AppNavigatorProps<
  typeof SCREEN_STAY_HOTEL_DETAIL
>;

export type StayHotelDetailParamType = {
  hotelData: HotelDataType;
  searchIdentifier: string;
  hotelSearchRequest: StayHotelSearcRequestType;
  displayCurrency: string;
};

interface StayHotelDetailScreenProps extends StayHotelDetailScreenNavType {}
// @inject('otaHotel')

const AmenitiesList = ({
  data,
  fontFamily,
  itemProp = {},
}: {
  data: [];
  fontFamily: string;
  itemProp?: BoxProps;
}) => {
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
            alignItems="center"
            key={`${index}-${item.text}`}
            width={'50%'}
            {...itemProp}>
            {item.icon ? item.icon : null}
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

const AmenityIcon = createIconSetFromIcoMoon(icoMoonConfig);

const StayHotelDetailScreen = ({
  route,
  navigation,
}: StayHotelDetailScreenProps) => {
  const {hotelData, searchIdentifier, hotelSearchRequest, displayCurrency} =
    route?.params || {};
  console.log('route', route, hotelData);

  const {
    roomsInHotel,
    checkInDateDisplay,
    checkInMonthDisplay,
    checkOutDateDisplay,
    checkOutMonthDisplay,
  } = hotelData ?? {};
  const {passengerConfiguration, checkInDate} = hotelSearchRequest ?? {};
  const [itineraryDetails, createItinerary] = useCreateItineraryApi();

  const [selectedRoomList, setSelectedRoomList] = useState<RoomDataType[]>([
    ...(roomsInHotel ?? []),
  ]);

  const nextScreen = () => {
    const {identifier, sourceProvider, numberOfNights} = hotelData;

    const requestBody = {
      entity: 'HOTELS',
      searchIdentifier,
      identifier,
      sourceProvider,
      subIdentifiers: selectedRoomList.map(
        (room: {identifier: string}) => room.identifier,
      ),
      costingConfig: {
        departureAirport: '$$$',
        arrivalAirport: '$$$',
        departureDate: checkInDate,
        hotelGuestRoomConfigurations:
          passengerConfiguration?.hotelGuestRoomConfiguration || [],
        nights: numberOfNights,
        nationality: 'IN',
      },
    };
    console.log('data check', requestBody);
    const id = '6097ea43612cae0001cd6d26';
    // createItinerary(requestBody).then((response)=>{
    // console.log('crete itineray', response)
    navigation.navigate(SCREEN_STAY_HOTEL_REVIEW, {
      hotelData,
      itineraryId: '6099344a612cae0001cd7da6',
      hotelSearchRequest,
    });
    // const response = {
    //   data: '6097075b612cae0001cd5dc4',
    // };
    // navigation.navigate(SCREEN_STAY_HOTEL_REVIEW, {
    //   hotelData,
    //   itineraryId: response.data,
    // });
    //  })
  };
  useEffect(() => {
    if (itineraryDetails.isSuccess && !itineraryDetails.isLoading) {
      navigation.navigate(SCREEN_STAY_HOTEL_REVIEW, {
        hotelData,
        itineraryId: itineraryDetails.successResponseData.data,
        hotelSearchRequest,
        displayCurrency,
      });
    }
  }, [itineraryDetails.isLoading]);

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
  const amenityList = hotelData.amenityDisplayList.map(item => ({
    icon: <AmenityIcon name={item.iconUrl} size={14} color="#555555" />,
    text: item.amenityName,
  }));
  const nightText = `${hotelData.numberOfNights} ${
    hotelData.numberOfNights > 1 ? 'nights' : 'night'
  }`;

  const changeRoom = (roomIdentifier, currentRoomIndex) => {
    const req = {
      entity: 'HOTELS',
      searchIdentifier,
      identifier: hotelData.identifier,
      sourceProvider: hotelData.sourceProvider,
      subIdentifiers: [roomIdentifier],
    };

    navigation.navigate(SCREEN_STAY_HOTEL_ROOM_LIST, {
      title: `Room #${currentRoomIndex + 1}`,
      req,
      currentSelectedRoom: selectedRoomList[currentRoomIndex],
      onSelect: room => {
        selectedRoomList[currentRoomIndex] = room;
        setSelectedRoomList([...selectedRoomList]);
      },
      navigation,
      nightText,
    });
  };

  const goToRoomList = () => {
    // const { roomsData, currentRoomCostingVO={} } = hotelRoomDetails?.successResponseData?.data ?? {}
    // console.log('checking suces',currentRoomCostingVO.identifier)
    // const roomIndex = _findIndex(
    //   hotelData.roomsInHotel,
    //   ({ identifier: dataIdentifier }) =>
    //     dataIdentifier === currentRoomCostingVO.identifier,
    // )
    // navigation.navigate(SCREEN_STAY_HOTEL_ROOM_LIST, {
    //   title:`Room #${roomIndex+1}`,
    //   onChangeRoom: (room) => {
    //     selectedRoomList[roomIndex] = room
    //     setSelectedRoomList([...selectedRoomList])
    //   },
    //   roomsData: roomsData|| {}
    // })
    // }
  };
  const totalCost = selectedRoomList.reduce((cost, room) => {
    return (cost += room.publishedCost);
  }, 0);
  const costSymbol = getSymbolFromCurrency(displayCurrency);
  return (
    <SafeAreaView style={{flex: 1}}>
      <Box backgroundColor="#E5E5E5" flex={1}>
        <ScrollView>
          <MiniImageSlider
            height={326}
            width={'100%'}
            images={hotelData.otherImages}
          />

          <StaySection
            title={hotelData.name}
            textContainer={{marginBottom: 12}}>
            <DotSeparateList list={dotSeparateList} marginBottom={12} />
          </StaySection>
          <StaySection title={'Amenities'} textContainer={{marginBottom: 0}}>
            {amenityList.length ? (
              <ReadMoreCard
                data={amenityList}
                defaultVisibleItemCount={4}
                fontFamily={CONSTANT_fontPrimaryRegular}
                showViewLess={false}
                RenderItem={
                  <AmenitiesList
                    data={[]}
                    fontFamily={CONSTANT_fontPrimaryRegular}
                    itemProp={{
                      width: '45%',
                      marginEnd: 16,
                    }}
                  />
                }
              />
            ) : null}
          </StaySection>
          <StaySection title={'About hotel'}>
            <ReadMoreCard
              data={hotelData.description}
              defaultVisibleItemCount={4}
              fontFamily={CONSTANT_fontPrimaryRegular}
              showViewLess={false}
              RenderItem={
                <Text
                  fontSize={14}
                  lineHeight={18}
                  color="#333333"
                  marginTop={12}
                  numberOfLines={4}
                  fontFamily={CONSTANT_fontPrimaryRegular}>
                  {hotelData.description}
                </Text>
              }
            />
          </StaySection>
          <Box marginHorizontal={16}>
            {selectedRoomList.map((roomData, index) => {
              const cost = getGlobalPriceWithoutSymbol({
                amount: parseInt(
                  (roomData.publishedCost as unknown) as string,
                  10,
                ),
                currency: displayCurrency,
              });
              return (
                <>
                  <Text
                    fontFamily={CONSTANT_fontPrimarySemiBold}
                    color="#555555"
                    fontSize={17}
                    lineHeight={21}
                    marginVertical={16}>
                    Selected room{' '}
                    {selectedRoomList.length > 1 ? `#${index + 1}` : ''}
                  </Text>
                  <HotelCard
                    // width={'100%'}
                    title={roomData.name}
                    fontFamily={CONSTANT_fontPrimaryRegular}
                    cost={`${costSymbol}${cost}`}
                    costSubText={`${nightText} & ${getPaxConfigText(
                      [roomData.roomConfiguration],
                      false,
                    )}`}
                    marginBottom={20}
                    backgroundColor="#ffffff"
                    amenities={[
                      {
                        text: 'Free WiFi',
                        available: roomData.freeWireless,
                      },
                      {
                        text: 'Breakfast included',
                        available: roomData.freeBreakfast,
                      },
                      {
                        text: 'Ac available',
                        available: roomData.acAvailable,
                      },
                      {
                        text: 'Free cancellation',
                        available: roomData.refundable,
                      },
                    ].map(amenity => ({
                      icon: (
                        <Included
                          fill={amenity.available ? '#EF435D' : '#555555'}
                        />
                      ),
                      text: amenity.text,
                    }))}
                    // fontFamily={CONSTANT_fontPrimaryLight}
                    sliderProps={{
                      images: roomData.roomImages,
                    }}
                    dotSeparateList={[]}
                    footerRightElement={<></>}
                  />
                  <Button
                    backgroundColor={'#E5F9F3'}
                    paddingHorizontal={16}
                    borderRadius={8}
                    onPress={() =>
                      changeRoom(
                        hotelData?.roomsInHotel[index]?.identifier,
                        index,
                      )
                    }
                    marginBottom={20}
                    iconPosition="right"
                    alignItems="center"
                    icon={
                      <Icon
                        name={CONSTANT_arrowRight}
                        color={'#00774F'}
                        size={14}
                      />
                    }
                    text="Change room"
                    justifyContent="flex-start"
                    textProps={{
                      color: '#00774F',
                      fontFamily: CONSTANT_fontPrimarySemiBold,
                    }}
                  />
                </>
              );
            })}
            <StaySection>
              <Accordion
                title="Terms & conditions"
                titleProps={{
                  fontSize: 15,
                  color: '#000000',
                }}
                // icon={<Recepit />}
                fontFamily={CONSTANT_fontPrimaryRegular}>
                <Text paddingVertical={12}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </Text>
              </Accordion>
              <Box height={1} backgroundColor="#F0F0F0" marginVertical={20} />
              <Accordion
                title="Cancellation policy"
                titleProps={{
                  fontSize: 15,
                  color: '#000000',
                }}
                // icon={<Recepit />}
                fontFamily={CONSTANT_fontPrimaryRegular}>
                <Text paddingVertical={12}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem
                  ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum
                  dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor
                  sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit.
                </Text>
              </Accordion>
            </StaySection>
          </Box>
        </ScrollView>
        <StayHotelFooter
          buttonText="Proceed to book"
          leftButtonText={`${checkInDateDisplay} ${checkInMonthDisplay} - ${checkOutDateDisplay} ${checkOutMonthDisplay}`}
          leftButtonSubText={getPaxConfigText(
            passengerConfiguration.hotelGuestRoomConfiguration,
            false,
          )}
          rightButtonAction={nextScreen}
          buttonProps={{width: 124}}
          costText="Updated Price"
          cost={`${costSymbol} ${getGlobalPriceWithoutSymbol({
            amount: parseInt((totalCost as unknown) as string, 10),
            currency: displayCurrency,
          })}`}
        />
      </Box>
    </SafeAreaView>
  );
};

export default StayHotelDetailScreen;
