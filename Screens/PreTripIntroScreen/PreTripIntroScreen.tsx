import React from 'react';
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
    description:
      '20000+ travellers: Delivered delightful holidays for travellers across India',
    image: CONSTANT_TRAVELLER_INTRO(),
  },
  {
    title: '24x7 expert concierge',
    description:
      '24x7 Concierge: Travel hassle-free with expert assistance round the clock',
    image: CONSTANT_CONCIERGE_SUPPORT_INTRO(),
  },
  {
    title: 'Transparent pricing',
    description:
      'Transparent Pricing: Know what you’re paying for. No hidden costs involved',
    image: CONSTANT_TRANSPARENT_PRICING(),
  },
  {
    title: 'Customer experience at its best',
    description:
      'Customer Experience at its best: World class customer experience delivered to you',
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
    />
  );
};
export default PreTripIntroScreen;
