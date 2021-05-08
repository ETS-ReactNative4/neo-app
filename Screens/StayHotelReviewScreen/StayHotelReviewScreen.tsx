import {Box, Button, DotSeparateList, Text} from '@pyt/micros';
import {AnimatedInputBox} from '@pyt/micros/src/animated-input-box';
import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import {inject, observer} from 'mobx-react';
import React from 'react';
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
import useSavePassengersApi from './hook/useSavePassengersApi';
import apiCall from '../../Services/networkRequests/apiCall';
import constants from '../../constants/constants';
import paymentScript from '../PaymentSummaryScreen/Components/paymentScript';

// import SectionTitle from '../../CommonComponents/SectionTitle/SectionTitle';
interface StayHotelReviewScreenProps {}
// @inject('otaHotel')

const StayHotelReviewScreen = ({data = {}, route,navigation}) => {
  const [savePassengersDetails, savePassengers] = useSavePassengersApi();
  const {hotelData={}, itineraryId } = route?.params ?? {}
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
  } = hotelData ;

  const initiatePayment = (paymentOptionType='FULL') => {


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
              console.log('failed payment')
            }
      })
      .catch(() => {
        console.log('payment failed')
      });
  };
console.log(savePassengersDetails,'savePassengersDetails-->')
  const onProceed = () => {
    const req = {
      itineraryId,
      roomPassengersDetailsList: [
        {
          otherPassengerDetailList: [],
          leadPassengerDetail: {
            type: 'adult',
            passengerId: '',
            salutation: 'Ms',
            firstName: name,
            birthDay: '12/Dec/1996',
            lastNameAvailable: false,
            nationality: 'IN'
          }
        }
      ]
    }
    initiatePayment()
// savePassengers(req)
    console.log('onProceed',req)
  }

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
  return (
    <Box backgroundColor="#E5E5E5" flex={1}>
      <ScrollView>
        <HotelCard
          width={'100%'}
          title={name}
          footerContainerProps={{
            display: 'none',
          }}
          marginBottom={20}
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
      </ScrollView>
      <Button
        backgroundColor={'#00C684'}
        margin={20}
        paddingHorizontal={16}
        borderRadius={8}
        onPress={() => {onProceed()
          // navigation.navigate(SCREEN_STAY_HOTEL_REVIEW)
        }}
        text="Proceed to book"
        textProps={{
          color: '#ffffff',
          fontFamily: CONSTANT_fontPrimarySemiBold,
        }}
      />
    </Box>
  );
};

export default StayHotelReviewScreen;
