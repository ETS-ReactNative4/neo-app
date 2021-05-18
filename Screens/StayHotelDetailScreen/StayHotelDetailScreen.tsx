import {AmenitiesList, Box, Button, DotSeparateList, Text} from '@pyt/micros';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import React, {useEffect, useState} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import {ScrollView, SafeAreaView, StyleSheet, Dimensions} from 'react-native';
import {
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {Included} from '@pyt/icons';
import {MiniImageSlider} from '@pyt/widgets/dist/esm/mini-image-slider';
import {ReadMoreCard} from '@pyt/widgets/dist/esm/read-more-card';
import {
  SCREEN_STAY_HOTEL_DETAIL,
  SCREEN_STAY_HOTEL_REVIEW,
  SCREEN_STAY_HOTEL_ROOM_LIST,
  SCREEN_STAY_SEARCH,
} from '../../NavigatorsV2/ScreenNames';
import useCreateItineraryApi from './hook/useCreateItineraryApi';
import StaySection from '../StayHotelListScreen/Components/StaySection';
import Icon from '../../CommonComponents/Icon/Icon';
import {
  CONSTANT_arrowRight,
  CONSTANT_closeIcon,
} from '../../constants/imageAssets';
import moment from 'moment';
import {CONSTANT_costingDateFormat} from '../../constants/styles';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '../../assets/fontMap/hotel-amenities.json';
import {getPaxConfigText} from '../StayHotelSearchScreen/util/getPaxConfigText';
import {StayHotelFooter} from '../StayHotelListScreen/Components/StayHotelFooter';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {
  StayHotelRoomConfigurationType,
  StayHotelSearcRequestType,
} from '../StayHotelSearchScreen/StayHotelSearchScreen';
import {AboutHotel} from './Components/AboutHotel';
import {HotelCardWrapper} from '../StayHotelListScreen/Components/HotelCardWrapper';
import {AssuranceCard} from '@pyt/widgets/dist/esm/assurance-card';
import useDeepCompareEffect from 'use-deep-compare-effect';
import storeService from '../../Services/storeService/storeService';
import useHotelDealAPi from './hook/useHotelDealApi';
import {HotelDelaCard} from './Components/HotelDealCard';
import extractTextFromHtml from '../../Services/extractTextFromHtml/extractTextFromHtml';

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
  strikedCost: number;
  identifier: string;
  roomsInHotel: RoomDataType[];
  sourceProvider: string;
  numberOfNights: number;
  description: string;
  cityName: string;
  planningToolId: number;
  distanceFromCityCenter: number;
  breakFastAvailable: boolean;
  refundable: boolean;
  amenities: [];
  tripAdvisorRating: number;
}

type StayHotelDetailScreenNavType = AppNavigatorProps<
  typeof SCREEN_STAY_HOTEL_DETAIL
>;

export type StayHotelDetailParamType = {
  hotelData: HotelDataType;
  searchIdentifier: string;
  hotelSearchRequest: StayHotelSearcRequestType;
  displayCurrency: string;
  similarHotel: HotelDataType[];
};

interface StayHotelDetailScreenProps extends StayHotelDetailScreenNavType {}

const AmenityIcon = createIconSetFromIcoMoon(icoMoonConfig);

const width = Dimensions.get('window').width;

