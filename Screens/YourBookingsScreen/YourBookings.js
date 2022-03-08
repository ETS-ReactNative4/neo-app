import React, {Component} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import CommonHeader from '../../CommonComponents/CommonHeader/CommonHeader';
import Upcoming from './Components/Upcoming';
import CloseYourBookingsButton from './Components/CloseYourBookingsButton';
import {inject, observer} from 'mobx-react';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import PropTypes from 'prop-types';
import resetToWelcomeFlow from '../../Services/resetToWelcomeFlow/resetToWelcomeFlow';
import {SCREEN_POST_BOOKING_HOME} from '../../NavigatorsV2/ScreenNames';

const resetAction = navigation =>
  resetToWelcomeFlow().then(action => navigation.dispatch(action));

@ErrorBoundary({isRoot: true})
@inject('itineraries')
@inject('appState')
@inject('yourBookingsStore')
@observer
class YourBookings extends Component {
  _didFocusSubscription;
  _willBlurSubscription;

  static propTypes = {
    appState: PropTypes.object.isRequired,
    yourBookingsStore: PropTypes.object.isRequired,
    navigation: PropTypes.object.isRequired,
    itineraries: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      () => {
        BackHandler.addEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );
    const {getUpcomingItineraries} = this.props.yourBookingsStore;
    getUpcomingItineraries();
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    const {navigation} = this.props;
    if (navigation.isFocused()) {
      this.goBack();
      return true;
    }
    return false;
  };

  goBack = () => {
    if (this.props.itineraries.selectedItineraryId) {
      this.props.navigation.navigate(SCREEN_POST_BOOKING_HOME);
    } else {
      resetAction(this.props.navigation);
    }
  };

  render() {
    const {navigation} = this.props;
    const {
      itineraries,
      isLoading,
      getUpcomingItineraries,
    } = this.props.yourBookingsStore;
    return (
      <View style={styles.yourBookingsContainer}>
        <CommonHeader
          LeftButton={<CloseYourBookingsButton goBack={this.goBack} />}
          title={'Your Bookings'}
          navigation={navigation}
        />
        <Upcoming
          tabLabel="UPCOMING"
          itinerariesList={itineraries}
          isLoading={isLoading}
          navigation={this.props.navigation}
          getUpcomingItineraries={getUpcomingItineraries}
          goBack={this.goBack}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  yourBookingsContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default YourBookings;
