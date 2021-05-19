import {storiesOf} from '@storybook/react-native';

import IntroComponentTestCases from '../../Screens/IntroScreen/Components/IntroComponentTestCases';

const AppIntroStory = storiesOf('Post Booking Intro Components', module);

const renderTestCase = testCase =>
  AppIntroStory.add(testCase.title, () => testCase.Component);

IntroComponentTestCases.forEach(renderTestCase);
