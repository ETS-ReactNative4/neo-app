import {Box, Button, Text, TripAdvisor} from '@pyt/micros';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView} from 'react-native';
import {
  CONSTANT_fontPrimaryLight,
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {Included} from '@pyt/icons';
import {SCREEN_STAY_HOTEL_REVIEW} from '../../NavigatorsV2/ScreenNames';
import useSavePassengersApi from './hook/useSavePassengersApi';
import apiCall from '../../Services/networkRequests/apiCall';
import constants from '../../constants/constants';
import paymentScript from '../PaymentSummaryScreen/Components/paymentScript';
import StaySection from '../StayHotelListScreen/Components/StaySection';
import {Passengers} from './Components/Passengers';

import {Coupon} from './Components/Coupon';
import useCouponApi from './hook/useCouponApi';
import {LoyaltyCredits} from './Components/LoyaltyCredits';
import useLoayltyCreditApi from './hook/useLoyaltyCreditApi';
import {CONSTANT_paymentIcon} from '../../constants/imageAssets';
import Icon from '../../CommonComponents/Icon/Icon';
import {TripDetails} from './Components/TripDetails';
import {PriceDetails} from './Components/PriceDetails';
import {isPassengerFormValid} from './util/isPassengerFormValid';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import User from '../../mobx/User';
import {HotelDataType} from '../StayHotelDetailScreen/StayHotelDetailScreen';
import moment from 'moment';
import {CONSTANT_costingDateFormat} from '../../constants/styles';
import {StayHotelSearcRequestType} from '../StayHotelSearchScreen/StayHotelSearchScreen';
import DeviceLocale from '../../mobx/DeviceLocale';
import {toastBottom} from '../../Services/toast/toast';
import {CONSTANT_serverResponseErrorText} from '../../constants/appText';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';
import launchItinerarySelector from '../../Services/launchItinerarySelector/launchItinerarySelector';
import {IItinerary} from '../../TypeInterfaces/IItinerary';
import OTAHotel from '../../mobx/OTAHotel';
import {cloneDeep} from 'lodash';

type StayHotelReviewScreenNavType = AppNavigatorProps<
  typeof SCREEN_STAY_HOTEL_REVIEW
>;
export interface StayHotelReviewParamType {
  hotelData: HotelDataType;
  itineraryDetail: IItinerary;
  displayCurrency: string;
  hotelSearchRequest: StayHotelSearcRequestType;
}
interface StayHotelReviewScreenType extends StayHotelReviewScreenNavType {
  userStore: User;
  deviceLocaleStore: DeviceLocale;
  otaHotelStore: OTAHotel;
}

export type PassengerErrorType = {
  salutation?: boolean;
  firstName?: boolean;
  birthDay?: boolean;
  mobileNumber?: boolean;
  email?: boolean;
};

const defaultPaxData = {
  type: 'adult',
  passengerId: '',
  salutation: '',
  firstName: '',
  birthDay: undefined,
  lastNameAvailable: false,
  nationality: 'IN',
  mobileNumber: '',
  countryPhoneCode: '+91',
  email: '',
};
const StayHotelReviewScreen = inject('deviceLocaleStore')(
  inject('userStore')(
    inject('otaHotelStore')(
      observer(
        ({
          route,
          navigation,
          deviceLocaleStore,
          userStore,
          otaHotelStore,
        }: StayHotelReviewScreenType) => {
          const {userDisplayDetails} = userStore;
          const {
            hotelData,
            itineraryDetail,
            displayCurrency = 'INR',
            hotelSearchRequest,
          }: StayHotelReviewParamType = route?.params ?? {};
          const {itineraryId} = itineraryDetail.itinerary ?? {};
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const [_, savePassengers] = useSavePassengersApi();
          const [couponDetails, applyCoupon] = useCouponApi();
          const [creditDetails, applyLoyaltyCredit] = useLoayltyCreditApi();
          const [openedBoxName, setOpenedBoxName] = useState<
            'CREDIT' | 'COUPON' | ''
          >('');
          const {passengerConfiguration} = hotelSearchRequest ?? {};
          let paxData = [
            ...Array(hotelData.roomsInHotel.length || 0).keys(),
          ].map(() => cloneDeep(defaultPaxData));

          const [loading, setLoading] = useState<boolean>(false);
          const [passengerList, setPassengerList] = useState(paxData);
          const [passengerDataError, setPassengerDataError] = useState<
            PassengerErrorType[]
          >([]);

          const header = useRef(
            PrimaryHeader({
              leftAction: () => navigation.goBack(),
              headerElement: (
                <Text
                  fontFamily={CONSTANT_fontPrimarySemiBold}
                  fontSize={15}
                  lineHeight={19}>
                  Review
                </Text>
              ),
            }),
          ).current;

          const {
            imageURL,
            otherImages = [],
            name,
            distanceFromCityCenter,
            stars,
            amenitiesList,
            breakFastAvailable,
            refundable,
            amenities,
            cityName,
            numberOfNights = 0,
            checkInDateDisplay,
            checkInMonthDisplay,
            checkOutDateDisplay,
            checkOutMonthDisplay,
            roomsInHotel = [],
            tripAdvisorRating,
          } = hotelData;

          useEffect(() => {
            const leadPax = {
              firstName: userDisplayDetails.name,
              email: userDisplayDetails.email,
              mobileNumber: userDisplayDetails.mobileNumber,
              salutation: '',
              lastNameAvailable: false,
              nationality: deviceLocaleStore.deviceLocale?.toUpperCase(),
              birthDay: undefined,
              type: 'adult',
              countryPhoneCode: userDisplayDetails.countryPhoneCode,
            };
            passengerList[0] = leadPax;
            setPassengerList([...passengerList]);
            // eslint-disable-next-line react-hooks/exhaustive-deps
          }, [userStore]);

          const updatePaxData = ({
            index,
            key,
            value,
          }: {
            index: number;
            key: string;
            value: string | number;
          }) => {
            passengerList[index][key] = value;
            if (!passengerList[index].nationality) {
              passengerList[
                index
              ].nationality = deviceLocaleStore.deviceLocale?.toUpperCase();
            }
            setPassengerList([...passengerList]);
            if (passengerDataError.length) {
              setPassengerDataError(
                isPassengerFormValid({formData: passengerList}),
              );
            }
          };
          const initiatePayment = (paymentOptionType = 'FULL') => {
            apiCall(
              constants.initiatePayment,
              {
                itineraryId,
                paymentOptionType,
                userId: '',
              },
              'POST',
              constants.productUrl,
              false,
              {
                Version: 'V_2',
                user_device: 'MOBILE_APP',
              },
            )
              .then(response => {
                if (response.status === constants.responseSuccessStatus) {
                  const transactionId = response.data.transactionId;
                  const paymentScriptJs = paymentScript(response.data);
                  setLoading(false);
                  navigation.navigate('PaymentScreen', {
                    paymentScript: paymentScriptJs,
                    transactionId,
                    backAction: () => {
                      otaHotelStore.reset();
                      navigation.dispatch(launchItinerarySelector());
                    },
                  });
                } else {
                  setLoading(false);
                  console.log('failed payment');
                }
              })
              .catch(() => {
                setLoading(false);
                console.log('payment failed');
                toastBottom(CONSTANT_serverResponseErrorText);
              });
          };

          const onProceed = () => {
            setPassengerDataError(
              isPassengerFormValid({formData: passengerList}),
            );
            const errorData = isPassengerFormValid({formData: passengerList});
            const isEmpty = !errorData.filter(
              error => !!Object.keys(error).length,
            ).length;
            if (!isEmpty) {
              return;
            }
            setLoading(true);
            const passengers = passengerList.map(passenger => ({
              ...passenger,
              birthDay: moment(passenger).format(CONSTANT_costingDateFormat),
            }));
            const req = {
              itineraryId,
              roomPassengersDetailsList: [
                {
                  otherPassengerDetailList: passengers.slice(1),
                  leadPassengerDetail: passengers[0],
                },
              ],
            };

            savePassengers(req).then(() => initiatePayment());
          };

          const image = imageURL || otherImages?.[0];
          const dotSeparateList = [
            cityName,
            `${parseInt(distanceFromCityCenter || 0, 10)} km from city center`,
            stars ? `${Math.round(stars)} star hotel` : null,
            tripAdvisorRating ? (
              <TripAdvisor stars={tripAdvisorRating} />
            ) : null,
          ]
            .filter(element => element)
            .map((element, index) =>
              typeof element === 'string' ? (
                <Text
                  fontFamily={CONSTANT_fontPrimaryRegular}
                  fontSize={13}
                  color={'#333333'}
                  lineHeight={20}
                  key={index}
                  marginBottom={4}>
                  {element}
                </Text>
              ) : (
                element
              ),
            );

          const nightText = `${numberOfNights} ${
            numberOfNights > 1 ? 'nights' : 'night'
          }`;

          const {couponVO = {}, itinerary: couponItineraryData} =
            couponDetails.successResponseData?.data || {};
          const {itinerary: loyaltyCreditItineraryData} =
            creditDetails.successResponseData?.data || {};

          return (
            <Box backgroundColor="#F5F5F5" flex={1}>
              {header}
              <ScrollView keyboardShouldPersistTaps={'handled'}>
                <Box padding={16} backgroundColor={'#ffffff'} marginBottom={8}>
                  <HotelCard
                    width={'100%'}
                    fontFamily={CONSTANT_fontPrimaryLight}
                    title={name}
                    footerContainerProps={{
                      display: 'none',
                    }}
                    borderWidth={0}
                    marginBottom={8}
                    isReviewCard={true}
                    backgroundColor="#ffffff"
                    amenitiesProps={{
                      itemProp: {
                        width: 'auto',
                        marginEnd: 12,
                      },
                    }}
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
                        available: !!amenities?.filter(
                          ({name: amenityName}: {name: string}) =>
                            amenityName === 'AIR CONDITIONING',
                        ).length,
                      },
                    ].reduce((amenityDisplayList, amenity) => {
                      if (amenity.available) {
                        amenityDisplayList.push({
                          text: amenity.text,
                          icon: <Included fill="#555555" />,
                        });
                      }
                      return amenityDisplayList;
                    }, [])}
                    dotSeparateList={dotSeparateList}
                    footerRightElement={<></>}
                    sliderProps={{
                      images: image ? [image] : [],
                      width: 88,
                      height: 88,
                      borderRadius: 12,
                      marginEnd: 16,
                    }}
                    contentProps={{
                      paddingHorizontal: 0,
                      paddingVertical: 1,
                      borderTopWidth: 1,
                      borderColor: '#F0F0F0',
                      marginTop: 16,
                    }}
                  />
                </Box>
                <TripDetails
                  nightText={nightText}
                  checkInDateDisplay={checkInDateDisplay}
                  checkInMonthDisplay={checkInMonthDisplay}
                  checkOutDateDisplay={checkOutDateDisplay}
                  checkOutMonthDisplay={checkOutMonthDisplay}
                  hotelGuestRoomConfiguration={
                    passengerConfiguration?.hotelGuestRoomConfiguration || []
                  }
                />

                <PriceDetails
                  hotelGuestRoomConfiguration={
                    passengerConfiguration?.hotelGuestRoomConfiguration || []
                  }
                  nightText={nightText}
                  displayCurrency={displayCurrency}
                  roomsInHotel={roomsInHotel}
                  couponAmount={
                    couponItineraryData?.discounts?.total ||
                    loyaltyCreditItineraryData?.discounts?.total ||
                    0
                  }
                  itinerary={
                    couponItineraryData ||
                    loyaltyCreditItineraryData ||
                    itineraryDetail.itinerary
                  }
                />
                {deviceLocaleStore.deviceLocale === 'in' ? (
                  <StaySection paddingVertical={0}>
                    <LoyaltyCredits
                      userId={userDisplayDetails.userId}
                      itineraryId={itineraryId}
                      openedBoxName={openedBoxName}
                      setOpenedBoxName={setOpenedBoxName}
                      applyCredit={applyLoyaltyCredit}
                      disabled={couponVO.couponApplied}
                      displayCurrency={displayCurrency}
                      loading={creditDetails.isLoading}
                      itinerary={
                        couponItineraryData ||
                        loyaltyCreditItineraryData ||
                        itineraryDetail.itinerary
                      }
                    />
                    <Box height={1} backgroundColor="#F0F0F0" />
                    <Coupon
                      applyCoupon={applyCoupon}
                      itineraryId={itineraryId}
                      openedBoxName={openedBoxName}
                      setOpenedBoxName={setOpenedBoxName}
                      disabled={
                        loyaltyCreditItineraryData?.discounts?.total > 0
                      }
                      loading={couponDetails.isLoading}
                    />
                  </StaySection>
                ) : null}

                {passengerList.map((passenger, index) => {
                  const {roomConfiguration, name: roomName} =
                    roomsInHotel[index] ?? {};
                  const {adultCount, childAges} = roomConfiguration ?? {};
                  return (
                    <StaySection
                      title={`Room ${index + 1}: `}
                      subText={`${adultCount} ${
                        adultCount > 1 ? 'adults' : 'adult'
                      }, ${
                        childAges.length ? `${childAges.length} child, ` : ''
                      }${roomName} `}>
                      <Passengers
                        {...passenger}
                        updatePaxData={updatePaxData}
                        index={index}
                        error={passengerDataError[index]}
                      />
                    </StaySection>
                  );
                })}
              </ScrollView>

              <Button
                backgroundColor={'#00C684'}
                margin={20}
                paddingHorizontal={16}
                borderRadius={8}
                onPress={() => {
                  onProceed();
                }}
                text={loading ? 'Proceeding..' : 'Proceed to payment'}
                loading={loading}
                textProps={{
                  color: '#ffffff',
                  fontFamily: CONSTANT_fontPrimarySemiBold,
                  marginStart: 4,
                }}
                icon={
                  <Icon name={CONSTANT_paymentIcon} color="#ffffff" size={14} />
                }
                iconPosition={'left'}
              />
            </Box>
          );
        },
      ),
    ),
  ),
);

export default StayHotelReviewScreen;
