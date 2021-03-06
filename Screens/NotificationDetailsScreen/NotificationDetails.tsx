import React, {useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Platform} from 'react-native';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {
  SCREEN_NOTIFICATION_DETAILS,
  SCREEN_NOTIFICATION_FAQ,
  SCREEN_ITINERARY,
} from '../../NavigatorsV2/ScreenNames';
import {
  CONSTANT_firstColor,
  CONSTANT_white,
} from '../../constants/colorPallete';
import ItineraryTimeline from '../NotificationsScreen/Components/ItineraryTimeline/ItineraryTimeline';
import ParallaxScrollView, {
  PARALLAX_BANNER_HEIGHT,
  BLUR_HEADER_HEIGHT,
} from '../../CommonComponents/ParallaxScrollView/ParallaxScrollView';
import ItineraryDetail from '../NotificationsScreen/Components/ItineraryDetail/ItineraryDetail';
import BlankSpacer from '../../CommonComponents/BlankSpacer/BlankSpacer';
import {
  CONSTANT_callStartIcon,
  CONSTANT_visaSuccessAnimation,
} from '../../constants/imageAssets';
import BottomButtonBar, {
  BOTTOM_BUTTON_CONTAINER_HEIGHT,
} from '../../CommonComponents/BottomButtonBar/BottomButtonBar';
import Icon from '../../CommonComponents/Icon/Icon';
import TranslucentStatusBar from '../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar';
import useNotificationDetailsApi from './hooks/useNotificationDetailsApi';
import {observer} from 'mobx-react';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import useUnbookedItinerary from '../ItineraryScreen/hooks/useUnbookedItinerary';
import {IItineraryServerResponse} from '../ItineraryScreen/Itinerary';
import apiCall from '../../Services/networkRequests/apiCall';
import {
  CONSTANT_itineraryDetails,
  CONSTANT_notificationRead,
} from '../../constants/apiUrls';
import {
  CONSTANT_responseSuccessStatus,
  CONSTANT_platformAndroid,
} from '../../constants/stringConstants';
import {toastBottom} from '../../Services/toast/toast';
import {
  CONSTANT_GCMDateFormat,
  CONSTANT_shortTimeFormat,
} from '../../constants/styles';
import moment from 'moment';
import LottieView from 'lottie-react-native';
import dialer from '../../Services/dialer/dialer';
import useItineraryCosting from '../ItineraryScreen/hooks/useItineraryCosting';

type NotificationDetailsNavTypes = AppNavigatorProps<
  typeof SCREEN_NOTIFICATION_DETAILS
>;

export interface NotificationDetailsProps extends NotificationDetailsNavTypes {}

