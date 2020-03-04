import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
  ScrollView
} from "react-native";
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

export interface IUltimateMenuLists {
  name: string;
  iconName: string;
  active: boolean;
}

interface UltimateMenuProps {
  containerStyle?: ViewStyle;
  buttonName: string;
  buttonAction: () => void;
  userName: string;
  userEmailId?: string;
  enableLogin?: boolean;
  loginAction?: () => void;
  menuList: IUltimateMenuLists[];
}

const UltimateMenu = ({
  containerStyle,
  buttonName = "",
  buttonAction = () => {},
  userName = "",
  userEmailId = "",
  enableLogin = false,
  loginAction = () => {},
  menuList = []
}: UltimateMenuProps) => {
  return (
    <View style={[styles.ultimateMenuContainerStyle, containerStyle]}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => Alert.alert(`Click Back Arrow`)}
          style={styles.backArrowIconStyle}
        >
          <Icon name={CONSTANT_arrowRight} size={16} color={CONSTANT_white} />
        </TouchableOpacity>

        <View style={styles.headerRightColumn}>
          <Text style={styles.nameTextStyle}>{userName}</Text>

          {userEmailId ? (
            <Text style={styles.emailTextStyle}>{userEmailId}</Text>
          ) : null}

          {enableLogin ? (
            <Text style={styles.emailTextStyle} onPress={loginAction}>
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
                onPress={() => Alert.alert(`Click -> ${item.name}`)}
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
    height: 216
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

export default UltimateMenu;
