import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
  CONSTANT_primarySemiBold,
} from '../../constants/fonts';
import {
  CONSTANT_CONCIERGE_SUPPORT_INTRO,
  CONSTANT_CX_INTRO,
  CONSTANT_TRANSPARENT_PRICING,
  CONSTANT_TRAVELLER_INTRO,
} from '../../constants/imageAssets';

import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {
  SCREEN_APP_LOGIN,
  SCREEN_PRE_TRIP_INTRO,
} from '../../NavigatorsV2/ScreenNames';
import IntroScreen, {IIntroData} from '../IntroScreen/IntroScreen';

type PreTripIntroNavTypes = AppNavigatorProps<typeof SCREEN_PRE_TRIP_INTRO>;
export interface PreTripIntroProps extends PreTripIntroNavTypes {}

const postBookingIntroDefaultData: IIntroData[] = [
  {
    title: '20,000+ travellers',
    description: 'Delivered delightful holidays for travellers across India',
    image: CONSTANT_TRAVELLER_INTRO(),
  },
  {
    title: '24x7 expert concierge',
    description: 'Travel hassle-free with expert assistance round the clock',
    image: CONSTANT_CONCIERGE_SUPPORT_INTRO(),
  },
  {
    title: 'Transparent pricing',
    description: 'Know what you’re paying for. No hidden costs involved',
    image: CONSTANT_TRANSPARENT_PRICING(),
  },
  {
    title: 'Customer experience at its best',
    description: 'World class customer experience delivered to you',
    image: CONSTANT_CX_INTRO(),
  },
];

const PreTripIntroScreen = ({navigation}: PreTripIntroProps) => {
  const nextScreen = () => {
    navigation.navigate(SCREEN_APP_LOGIN, {
      launchSource: 'PRETRIP_WELCOME_FLOW',
    });
  };
  return (
    <IntroScreen
      introData={postBookingIntroDefaultData}
      nextScreen={nextScreen}
      titleTextStyle={{
        ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 22, 26),
      }}
      descriptionTextStyle={{
        ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18, 24),
      }}
      coverImageContainerStyle={{height: responsiveHeight(75)}}
    />
  );
};
export default PreTripIntroScreen;
