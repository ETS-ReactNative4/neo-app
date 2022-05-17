import React from 'react';
import {
  openPostBookingHome,
  openSOFeedback,
} from '../../Services/launchPostBooking/launchPostBooking';
import storeService from '../../Services/storeService/storeService';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {SCREEN_POST_BOOKING_INTRO} from '../../NavigatorsV2/ScreenNames';
import {isStaycation} from '../../Services/isStaycation/isStaycation';
// import IntroScreen from '../IntroScreen/IntroScreen';

type PostBookingIntroNavTypes = AppNavigatorProps<
  typeof SCREEN_POST_BOOKING_INTRO
>;
export interface PostBookingIntroProps extends PostBookingIntroNavTypes {}

const PostBookingIntro = ({route}: PostBookingIntroProps) => {
  const {introData = []} = route.params || {};

  const nextScreen = () => {
    const {selectedItineraryId, selectedItinerary} = storeService.itineraries;
    const staycation = isStaycation(selectedItinerary);

    if (staycation) {
      openPostBookingHome();
    } else {
      openSOFeedback(selectedItineraryId);
    }
  };
  // return <IntroScreen introData={introData} nextScreen={nextScreen} />;
};
export default PostBookingIntro;
