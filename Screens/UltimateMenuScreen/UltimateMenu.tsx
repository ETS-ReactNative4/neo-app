import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Text,
  ScrollView
} from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import {
  CONSTANT_white,
  CONSTANT_shade2,
  CONSTANT_shade5,
  CONSTANT_black1,
  CONSTANT_nineteenthColor,
  CONSTANT_whiteAlpha
} from "../../constants/colorPallete";
import Icon from "../../CommonComponents/Icon/Icon";
import {
  CONSTANT_primaryRegular,
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../constants/fonts";
import { CONSTANT_arrowRight } from "../../constants/imageAssets";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import ProgressBar from "../../CommonComponents/ProgressBar/ProgressBar";
import ratioCalculator from "../../Services/ratioCalculator/ratioCalculator";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { observer, inject } from "mobx-react";
import User from "../../mobx/User";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_ULTIMATE_MENU } from "../../NavigatorsV2/ScreenNames";
import { useFocusEffect } from "@react-navigation/native";
import isUserLoggedIn from "../../Services/isUserLoggedIn/isUserLoggedIn";

export interface IUltimateMenuLists {
  name: string;
  iconName: string;
  active: boolean;
  action: () => any;
}

type UltimateMenuNavType = AppNavigatorProps<typeof SCREEN_ULTIMATE_MENU>;

export interface UltimateMenuProps extends UltimateMenuNavType {
  containerStyle?: ViewStyle;
  buttonName: string;
  buttonAction: () => void;
  enableLogin?: boolean;
  userStore: User;
}

const HEADER_CONTAINER_WIDTH = responsiveWidth(100);
const HEADER_CONTAINER_HEIGHT = ratioCalculator(5, 3, HEADER_CONTAINER_WIDTH);

const UltimateMenu = ({
  containerStyle,
  buttonName = "",
  buttonAction = () => {},
  navigation,
  userStore
}: UltimateMenuProps) => {
  const { userDetails, getUserDetails } = userStore;

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const menuList: IUltimateMenuLists[] = [
    {
      name: "Explore trips",
      iconName: "heart1",
      active: false,
      action: () => null
    },
    {
      name: "My Saved Itineraries",
      iconName: "heart1",
      active: false,
      action: () => null
    },
    {
      name: "My Traveller Profile",
      iconName: "heart1",
      active: false,
      action: () => null
    },
    {
      name: "About",
      iconName: "heart1",
      active: false,
      action: () => null
    }
  ];

  const goBack = () => navigation.goBack();

  const login = () => {};

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      isUserLoggedIn()
        .then(result => {
          setIsLoggedIn(result);
        })
        .catch(() => {
          setIsLoggedIn(false);
        });
    }, [setIsLoggedIn])
  );

  return (
    <View style={[styles.ultimateMenuContainerStyle, containerStyle]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={goBack}
          style={styles.backArrowIconStyle}
        >
          <Icon name={CONSTANT_arrowRight} size={16} color={CONSTANT_white} />
        </TouchableOpacity>

        <View style={styles.headerRightColumn}>
          <Text style={styles.nameTextStyle}>{userDetails.name}</Text>

          {userDetails.email ? (
            <Text style={styles.emailTextStyle}>{userDetails.email}</Text>
          ) : null}

          {!isLoggedIn ? (
            <Text style={styles.emailTextStyle} onPress={login}>
              Log-in / Sign-up
            </Text>
          ) : null}

          <View style={styles.completePreferenceWrapper}>
            <ProgressBar />

            <PrimaryButton
              text={buttonName}
              clickAction={buttonAction}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
            />
          </View>
        </View>
      </View>

      <View style={styles.bodyContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {menuList.map((item, itemIndex) => {
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={item.action}
                style={styles.menuListStyle}
                key={itemIndex}
              >
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
                      item.active ? styles.activeTextColor : null
                    ]}
                  >
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
    flex: 1
  },
  headerContainer: {
    backgroundColor: CONSTANT_nineteenthColor,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingTop: 48,
    paddingLeft: 8,
    paddingRight: 24,
    width: HEADER_CONTAINER_WIDTH,
    height: HEADER_CONTAINER_HEIGHT
  },
  headerRightColumn: {
    flex: 1
  },
  backArrowIconStyle: {
    marginTop: -1,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "flex-start",
    transform: [{ scaleX: -1 }]
  },
  nameTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20),
    marginBottom: 6
  },
  emailTextStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14),
    marginBottom: 24
  },
  completePreferenceWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  buttonStyle: {
    height: 36,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: CONSTANT_whiteAlpha(0.3)
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12)
  },

  bodyContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    marginTop: -24
  },
  menuListStyle: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 32
  },
  leftColStyle: {
    marginTop: -4,
    marginRight: 24
  },
  rightColStyle: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5,
    minHeight: 72
  },
  menuListTextStyle: {
    flex: 1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 20),
    color: CONSTANT_black1
  },
  activeTextColor: {
    color: CONSTANT_nineteenthColor
  }
});

export default ErrorBoundary()(inject("userStore")(observer(UltimateMenu)));
