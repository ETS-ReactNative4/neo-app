import React, {Component} from 'react';
import {View, StyleSheet, BackHandler} from 'react-native';
import HomeHeader from '../../CommonComponents/HomeHeader/HomeHeader';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import ToolTip from './Components/ToolTip/ToolTip';
import TripViewLite from './Components/TripViewLite/TripViewLite';
import TripView from './Components/TripView/TripView';
import TripFeedCarousel from './Components/TripFeedCarousel/TripFeedCarousel';
import BigImageCard from './Components/BigImageCard/BigImageCard';
import AlertCard from './Components/AlertCard/AlertCard';
import InfoCard from './Components/InfoCard/InfoCard';
import {inject, observer} from 'mobx-react';
import CustomScrollView from '../../CommonComponents/CustomScrollView/CustomScrollView';
import InfoCardModal from './Components/InfoCardModal/InfoCardModal';
import NoInternetIndicator from '../../CommonComponents/NoInternetIndicator/NoInternetIndicator';
import FeedBackSwiper from './Components/FeedBackSwiper/FeedBackSwiper';
import FeedBackPositiveExplosion from './Components/FeedBackSwiper/Components/FeedBackPositiveExplosion';
import DayAhead from './Components/DayAhead/DayAhead';
import DayAheadLite from './Components/DayAheadLite/DayAheadLite';
import FeedbackPanelOverlay from './Components/FeedbackPanelOverlay';
import pullToRefresh from '../../Services/refresh/pullToRefresh';
import debouncer from '../../Services/debouncer/debouncer';
import constants from '../../constants/constants';
import AlertCardV2 from './Components/AlertCardV2/AlertCardV2';
import isUserLoggedInCallback from '../../Services/isUserLoggedInCallback/isUserLoggedInCallback';
import {
  getActorId,
  getRestoreId,
  getUnreadMessagesCount,
  identifyChatUser,
  initializeChat,
  setChatUserDetails,
} from '../../Services/freshchatService/freshchatService';
import SupportOfflineMessage from '../ChatScreen/Components/SupportOfflineMessage';
import dialer from '../../Services/dialer/dialer';
import {recordEvent} from '../../Services/analytics/analyticsService';
import PropTypes from 'prop-types';
import {logError} from '../../Services/errorLogger/errorLogger';
import storeService from '../../Services/storeService/storeService';
import { MiniImageSlider } from '@pyt/widgets/dist/esm/mini-image-slider';
// import {HotelCard} from '@pyt/widgets/dist/esm/hotel-card';
import { Image, Pill, Ribbon, Text } from '@pyt/micros';
import { Bed, Included } from '@pyt/icons';
import {HotelCard} from './Components/HotelCard'
import { CONSTANT_fontPrimarySemiBold } from '../../constants/fonts';
import { Button } from '@pyt/micros';
import { SCREEN_STAY_SEARCH } from '../../NavigatorsV2/ScreenNames';
import { AnimatedInputBox } from '../StayHotelSearchScreen/animated-input-box';
// import {AnimatedInputBox} from './Components/AnimatedInput'
// import {MiniImageSlider} from './Components/ImageSlider'
@ErrorBoundary({isRoot: true})
@inject('deviceDetailsStore')
@inject('tripFeedStore')
@inject('yourBookingsStore')
@inject('feedbackPrompt')
@inject('itineraries')
@inject('chatDetailsStore')
@inject('visaStore')
@observer
class TripFeed extends Component {
  static propTypes = {
    tripFeedStore: PropTypes.object,
    feedbackPrompt: PropTypes.object,
    itineraries: PropTypes.object,
    chatDetailsStore: PropTypes.object,
    navigation: PropTypes.object,
    visaStore: PropTypes.object,
  };

  static navigationOptions = {
    header: null,
  };

  _didFocusSubscription;
  _willBlurSubscription;
  _emitterComponent = React.createRef();

