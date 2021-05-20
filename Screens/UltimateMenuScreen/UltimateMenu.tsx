import React, {useCallback, useRef} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {
  CONSTANT_white,
  CONSTANT_shade2,
  CONSTANT_shade5,
  CONSTANT_black1,
  CONSTANT_nineteenthColor,
  CONSTANT_whiteAlpha,
  theme,
} from '../../constants/colorPallete';
import Icon from '../../CommonComponents/Icon/Icon';
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
} from '../../constants/fonts';
import {
  CONSTANT_arrowRight,
  CONSTANT_storybookIcon,
  CONSTANT_paymentIcon,
  CONSTANT_passIcon,
  CONSTANT_profileIcon,
  CONSTANT_flagIcon,
  CONSTANT_compassIcon,
  CONSTANT_notificationBellIcon,
} from '../../constants/imageAssets';
import PrimaryButton from '../../CommonComponents/PrimaryButton/PrimaryButton';
import ProgressBar from '../../CommonComponents/ProgressBar/ProgressBar';
import ratioCalculator from '../../Services/ratioCalculator/ratioCalculator';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import {observer, inject} from 'mobx-react';
import User from '../../mobx/User';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {
  SCREEN_ULTIMATE_MENU,
  SCREEN_STORY_BOOK,
  SCREEN_TRAVELLER_PROFILE,
  SCREEN_ABOUT_SCREEN,
  SCREEN_SAVED_ITINERARIES,
  SCREEN_YOUR_BOOKINGS,
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_PAYMENT_HOME,
  SCREEN_APP_LOGIN,
  SCREEN_TRAVEL_PROFILE_WELCOME,
  SCREEN_SEARCH_TAB,
} from '../../NavigatorsV2/ScreenNames';
import {useFocusEffect} from '@react-navigation/native';
import {isProduction} from '../../Services/getEnvironmentDetails/getEnvironmentDetails';
import TranslucentStatusBar from '../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar';
import logOut from '../../Services/logOut/logOut';
import YourBookings from '../../mobx/YourBookings';
import useIsUserLoggedIn from '../../Services/isUserLoggedIn/hooks/useIsUserLoggedIn';
import WelcomeState from '../../mobx/WelcomeState';
import {ReferNowCard} from './Components/ReferNowCard';
import {MenuBanner} from './Components/MenuBanner';
import {Box} from '@pyt/micros/src/box';
import {AboutLoyaltyCoinsModal} from './Components/AboutLoyaltyCoinsModal';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';
import {
  CONSTANT_headerHeight,
  CONSTANT_xNotchHeight,
} from '../../constants/styles';
import {isIphoneX} from 'react-native-iphone-x-helper';

export interface IUltimateMenuLists {
  name: string;
  iconName: string;
  active: boolean;
  action: () => any;
}

type UltimateMenuNavType = AppNavigatorProps<typeof SCREEN_ULTIMATE_MENU>;

export interface UltimateMenuProps extends UltimateMenuNavType {
  enableLogin?: boolean;
  userStore: User;
  yourBookingsStore: YourBookings;
  welcomeStateStore: WelcomeState;
}
const HEADER_HEIGHT =
  CONSTANT_headerHeight + (isIphoneX() ? CONSTANT_xNotchHeight : 0);
const HEADER_CONTAINER_WIDTH = responsiveWidth(100);
const HEADER_CONTAINER_HEIGHT =
  ratioCalculator(5, 3, HEADER_CONTAINER_WIDTH) - HEADER_HEIGHT;

