import React from 'react';

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
    title: 'It’s vacay time! Let the fun begin!',
    description: 'You are :pendingDays days away from the best holiday ever!',
    image:
      'https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/1.png',
  },
  {
    title: 'Live on-trip support',
    description: 'Your trip is important to us. We’ll stay on the line :)',
    image:
      'https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/2.png',
  },
  {
    title: 'Visa assistance',
    description:
      'You do the travelling. We’ll take care of the paperwork—visa assistance every step of the way!',
    image:
      'https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/3.png',
  },
  {
    title: 'Easy access to everything travel',
    description:
      'You’ve got all your bookings in one place—flights, hotels, activities—you tap it and it’s here!',
    image:
      'https://pyt-voyager.s3.ap-south-1.amazonaws.com/so-feedback/intro-cover-images/4.png',
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
