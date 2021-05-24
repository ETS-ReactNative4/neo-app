import React, {useCallback} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import {
  CONSTANT_white,
  CONSTANT_shade2,
  CONSTANT_black1,
  CONSTANT_nineteenthColor,
  theme,
} from '../../constants/colorPallete';
import Icon from '../../CommonComponents/Icon/Icon';
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom,
  CONSTANT_fontPrimarySemiBold,
} from '../../constants/fonts';
import {
  CONSTANT_arrowRight,
  CONSTANT_storybookIcon,
  CONSTANT_paymentIcon,
  CONSTANT_passIcon,
  CONSTANT_profileIcon,
  CONSTANT_flagIcon,
  CONSTANT_compassIcon,
} from '../../constants/imageAssets';
import ErrorBoundary from '../../CommonComponents/ErrorBoundary/ErrorBoundary';
import {observer, inject} from 'mobx-react';
import User from '../../mobx/User';
import {AppNavigatorProps} from '../../NavigatorsV2/AppNavigator';
import {
  SCREEN_ULTIMATE_MENU,
  SCREEN_STORY_BOOK,
  SCREEN_ABOUT_SCREEN,
  SCREEN_SAVED_ITINERARIES,
  SCREEN_YOUR_BOOKINGS,
  SCREEN_PRETRIP_HOME_TABS,
  SCREEN_PAYMENT_HOME,
  SCREEN_APP_LOGIN,
  SCREEN_EDIT_TRAVELLER_PROFILE,
} from '../../NavigatorsV2/ScreenNames';
import {useFocusEffect} from '@react-navigation/native';
import {isProduction} from '../../Services/getEnvironmentDetails/getEnvironmentDetails';
import logOut from '../../Services/logOut/logOut';
import YourBookings from '../../mobx/YourBookings';
import useIsUserLoggedIn from '../../Services/isUserLoggedIn/hooks/useIsUserLoggedIn';
import WelcomeState from '../../mobx/WelcomeState';
import {ReferNowCard} from './Components/ReferNowCard';
import {MenuBanner} from './Components/MenuBanner';
import {Box} from '@pyt/micros/src/box';
import {
  CONSTANT_headerHeight,
  CONSTANT_xNotchHeight,
} from '../../constants/styles';
import {isIphoneX} from 'react-native-iphone-x-helper';
import {Text} from '@pyt/micros';
import DeviceLocale from '../../mobx/DeviceLocale';
import LoyaltyCoins from '../../mobx/LoyaltyCoins';
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
  loyaltyCoinsStore: LoyaltyCoins;
  deviceLocaleStore: DeviceLocale;
}
const HEADER_HEIGHT =
  CONSTANT_headerHeight + (isIphoneX() ? CONSTANT_xNotchHeight : 0);

const UltimateMenu = ({
  navigation,
  userStore,
  yourBookingsStore,
  loyaltyCoinsStore,
  deviceLocaleStore,
}: UltimateMenuProps) => {
  const {userDisplayDetails, getUserDisplayDetails} = userStore;

  const {loyaltyCoins, getLoyaltyCoins} = loyaltyCoinsStore;

  const isLoggedIn = useIsUserLoggedIn();

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
      name: 'About us',
      iconName: CONSTANT_flagIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_ABOUT_SCREEN),
    },
  ];
  if (isLoggedIn) {
    menuList.splice(2, 0, {
      name: 'Account details',
      iconName: CONSTANT_profileIcon,
      active: false,
      action: () => navigation.navigate(SCREEN_EDIT_TRAVELLER_PROFILE),
    });
  }

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

  const login = () => {
    navigation.navigate(SCREEN_APP_LOGIN);
  };

  const logout = () => {
    logOut();
  };

  useFocusEffect(
    useCallback(() => {
      getUserDisplayDetails();
      if (Object.keys(loyaltyCoins || {}).length && userDisplayDetails) {
        getLoyaltyCoins(userDisplayDetails.userId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const isGlobal = deviceLocaleStore.deviceLocale !== 'in';

  return (
    <View style={styles.ultimateMenuContainerStyle}>
      <Box
        height={HEADER_HEIGHT}
        justifyContent="flex-end"
        paddingBottom={12}
        backgroundColor={theme.colors.neutral001}>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          paddingHorizontal={20}>
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
          <Text
            flex={1}
            paddingLeft={18}
            fontFamily={CONSTANT_fontPrimarySemiBold}
            fontSize={15}
            // lineHeight={19}
            color={CONSTANT_black1}>
            {isGlobal
              ? isLoggedIn
                ? userDisplayDetails.name?.toUpperCase()
                : 'Guest User'
              : null}
          </Text>
          <TouchableOpacity onPress={isLoggedIn ? logout : login}>
            <Text
              color={theme.colors.primary003}
              fontFamily={CONSTANT_fontPrimarySemiBold}
              fontSize={15}>
              {isLoggedIn ? 'Log out' : 'Log in'}
            </Text>
          </TouchableOpacity>
        </Box>
      </Box>

      <View style={styles.bodyContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {!isGlobal ? (
            <>
              <MenuBanner
                userId={userDisplayDetails.userId}
                name={userDisplayDetails.name || 'Guest User'}
                loyaltyCoinsStore={loyaltyCoinsStore}
              />
              {loyaltyCoins.referralCode ? (
                <ReferNowCard referralCode={loyaltyCoins.referralCode} />
              ) : null}
            </>
          ) : null}
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
  backArrowIconStyle: {
    display: 'flex',
    transform: [{scaleX: -1}],
    marginBottom: 1,
    marginRight: 4,
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    paddingHorizontal: 20,
  },
  menuListStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftColStyle: {
    marginTop: -4,
    marginRight: 18,
  },
  rightColStyle: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 20,
    minHeight: 62,
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
  inject('yourBookingsStore')(
    inject('userStore')(
      inject('deviceLocaleStore')(
        inject('loyaltyCoinsStore')(observer(UltimateMenu)),
      ),
    ),
  ),
);