  constructor(props) {
    super(props);

    /**
     * Loading Header into the view instead of react navigation
     * To hide it when the feedback overlay shows up
     */
    this.state = {
      scrollEnabled: true,
      tripFeedHeader: HomeHeader({navigation: props.navigation}).header,
    };

    this._didFocusSubscription = props.navigation.addListener(
      'didFocus',
      () => {
        debouncer(() => {
          const {selectedItineraryId} = props.itineraries;
          if (selectedItineraryId) {
            this.loadTripFeedData();
            this.loadChatData();
          }
          BackHandler.addEventListener(
            'hardwareBackPress',
            this.onBackButtonPressAndroid,
          );
        });
      },
    );
  }

  onBackButtonPressAndroid = () => {
    const {navigation} = this.props;
    if (navigation.isFocused()) {
      BackHandler.exitApp();
    } else {
      return false;
    }
  };

  toggleScrollLock = status => {
    if (!status) {
      setTimeout(() => {
        this.setState({
          scrollEnabled: true,
        });
      }, 1000);
    }
    this.setState({
      scrollEnabled: status,
    });
  };

  loadPostTripData = () => {
    this.loadTripFeedData();
    this.loadChatData();
    const {
      isVisaInitialized,
      shouldDisplaySuccessAnimation,
      loadAllVisaDetails,
    } = this.props.visaStore;
    if (isVisaInitialized) {
      loadAllVisaDetails();
      if (shouldDisplaySuccessAnimation) {
        this.props.navigation.navigate('VisaSuccess');
      }
    }
  };

  componentDidMount() {
    const {deviceDetailsStore} = this.props;
    const {selectedItineraryId} = this.props.itineraries;
    deviceDetailsStore.setDeviceDetails();

    if (selectedItineraryId) {
      this.loadPostTripData();
    } else {
      this.props.yourBookingsStore
        .getUpcomingItineraries()
        .then(itinerariesArray => {
          const itineraryId: string = itinerariesArray[0].itineraryId;
          this.props.itineraries
            .selectItinerary(itineraryId)
            .then(() => {
              this.loadPostTripData();
            })
            .catch(logError);
        })
        .catch(logError);
    }

    this._willBlurSubscription = this.props.navigation.addListener(
      'willBlur',
      () => {
        BackHandler.removeEventListener(
          'hardwareBackPress',
          this.onBackButtonPressAndroid,
        );
      },
    );
  }

  loadTripFeedData = () => {
    const {generateTripFeed} = this.props.tripFeedStore;
    const {fetchFeedBackData} = this.props.feedbackPrompt;
    generateTripFeed();
    pullToRefresh({
      itinerary: true,
      voucher: true,
    });
    setTimeout(() => {
      fetchFeedBackData();
    }, 2000);
  };

