import React from 'react';
import {StyleSheet, View} from 'react-native';
import {getStorybookUI, addDecorator, configure} from '@storybook/react-native';

import './rn-addons';
import {isProduction} from '../Services/getEnvironmentDetails/getEnvironmentDetails';
import {CONSTANT_white1, CONSTANT_shade3} from '../constants/colorPallete';

addDecorator(story => <View style={styles.storyWrapper}>{story()}</View>);

configure(() => {
  // require('./stories/ChatScreenStory');
  require('./stories/CommonComponentsStory');
  require('./stories/TripFeedStory');
  require('./stories/PackagesPageStory');
  require('./stories/VouchersStory');
  require('./stories/ForexStory');
  require('./stories/PaymentsStory');
  require('./stories/HelpDeskStory');
  require('./stories/VisaStory');
  require('./stories/SmartImageStory');
  require('./stories/IntroScreenStory');
  require('./stories/AgentFeedbackScreenStory');
  // require('./stories/AgentInfoScreenScreenStory');
  require('./stories/TravelProfileScreenStory');
  require('./stories/MaritalStatusScreenStory');
  require('./stories/AppLoginScreenStory');
  // require('./stories/ListingPageScreenStory');
  require('./stories/PromoLandingScreenStory');
  require('./stories/NotificationsScreenStory');
  require('./stories/SavedItineraryScreenStory');
  require('./stories/UltimateMenuScreenStory');
  require('./stories/TravellerProfileDetailsScreenStory');
  require('./stories/ItineraryScreenStory');
  // require('./stories/GCMFormScreenStory');
  require('./stories/SearchScreenStory');
  require('./stories/TripIntensityScreenStory');
}, module);

const StorybookUIRoot = getStorybookUI({
  asyncStorage:
    require('@react-native-async-storage/async-storage').AsyncStorage || null,
});

const styles = StyleSheet.create({
  storyWrapper: {
    flex: 1,
    backgroundColor: CONSTANT_white1,
    borderColor: CONSTANT_shade3,
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export const shouldIncludeStoryBook = () => __DEV__ || !isProduction();

export default StorybookUIRoot;