const UltimateMenu = ({
  navigation,
  userStore,
  yourBookingsStore,
  welcomeStateStore,
}: UltimateMenuProps) => {
  const {userDisplayDetails, getUserDisplayDetails} = userStore;
  const {completionPercentage} = welcomeStateStore;
  const menuList: IUltimateMenuLists[] = [
    {
      name: 'Craft your holiday',
      iconName: CONSTANT_compassIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_PRETRIP_HOME_TABS),
    },
    {
      name: 'Saved itineraries',
      iconName: 'heart1',
      active: false,
      action: () => navigation.navigate(SCREEN_SAVED_ITINERARIES),
    },
    {
      name: 'My profile',
      iconName: CONSTANT_profileIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_TRAVELLER_PROFILE),
    },
    {
      name: 'About us',
      iconName: CONSTANT_flagIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_ABOUT_SCREEN),
    },
  ];

  if (!isProduction()) {
    menuList.push({
      name: 'StoryBook',
      iconName: CONSTANT_storybookIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_STORY_BOOK),
    });
  }

  if (yourBookingsStore.hasUpcomingItineraries) {
    menuList.unshift({
      name: 'Payments',
      iconName: CONSTANT_paymentIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_PAYMENT_HOME),
    });

    menuList.unshift({
      name: 'My trip feed',
      iconName: CONSTANT_passIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_YOUR_BOOKINGS),
    });
  }

  const goBack = () => navigation.goBack();
  const goToSearchScreen = () => navigation.navigate(SCREEN_SEARCH_TAB);

  const login = () => {
    navigation.navigate(SCREEN_APP_LOGIN);
  };

  const logout = () => {
    logOut();
  };

  useFocusEffect(
    useCallback(() => {
      getUserDisplayDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const isLoggedIn = useIsUserLoggedIn();

  const editProfile = () => {
    navigation.navigate(SCREEN_TRAVEL_PROFILE_WELCOME);
  };
  const header = useRef(
    PrimaryHeader({
      leftAction: goBack,
      rightElement: (
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.notificationIconStyle}
          onPress={goToSearchScreen}>
          <Icon name={CONSTANT_notificationBellIcon} size={18} />
        </TouchableOpacity>
      ),
      containerStyle: {backgroundColor: 'red'},
    }),
  ).current;

  return (
    <View style={styles.ultimateMenuContainerStyle}>
      <TranslucentStatusBar />
      {/* {header} */}
      <Box
        height={HEADER_HEIGHT}
        justifyContent="flex-end"
        paddingBottom={20}
        backgroundColor="#E8EAF3">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={goBack}
            style={styles.backArrowIconStyle}>
            <Icon
              name={CONSTANT_arrowRight}
              size={16}
              color={theme.colors.neutral008}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={goToSearchScreen}
            style={styles.backArrowIconStyle}>
            <Icon
              name={CONSTANT_notificationBellIcon}
              size={16}
              color={theme.colors.neutral008}
            />
          </TouchableOpacity>
        </Box>
      </Box>
      <View style={styles.headerContainer}>
        <View>
          {/* <Text style={styles.nameTextStyle}>
            {isLoggedIn ? userDisplayDetails.name : 'Guest User'}
          </Text>

          {isLoggedIn && userDisplayDetails.email ? (
            <Text style={styles.emailTextStyle}>
              {userDisplayDetails.email}
            </Text>
          ) : null}

          {!isLoggedIn ? (
            <Text style={styles.emailTextStyle} onPress={login}>
              Log in / Sign up
            </Text>
          ) : (
            <Text style={styles.emailTextStyle} onPress={logout}>
              Log out
            </Text>
          )}

          <View style={styles.completePreferenceWrapper}>
            <ProgressBar progress={completionPercentage} />

            <PrimaryButton
              text={
                completionPercentage === 100
                  ? 'Edit preferences'
                  : 'Complete preferences'
              }
              clickAction={editProfile}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
            />
          </View>*/}
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <Box marginTop={'-35%'}>
          <MenuBanner />
        </Box>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ReferNowCard />
          {menuList.map((item, itemIndex) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={item.action}
                style={styles.menuListStyle}
                key={itemIndex}>
                <View style={styles.leftColStyle}>
                  <Icon
                    name={item.iconName}
                    size={20}
                    color={
                      item.active ? CONSTANT_nineteenthColor : CONSTANT_shade2
                    }
                  />
                </View>

                <View style={styles.rightColStyle}>
                  <Text
                    style={[
                      styles.menuListTextStyle,
                      item.active ? styles.activeTextColor : null,
                    ]}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ultimateMenuContainerStyle: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#E8EAF3',
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    paddingTop: 48,
    paddingLeft: 8,
    paddingRight: 24,
    width: HEADER_CONTAINER_WIDTH,
    height: HEADER_CONTAINER_HEIGHT,
    position: 'relative',
  },
  headerRightColumn: {
    // flex: 1,
    // justifyContent: 'center',
    // flexDirection: 'column'
    position: 'relative',
    top: '20%',
    width: '100%',
    left: '-6%',
    // marginHorizontal: 18
    // left: '8%'
  },
  backArrowIconStyle: {
    // marginTop: -1,
    // width: 40,
    // height: 40,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
    display: 'flex',
    alignSelf: 'flex-start',
    transform: [{scaleX: -1}],
    marginHorizontal: 20,
  },
  nameTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20),
    marginBottom: 6,
  },
  emailTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14),
    marginBottom: 24,
  },
  completePreferenceWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonStyle: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: CONSTANT_whiteAlpha(0.3),
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    // borderTopLeftRadius: 14,
    // borderTopRightRadius: 14,
    marginTop: 24,
    paddingHorizontal: 20,
  },
  menuListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 32,
  },
  leftColStyle: {
    marginTop: -4,
    marginRight: 24,
  },
  rightColStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5,
    minHeight: 72,
  },
  menuListTextStyle: {
    flex: 1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 20),
    color: CONSTANT_black1,
  },
  activeTextColor: {
    color: CONSTANT_nineteenthColor,
  },
});

export default ErrorBoundary()(
  inject('welcomeStateStore')(
    inject('yourBookingsStore')(inject('userStore')(observer(UltimateMenu))),
  ),
);