  /**
   * Used to initialize fresh chat native sdk
   * This method will be executed every time the tab focus changes.
   *
   * First user details will be retrieved from an API call.
   * If chat is initialized, chat details will be available. Using the chat details,
   * corresponding fresh-chat functions will be called to perform initialization operations
   */
  loadChatData = () => {
    isUserLoggedInCallback(() => {
      const {
        getUserDetails,
        setUnreadMessageCount,
        setChatMetaInfo,
      } = this.props.chatDetailsStore;
      getUserDetails()
        .then(chatDetails => {
          initializeChat(chatDetails.appId, chatDetails.appKey);
          identifyChatUser(chatDetails.feid, chatDetails.frid || null).catch(
            () => null,
          );
          setChatUserDetails({
            firstName: chatDetails.trailId,
            lastName: chatDetails.name,
            email: chatDetails.email,
            phoneCountryCode: chatDetails.ccode,
            phone: chatDetails.mob_num,
          }).catch(() => null);
          if (!chatDetails.frid) {
            getRestoreId()
              .then(restoreId => {
                getActorId()
                  .then(actorId => {
                    setChatMetaInfo({
                      restoreId,
                      actorId,
                      anonymousId:
                        storeService.deviceDetailsStore._deviceDetails.deviceId,
                    });
                  })
                  .catch(() => null);
              })
              .catch(() => null);
          }
        })
        .catch(() => null);
      getUnreadMessagesCount()
        .then(count => {
          setUnreadMessageCount(count);
        })
        .catch(() => null);
    });
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  setEmitterComponent = emitterComponent =>
    (this._emitterComponent = emitterComponent);

  render() {
    const {
      isLoading,
      widgets,
      infoCardModal,
      closeInfoCardModal,
    } = this.props.tripFeedStore;
    const {isFeedbackPanelVisible} = this.props.feedbackPrompt;
    const {
      isOffHours,
      currentTime,
      offlineContact,
    } = this.props.chatDetailsStore;
    const openDialer = () => {
      recordEvent(constants.TripFeed.event, {
        click: constants.TripFeed.click.chatOfflineContact,
      });
      dialer(offlineContact);
    };
    let isImageFirst = false;
    return (
      <View style={styles.tripFeedContainer}>
        {this.state.tripFeedHeader}
        <NoInternetIndicator />
        
        {isOffHours ? (
          <SupportOfflineMessage time={currentTime} ctaAction={openDialer} />
        ) : null}
        <CustomScrollView
          onRefresh={this.loadTripFeedData}
          refreshing={isLoading}
          directionalLockEnabled={true}
          scrollEnabled={this.state.scrollEnabled}
          style={styles.tripFeedScrollView}>
            <Button backgroundColor='grey' text='Hotel search' onPress={()=>{
              this.props.navigation.navigate(SCREEN_STAY_SEARCH)
            }}/>
            <MiniImageSlider
	height={100}
	width={326}
	// autoplay
	images={[
    "https://s3.ap-south-1.amazonaws.com/pyt-voyager/tripfeed/handy_tools/handy-tools.png",
		"https://d2pkrotgd5anq5.cloudfront.net/city/230x270/wanaka.jpg",
    "https://s3.ap-south-1.amazonaws.com/pyt-voyager/tripfeed/handy_tools/handy-tools.png",
		"https://pyt-voyager.s3.ap-south-1.amazonaws.com/tripfeed/forex/forex-single.png",
		'https://s3.ap-south-1.amazonaws.com/oceanjar-new/images/activity/SamrohaHEROcarousal-desktop-min.jpg',
	]}
/>
{/* <Image
			source={{ image:'https://pyt-images.imgix.net/images/deals/Festival+Sale/herodesktop/festLife-2-min.png?w=566&h=438&dpr=2&auto=format,compress&q=20' }}
			width={'100%'}
			height={100}
			display={'flex'}
			flexDirection={'column'}
			justifyContent={'center'}
			alignItems={'center'}
			resizeMode={'cover'}
			backgroundColor={'#dfdfdf'}
			borderRadius={8}
			overflow={'hidden'}
		/> */}
     <AnimatedInputBox label='Check-in'/>
<HotelCard
		width={328}
		title="Eden Hotel Kuta Bali"
		strikedCost="₹15,234"
		cost="₹11,234"
		costSubText="2 nights & 2 adults"
		marginEnd={12}
    backgroundColor='#ffffff'
		amenities={[{icon:null,text:'gkfjl'},{icon:null,text:'jgj'}]}
    fontFamily={CONSTANT_fontPrimarySemiBold}
		sliderProps={{
			images: [
        'https://pyt-images.imgix.net/images/deals/Festival+Sale/herodesktop/festLife-2-min.png?w=566&h=438&dpr=2&auto=format,compress&q=20' 
			],
			showArrow: true,
		}}
		dotSeparateList={[]}
		footerRightElement={<></>}
		onCardPress={() => null}
	/>
  	<HotelCard
		width={328}
		title="Eden Hotel Kuta Bali"
		strikedCost="₹15,234"
		cost="₹11,234"
		costSubText="2 nights & 2 adults"
		marginEnd={12}
		fontFamily={CONSTANT_fontPrimarySemiBold}
		amenities={[
			{ icon: <Included fill="#777777" />, text: 'Breakfast included' },
			{ icon: <Included fill="#777777" />, text: 'Free cancellation' },
			{ icon: <Included fill="#777777" />, text: 'Free WiFi' },
		]}
		sliderProps={{
			images: [
				'https://pyt-images.imgix.net/images/deals/Festival+Sale/herodesktop/festLife-2-min.png?w=566&h=438&dpr=2&auto=format,compress&q=20' 
			],
			showArrow: true,
		}}
		dotSeparateList={[
			<Pill
				borderRadius={4}
				paddingVertical={2}
				paddingHorizontal={6}
				backgroundColor={'#E5F9F3'}
				textProps={{
					fontSize: 12,
					lineHeight: 16,
					fontWeight: '600',
					color: '#00774F',
					marginEnd: 2,
				}}
				text="4.5"
				iconPosition="right"
			/>,
			<Text fontSize={13} lineHeight={16} color={'#333333'} 	fontFamily={CONSTANT_fontPrimarySemiBold}>
				4km from city center
			</Text>,
			<Text fontSize={13} lineHeight={16} color={'#333333'} 	fontFamily={CONSTANT_fontPrimarySemiBold}>
				4-star hotel
			</Text>,
		]}
		footerRightElement={<></>}
		onCardPress={() => null}
	/>
<Ribbon text='check hello' start={0} />
<Pill icon={<Bed />}  text='pill'/>
{console.log('widgets-->',widgets)}
          {widgets.map((widget, widgetIndex) => {
            try {
              isImageFirst = !isImageFirst;
              switch (widget.type) {
                case 'TOOL_TIP':
                  return (
                    <ToolTip
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                      imageFirst={isImageFirst}
                    />
                  );
                case 'INFO_CARD':
                  return (
                    <InfoCard
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'CAROUSEL':
                  return (
                    <TripFeedCarousel
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'TRIP_VIEW':
                  return (
                    <TripView
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'TRIP_VIEW_LITE':
                  return (
                    <TripViewLite
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'BIG_IMAGE_CARD':
                  return (
                    <BigImageCard
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'ALERT_CARD':
                  return (
                    <AlertCard
                      key={widgetIndex}
                      {...widget.data}
                      toggleScrollLock={this.toggleScrollLock}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'ALERT_CARD_2':
                  return (
                    <View style={styles.tripFeedWidgetWrapper}>
                      <AlertCardV2
                        key={widgetIndex}
                        {...widget.data}
                        widgetName={widget.widgetName}
                      />
                    </View>
                  );
                case 'FEEDBACK_SWIPER':
                  return (
                    <FeedBackSwiper
                      emitterComponent={this._emitterComponent}
                      toggleScrollLock={this.toggleScrollLock}
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'DAY_AHEAD':
                  return (
                    <DayAhead
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                case 'DAY_AHEAD_LITE':
                  return (
                    <DayAheadLite
                      key={widgetIndex}
                      {...widget.data}
                      widgetName={widget.widgetName}
                    />
                  );
                default:
                  return null;
              }
            } catch (e) {
              // logError(e);
              return null;
            }
          })}
          <InfoCardModal
            isVisible={infoCardModal.isVisible}
            onClose={closeInfoCardModal}
            {...infoCardModal.modalData}
          />
        </CustomScrollView>
        <FeedBackPositiveExplosion
          emitterRef={this.setEmitterComponent}
          emitterComponent={this._emitterComponent}
        />
        {isFeedbackPanelVisible ? <FeedbackPanelOverlay /> : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tripFeedContainer: {
    flex: 1,
    backgroundColor: constants.white1,
  },
  tripFeedScrollView: {
    flex: 1,
    backgroundColor: constants.white1,
  },
  wrapper: {
    marginHorizontal: 24,
  },
  tripFeedWidgetWrapper: {
    marginTop: 8,
    backgroundColor: 'white',
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});

export default TripFeed;
