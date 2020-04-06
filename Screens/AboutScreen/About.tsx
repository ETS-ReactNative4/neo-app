import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import Icon from "../../CommonComponents/Icon/Icon";
import DeviceInfo from "react-native-device-info";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";
import { CONSTANT_aboutUsText } from "../../constants/appText";
import {
  CONSTANT_rocketIcon,
  CONSTANT_exceptionIcon,
  CONSTANT_privacyIcon,
  CONSTANT_cancellationIcon,
  CONSTANT_careersIcon,
  CONSTANT_pytLogoNew
} from "../../constants/imageAssets";
import { CONSTANT_productUrl } from "../../constants/serverUrls";
import {
  CONSTANT_aboutUs,
  CONSTANT_termsAndConditions,
  CONSTANT_privacyPolicy,
  CONSTANT_cancellationPolicy,
  CONSTANT_careers
} from "../../constants/stringConstants";
import {
  CONSTANT_black2,
  CONSTANT_shade2,
  CONSTANT_shade1,
  CONSTANT_black1,
  CONSTANT_shade4
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryLight,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_ABOUT_SCREEN } from "../../NavigatorsV2/ScreenNames";
import PrimaryHeader from "../../NavigatorsV2/Components/PrimaryHeader";

const appVersionText =
  CONSTANT_aboutUsText.versionText + DeviceInfo.getVersion();

export interface IAboutData {
  icon: string;
  text: string;
  action: () => any;
}

const data: IAboutData[] = [
  {
    icon: CONSTANT_rocketIcon,
    text: "About us",
    action: () => {
      openCustomTab(`${CONSTANT_productUrl}${CONSTANT_aboutUs}`);
    }
  },
  {
    icon: CONSTANT_exceptionIcon,
    text: "Terms & conditions",
    action: () => {
      openCustomTab(`${CONSTANT_productUrl}${CONSTANT_termsAndConditions}`);
    }
  },
  {
    icon: CONSTANT_privacyIcon,
    text: "Privacy Policy",
    action: () => {
      openCustomTab(`${CONSTANT_productUrl}${CONSTANT_privacyPolicy}`);
    }
  },
  {
    icon: CONSTANT_cancellationIcon,
    text: "Cancellation Policy",
    action: () => {
      openCustomTab(`${CONSTANT_productUrl}${CONSTANT_cancellationPolicy}`);
    }
  },
  {
    icon: CONSTANT_careersIcon,
    text: "Careers at Pickyourtrail",
    action: () => {
      openCustomTab(`${CONSTANT_productUrl}${CONSTANT_careers}`);
    }
  }
];

export interface AboutRowProps {
  data: IAboutData;
  i: number;
}

const Row = ({ data: rowData, i }: AboutRowProps) => {
  const borderTopWidth = !i ? 1 : 0;

  return (
    <TouchableOpacity
      style={[
        styles.rowContainer,
        {
          borderTopWidth
        }
      ]}
      onPress={rowData.action}
    >
      <View style={styles.row}>
        <View style={styles.iconContainer}>
          <Icon name={rowData.icon} size={24} color={CONSTANT_black2} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textStyle}>{rowData.text}</Text>
        </View>
        <View style={styles.arrowContainer}>
          <Icon name="arrow-right" size={17} color={CONSTANT_shade2} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

type AboutNavType = AppNavigatorProps<typeof SCREEN_ABOUT_SCREEN>;

export interface AboutProps extends AboutNavType {}

const About = ({ navigation }: AboutProps) => {
  useEffect(() => {
    navigation.setOptions({
      header: () =>
        PrimaryHeader({
          leftAction: () => navigation.goBack(),
          headerText: "My Traveller Profile"
        })
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.aboutContainer}>
      <View style={styles.logoContainer}>
        <Image
          source={CONSTANT_pytLogoNew}
          resizeMode={"contain"}
          style={styles.logo}
        />
      </View>
      <Text style={styles.contentStyle}>{CONSTANT_aboutUsText.content}</Text>
      <View style={styles.appVersionContainer}>
        <Text style={styles.appVersionText}>{appVersionText}</Text>
      </View>
      {data.map((item, i) => (
        <Row key={item.text} i={i} data={item} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  aboutContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 24
  },
  logoContainer: {
    alignItems: "center",
    paddingVertical: 24
  },
  logo: {
    height: 62,
    width: 200
  },
  contentStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryLight, 15),
    color: CONSTANT_shade1,
    textAlign: "center"
  },
  appVersionContainer: {
    alignItems: "center",
    paddingVertical: 24
  },
  appVersionText: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15),
    color: CONSTANT_black1
  },
  row: {
    flexDirection: "row",
    paddingVertical: 12
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  textContainer: {
    marginLeft: 8,
    alignItems: "center",
    justifyContent: "center"
  },
  textStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 17, 20),
    color: CONSTANT_black2
  },
  arrowContainer: {
    position: "absolute",
    right: 4,
    marginTop: 16
  },
  rowContainer: {
    borderColor: CONSTANT_shade4,
    borderBottomWidth: 1
  }
});

export default ErrorBoundary()(About);