const StayHotelDetailScreen = ({
  route,
  navigation,
}: StayHotelDetailScreenProps) => {
  const {
    hotelData,
    searchIdentifier,
    hotelSearchRequest,
    displayCurrency,
    similarHotel,
  } = route?.params || {};

  const {
    roomsInHotel,
    checkInDateDisplay,
    checkInMonthDisplay,
    checkOutDateDisplay,
    checkOutMonthDisplay,
    planningToolId,
  } = hotelData ?? {};

  const {passengerConfiguration, checkInDate} = hotelSearchRequest ?? {};
  const [itineraryDetails, createItinerary] = useCreateItineraryApi();
  const [hotelDealDetails, getHotelDeal] = useHotelDealAPi();
  const [selectedRoomList, setSelectedRoomList] = useState<RoomDataType[]>([
    ...(roomsInHotel ?? []),
  ]);
  console.log('hotelDealDetails', hotelDealDetails);

  useEffect(() => {
    if (planningToolId) {
      getHotelDeal(planningToolId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planningToolId]);

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
        departureDate: moment(checkInDate).format(CONSTANT_costingDateFormat),
        hotelGuestRoomConfigurations:
          passengerConfiguration?.hotelGuestRoomConfiguration || [],
        nights: numberOfNights,
        nationality: storeService.deviceLocaleStore?.deviceLocale?.toUpperCase(),
      },
    };
    createItinerary(requestBody);
  };

  useDeepCompareEffect(() => {
    const {
      isSuccess,
      isLoading: itineraryDetailLoading,
      successResponseData,
    } = itineraryDetails;
    if (isSuccess && !itineraryDetailLoading && successResponseData) {
      // hotelData.roomsInHotel = [...selectedRoomList];
      // navigation.setParams({
      //   ...route.params,
      //   hotelData,
      //   update:true
      // })
      navigation.navigate(SCREEN_STAY_HOTEL_REVIEW, {
        hotelData: {
          ...hotelData,
          roomsInHotel: [...selectedRoomList],
        },
        itineraryId: successResponseData?.data,
        hotelSearchRequest,
        displayCurrency,
      });
    }
  }, [
    itineraryDetails.isLoading,
    itineraryDetails.isSuccess,
    displayCurrency,
    hotelSearchRequest,
  ]);

  const dotSeparateList = [
    `${Math.round(hotelData.stars)} star hotel`,
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
  const amenityList = hotelData.amenityDisplayList.map(
    (item: {iconUrl: string; amenityName: string}) => ({
      icon: <AmenityIcon name={item.iconUrl} size={14} color="#555555" />,
      text: item.amenityName,
    }),
  );
  const nightText = `${hotelData.numberOfNights} ${
    hotelData.numberOfNights > 1 ? 'nights' : 'night'
  }`;

  const changeRoom = (roomIdentifier: string, currentRoomIndex: number) => {
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
      nightText,
      displayCurrency,
    });
  };

  const onSimilarHotelPress = (item: HotelDataType, index: number) => {
    similarHotel.splice(index, 1);
    similarHotel.push(hotelData);
    navigation.push(SCREEN_STAY_HOTEL_DETAIL, {
      hotelData: item,
      searchIdentifier,
      hotelSearchRequest,
      displayCurrency,
      similarHotel,
    });
  };

  const goToHotelSearch = () => {
    navigation.navigate(SCREEN_STAY_SEARCH);
  };

  const totalCost = selectedRoomList.reduce((cost, room) => {
    return (cost += room.publishedCost);
  }, 0);
  const costSymbol = getSymbolFromCurrency(displayCurrency);
  const hotelPaxText = getPaxConfigText(
    passengerConfiguration?.hotelGuestRoomConfiguration,
  );

  const {data = []} = hotelDealDetails.successResponseData ?? {};
  return (
    <SafeAreaView style={styles.container}>
      <Box backgroundColor="#E5E5E5" flex={1}>
        <ScrollView>
          <MiniImageSlider
            height={326}
            width={width}
            images={hotelData.otherImages}
          />

          <StaySection
            title={hotelData.name}
            textContainer={{marginBottom: 12}}>
            <DotSeparateList list={dotSeparateList} marginBottom={12} />
          </StaySection>
          {data.length ? (
            <Box marginBottom={22} marginTop={16}>
              <Text
                fontSize={17}
                color={'#555555'}
                fontFamily={CONSTANT_fontPrimarySemiBold}
                marginBottom={20}
                paddingStart={20}>
                Deals for you
              </Text>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}>
                {data.map((deal, index) => (
                  <HotelDelaCard
                    cost={deal.itineraryCost}
                    strikedCost={deal.strikedCost}
                    link={deal.deepLinking?.link}
                    nights={deal.nights}
                    hotelPaxText={hotelPaxText}
                    index={index}
                  />
                ))}
              </ScrollView>
            </Box>
          ) : null}
          {amenityList.length ? (
            <StaySection title={'Amenities'} textContainer={{marginBottom: 0}}>
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
            </StaySection>
          ) : null}
          <AssuranceCard
            containerProps={{
              marginBottom: 8,
              paddingBottom: 16,
            }}
            contentProps={{
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 16,
              marginTop: 12,
            }}
            pillTextProps={{
              fontSize: 13,
              fontFamily: CONSTANT_fontPrimaryRegular,
            }}
            titleProps={{fontFamily: CONSTANT_fontPrimarySemiBold}}
            title={'PYT Safety Assurance'}
            list={[
              'Sanitized environment',
              'Safe dining',
              'Trained staff',
              'Safe practices',
            ]}
            content="This property follows safety and hygiene measures. It’s verified by us 😇"
          />
          <StaySection title={'About hotel'} textContainer={{marginBottom: 14}}>
            <ReadMoreCard
              data={hotelData.description}
              defaultVisibleItemCount={4}
              fontFamily={CONSTANT_fontPrimaryRegular}
              showViewLess={true}
              RenderItem={
                <AboutHotel
                  data={hotelData.description}
                  showViewMore={true}
                  description={extractTextFromHtml(hotelData.description)}
                />
              }
              viewMoreElement={
                <Text
                  fontFamily={CONSTANT_fontPrimarySemiBold}
                  color="#000000"
                  lineHeight={20}
                  fontSize={14}>
                  Read more
                </Text>
              }
              viewLessElement={
                <Text
                  fontFamily={CONSTANT_fontPrimarySemiBold}
                  color="#000000"
                  lineHeight={20}
                  fontSize={14}>
                  Read less
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
                    width={width - 32}
                    title={roomData.name}
                    fontFamily={CONSTANT_fontPrimarySemiBold}
                    cost={`${costSymbol}${cost}`}
                    costSubText={`${nightText} & ${getPaxConfigText(
                      [roomData.roomConfiguration],
                      false,
                    )}`}
                    marginBottom={20}
                    backgroundColor="#ffffff"
                    amenitiesProps={{
                      itemProp: {
                        width: 'auto',
                        marginEnd: 12,
                      },
                      fontFamily: CONSTANT_fontPrimaryRegular,
                    }}
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
                      icon: amenity.available ? (
                        <Included fill={'#555555'} />
                      ) : (
                        <Icon name={CONSTANT_closeIcon} color="#EF435D" />
                      ),
                      text: amenity.text,
                    }))}
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
          </Box>
          <Box>
            <Text
              fontFamily={CONSTANT_fontPrimarySemiBold}
              fontSize={17}
              color="#555555"
              marginStart={16}>
              Similar hotels
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              {similarHotel?.map((item: HotelDataType, index: number) => {
                return (
                  <HotelCardWrapper
                    hotelData={item}
                    cardIndex={index}
                    nightText={nightText}
                    paxText={hotelPaxText}
                    displayCurrency={displayCurrency}
                    onPress={() => onSimilarHotelPress(item, index)}
                    width={288}
                    marginRight={16}
                    marginBottom={20}
                    marginStart={index ? 0 : 16}
                    titleProps={{
                      numberOfLines: 1,
                    }}
                  />
                );
              })}
            </ScrollView>
          </Box>
        </ScrollView>
        <StayHotelFooter
          buttonText={
            itineraryDetails.isLoading ? 'Proceeding..' : 'Proceed to book'
          }
          leftButtonText={`${checkInDateDisplay} ${checkInMonthDisplay} - ${checkOutDateDisplay} ${checkOutMonthDisplay}`}
          leftButtonSubText={getPaxConfigText(
            passengerConfiguration.hotelGuestRoomConfiguration,
            false,
          )}
          leftButtonAction={goToHotelSearch}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default StayHotelDetailScreen;