const NotificationDetails = ({route, navigation}: NotificationDetailsProps) => {
  const notification = route.params || {};
  const [
    notificationDetailsApi,
    getNotificationDetails,
  ] = useNotificationDetailsApi();

  const [displayCurrency, setDisplayCurrency] = useState('INR');

  // @ts-ignore - handle null initialization
  const itineraryDetails = useUnbookedItinerary(null);

  const goBack = () => {
    navigation.goBack();
  };

  const {isCosting, updateItineraryCost} = useItineraryCosting();

  const updateCost = () => {
    if (itineraryDetails.costingConfig) {
      updateItineraryCost(notification.itineraryId, {
        costingConfig: itineraryDetails.costingConfig,
        flightsBookedByUserAlready: false,
        itineraryId: '',
        costingType: 'RECOST',
        name: '',
        leadSource: {
          deviceType:
            Platform.OS === CONSTANT_platformAndroid ? 'Android OS' : 'iOS',
        },
      })
        .then(result => {
          if (result) {
            loadItinerary();
            getNotificationDetails(notification.itineraryId);
          } else {
            toastBottom('Unable to fetch updated cost!');
          }
        })
        .catch(() => {
          toastBottom('Unable to fetch updated cost!');
        });
    }
  };

  const loadItinerary = () => {
    apiCall(
      CONSTANT_itineraryDetails.replace(
        ':itineraryId',
        notification.itineraryId,
      ),
      {},
      'GET',
    )
      .then((response: IItineraryServerResponse) => {
        if (response.status === CONSTANT_responseSuccessStatus) {
          itineraryDetails.updateItinerary(response.data);
          setDisplayCurrency(response.displayCurrency || '');
        } else {
          toastBottom('Unable to retrieve Itinerary info');
          navigation.goBack();
        }
      })
      .catch(() => {
        toastBottom('Unable to retrieve Itinerary info');
        navigation.goBack();
      });
  };

  const markNotificationRead = () => {
    apiCall(
      `${CONSTANT_notificationRead}?itineraryId=${notification.itineraryId}`,
      {},
      'PATCH',
    )
      .then(() => null)
      .catch(() => null);
  };

  useEffect(() => {
    getNotificationDetails(notification.itineraryId);
    loadItinerary();
    markNotificationRead();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {costingConfig, itineraryMeta, _selectedItinerary} = itineraryDetails;
  const {allHotelCostingRefs = [], hotelCostings = {}, cityById = {}} =
    _selectedItinerary || {};

  let adultCount = notification.noOfAdults;
  let children = notification.noOfChildren;
  let numOfRooms = 0;
  let travelType = '';
  let totalCost: number | string = notification.totalCost || '';
  let staleCost = false;

  if (costingConfig) {
    const {hotelGuestRoomConfigurations} = costingConfig;

    adultCount = hotelGuestRoomConfigurations.reduce((acc, room) => {
      return acc + room.adultCount;
    }, 0);

    children = hotelGuestRoomConfigurations.reduce((acc, room) => {
      return acc + (room.childAges ? room.childAges.length : 0);
    }, 0);

    travelType = costingConfig.tripType;
  }

  if (itineraryMeta) {
    totalCost =
      (itineraryMeta.discountedPrice ? itineraryMeta.discountedPrice : '') ||
      itineraryMeta.totalCost;

    staleCost = itineraryMeta.staleCost;
  }

  if (isCosting) {
    // Itinerary is costing
    return (
      <View style={styles.loadingIndicatorContainer}>
        <LottieView source={CONSTANT_visaSuccessAnimation()} autoPlay loop />
      </View>
    );
  }

  if (!itineraryDetails.isItineraryLoaded) {
    // Itinerary is loading
    return (
      <View style={styles.loadingIndicatorContainer}>
        <LottieView source={CONSTANT_visaSuccessAnimation()} autoPlay loop />
      </View>
    );
  }
  const {image, additionalData = {}} = notification || {};
  let bannerImage = typeof image === 'object' ? image?.uri : image;
  if (!bannerImage) {
    allHotelCostingRefs?.some((cityRef: string) => {
      if (hotelCostings.costingById) {
        const cityId = hotelCostings.costingById[cityRef].cityId;
        bannerImage = cityById[cityId].image;
        return true;
      }
    });
  }
  const title = notification.title || itineraryMeta?.specialTitle || '';
  return (
    <View style={styles.tripDetailsContainer}>
      <TranslucentStatusBar />
      <ParallaxScrollView
        bannerImage={bannerImage}
        backAction={goBack}
        smallText={notification.lastEdited || additionalData.createdDate}
        titleText={`${title.slice(0, 42)}${title.length >= 42 ? '...' : ''}`}
        enableGradient>
        <View style={styles.detailsContainer}>
          <ItineraryDetail
            updateCost={updateCost}
            departingFrom={
              notification.departureCity || additionalData.departureCity
            }
            departureDate={
              moment
                .utc(notification.departureDateMillis)
                .format(CONSTANT_GCMDateFormat) || additionalData.departureDate
            }
            adults={adultCount}
            children={children}
            numOfRooms={numOfRooms}
            costedDate={moment
              .utc(notification.costedDateMillis)
              .format(CONSTANT_GCMDateFormat)}
            costedTime={moment
              .utc(notification.costedDateMillis)
              .format(CONSTANT_shortTimeFormat)}
            totalCost={totalCost}
            travellingAs={travelType}
            staleCost={staleCost}
            displayCurrency={displayCurrency}
          />
          {notificationDetailsApi.isSuccess ? (
            <ItineraryTimeline
              notifData={notificationDetailsApi.successResponseData?.data || []}
            />
          ) : null}
          <BlankSpacer
            height={
              BOTTOM_BUTTON_CONTAINER_HEIGHT +
              PARALLAX_BANNER_HEIGHT -
              BLUR_HEADER_HEIGHT
            }
          />
        </View>
      </ParallaxScrollView>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => dialer(notification.travelConsultantNumber)}
        style={styles.phoneIcon}>
        <Icon name={CONSTANT_callStartIcon} size={32} color={CONSTANT_white} />
      </TouchableOpacity>

      <BottomButtonBar
        leftButtonName={'Support'}
        leftButtonAction={() =>
          navigation.navigate(SCREEN_NOTIFICATION_FAQ, {
            itineraryId: notification.itineraryId,
            isDomestic: !!notification.citiesArr?.find(
              city => city.countryName === 'India',
            ),
          })
        }
        rightButtonName={'View itinerary'}
        rightButtonAction={() =>
          navigation.navigate(SCREEN_ITINERARY, {
            itineraryId: notification.itineraryId,
            itinerarySource: SCREEN_NOTIFICATION_DETAILS,
          })
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tripDetailsContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
  },
  detailsContainer: {
    padding: 24,
  },
  phoneIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 16,
    bottom: BOTTOM_BUTTON_CONTAINER_HEIGHT + 16,
    width: 62,
    height: 62,
    borderRadius: 50,
    backgroundColor: CONSTANT_firstColor,
  },
  loadingIndicatorContainer: {
    flex: 1,
  },
});

export default ErrorBoundary()(observer(NotificationDetails));
