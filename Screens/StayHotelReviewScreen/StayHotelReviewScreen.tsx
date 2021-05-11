import {Box, Button, DotSeparateList, Text} from '@pyt/micros';
import {AnimatedInputBox} from '@pyt/micros/src/animated-input-box';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React, {useEffect, useState} from 'react';
import getSymbolFromCurrency from 'currency-symbol-map';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {
  CONSTANT_fontPrimaryLight,
  CONSTANT_fontPrimaryRegular,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {getGlobalPriceWithoutSymbol} from '../ExploreScreen/services/getPriceWithoutSymbol';
import {identity} from 'lodash';
import {Included} from '@pyt/icons';
import {MiniImageSlider} from '@pyt/widgets/dist/esm/mini-image-slider';
import {ReadMoreCard} from '../TripFeedScreen/Components/ReadMoreCard';
import {SCREEN_STAY_HOTEL_REVIEW} from '../../NavigatorsV2/ScreenNames';
import useSavePassengersApi from './hook/useSavePassengersApi';
import apiCall from '../../Services/networkRequests/apiCall';
import constants from '../../constants/constants';
import paymentScript from '../PaymentSummaryScreen/Components/paymentScript';
import StaySection from '../StayHotelListScreen/Components/StaySection';
import {Passengers} from './Components/Passengers';
import {CouponInput} from './Components/CouponInput';
import {Coupon} from './Components/Coupon';
import useCouponApi from './hook/useCouponApi';
import {LoyaltyCredits} from './Components/LoyaltyCredits';
import useLoayltyCreditApi from './hook/useLoyaltyCreditApi';
import {CONSTANT_arrowRight} from '../../constants/imageAssets';
import Icon from '../../CommonComponents/Icon/Icon';
import {TripDetails} from './Components/TripDetails';
import {PriceDetails} from './Components/PriceDetails';
import {isPassengerFormValid} from './util/isPassengerFormValid';
import CountryCodePicker from '../MobileNumberScreen/Components/CountryCodePicker';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import User from '../../mobx/User';
import { HotelDataType } from '../StayHotelDetailScreen/StayHotelDetailScreen';

type StayHotelReviewScreenNavType = AppNavigatorProps<
  typeof SCREEN_STAY_HOTEL_REVIEW
>;

export interface StayHotelReviewParamType {
  hotelData: HotelDataType;
  itineraryId: string;
  displayCurrency: string; 
}
// import SectionTitle from '../../CommonComponents/SectionTitle/SectionTitle';
interface StayHotelReviewScreenType extends StayHotelReviewScreenNavType {
  userStore: User;
}
// @inject('otaHotel')

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
  birthDay: new Date(),
  lastNameAvailable: false,
  nationality: 'IN',
  mobileNumber: '',
  countryPhoneCode: '+91',
  email: '',
};
const StayHotelReviewScreen = inject('deviceLocaleStore')(
  inject('userStore')(
    observer(({route, navigation, userStore}: StayHotelReviewScreenType) => {
      const {userDisplayDetails, getUserDisplayDetails} = userStore;
      const {
        hotelData = {},
        itineraryId = '6099344a612cae0001cd7da6',
        displayCurrency = 'INR',
        hotelSearchRequest = {},
      } = route?.params ?? {};

      const [savePassengersDetails, savePassengers] = useSavePassengersApi();
      const [couponDetails, applyCoupon] = useCouponApi();
      const [creditDetails, applyCredit] = useLoayltyCreditApi();
      const [openedBoxName, setOpenedBoxName] = useState<
        'CREDIT' | 'COUPON' | ''
      >('');
      const {passengerConfiguration, checkInDate} = hotelSearchRequest ?? {};
      let paxData = Array(hotelData.roomsInHotel.length || 0).fill({
        ...defaultPaxData,
      });

      const [passengerList, setPassengerList] = useState(paxData);
      const [passengerDataError, setPassengerDataError] = useState<
        PassengerErrorType[]
      >([]);

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
        cityName,
        numberOfNights = 0,
        checkInDateDisplay,
        checkInMonthDisplay,
        checkOutDateDisplay,
        checkOutMonthDisplay,
        roomsInHotel = [],
      } = hotelData;

      useEffect(() => {
        const leadPax = {
          firstName: userDisplayDetails.name,
          email: userDisplayDetails.email,
          mobileNumber: userDisplayDetails.mobileNumber,
          salutation: '',
          lastNameAvailable: false,
          nationality: 'IN',
          birthDay: new Date(),
          type: 'adult',
          countryPhoneCode: userDisplayDetails.countryPhoneCode,
        };
        passengerList[0] = leadPax;
        setPassengerList([...passengerList]);
      }, [userStore]);

      const updatePaxData = ({index, key, value}) => {
        passengerList[index][key] = value;
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
              navigation.navigate('PaymentScreen', {
                paymentScript: paymentScriptJs,
                transactionId,
              });
            } else {
              console.log('failed payment');
            }
          })
          .catch(() => {
            console.log('payment failed');
          });
      };
      console.log(
        savePassengersDetails,
        itineraryId,
        passengerList,
        'savePassengersDetails-->',
        hotelData,
      );
      const onProceed = () => {
        setPassengerDataError(isPassengerFormValid({formData: passengerList}));
        console.log(isPassengerFormValid({formData: passengerList}));
        // const req = {
        //   itineraryId,
        //   roomPassengersDetailsList: [
        //     {
        //       otherPassengerDetailList: [],
        //       leadPassengerDetail: {
        //         type: 'adult',
        //         passengerId: '',
        //         salutation: 'Ms',
        //         firstName: 'Testing',
        //         birthDay: '12/Dec/1996',
        //         lastNameAvailable: false,
        //         nationality: 'IN',
        //       },
        //     },
        //   ],
        // };

        // savePassengers(req).then(() => initiatePayment());
        // console.log('onProceed', req);
      };

      const image = imageURL || otherImages?.[0];
      const dotSeparateList = [
        cityName,
        `${parseInt(distanceFromCityCenter || 0, 10)} from city center`,
        `${stars} star hotel`,
      ].map((list, index) => (
        <Text
          fontFamily={CONSTANT_fontPrimaryRegular}
          fontSize={13}
          color={'#333333'}
          key={index}>
          {list}
        </Text>
      ));

      const nightText = `${numberOfNights} ${
        numberOfNights > 1 ? 'nights' : 'night'
      }`;

      return (
        <SafeAreaView style={{flex: 1, backgroundColor: '#ffffff'}}>
          <Box backgroundColor="#E5E5E5" flex={1}>
            <ScrollView keyboardShouldPersistTaps={'handled'}>
              <HotelCard
                width={'100%'}
                fontFamily={CONSTANT_fontPrimaryLight}
                title={name}
                footerContainerProps={{
                  display: 'none',
                }}
                marginBottom={8}
                // isReviewCard={true}
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
                    available: !!amenities?.filter(
                      ({name}) => name === 'AIR CONDITIONING',
                    ).length,
                  },
                ].reduce((amenities, amenity) => {
                  if (amenity.available) {
                    amenities.push({
                      text: amenity.text,
                      icon: <Included fill="red" />,
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

              <TripDetails
                navigation={navigation}
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
              />
              <StaySection paddingVertical={0}>
                <LoyaltyCredits
                  userId={userDisplayDetails.userId}
                  applyCoupon={applyCoupon}
                  itineraryId={itineraryId}
                  openedBoxName={openedBoxName}
                  setOpenedBoxName={setOpenedBoxName}
                  applyCredit={applyCredit}
                />
                <Box height={1} backgroundColor="#F0F0F0" />
                <Coupon
                  applyCoupon={applyCoupon}
                  itineraryId={itineraryId}
                  openedBoxName={openedBoxName}
                  setOpenedBoxName={setOpenedBoxName}
                />
              </StaySection>

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
          </Box>
          <Button
            backgroundColor={'#00C684'}
            margin={20}
            paddingHorizontal={16}
            borderRadius={8}
            onPress={() => {
              onProceed();
              // navigation.navigate(SCREEN_STAY_HOTEL_REVIEW)
            }}
            text="Proceed to book"
            textProps={{
              color: '#ffffff',
              fontFamily: CONSTANT_fontPrimarySemiBold,
            }}
          />

          {/* </Box> */}
        </SafeAreaView>
      );
    }),
  ),
);

export default StayHotelReviewScreen;
