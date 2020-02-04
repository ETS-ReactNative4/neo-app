import React, { useState, Fragment, useRef, useEffect } from "react";
import { View, StyleSheet, LayoutAnimation, Platform } from "react-native";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import {
  CONSTANT_defaultPlaceImage,
  CONSTANT_loginBackground
} from "../../constants/imageAssets";
import LinearGradient from "react-native-linear-gradient";
import { CONSTANT_darkGradientAlpha } from "../../constants/colorPallete";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import { CONSTANT_fontCustom } from "../../constants/fonts";
import constants from "../../constants/constants";
import AppLoginTitle from "./Components/AppLoginTitle";
import { isIphoneX } from "react-native-iphone-x-helper";
import useKeyboard from "../../CommonComponents/useKeyboard/useKeyboard";
import { CONSTANT_xNotchHeight } from "../../constants/styles";
import PhoneNumberInput from "./Components/PhoneNumberInput";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import ActionSheet from "../../CommonComponents/ActionSheet/ActionSheet";
import Interactable from "react-native-interactable";
import OtpPanel from "./Components/OtpPanel";

const AppLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("+91");
  const [countryFlag, setCountryFlag] = useState<string>("🇮🇳");
  const [isPhoneNumberSubmitted, setPhoneNumberSubmitStatus] = useState<
    boolean
  >(false);
  const { keyboardHeight } = useKeyboard();
  const otpPanelRef = useRef(null);

  const updatePhoneNumber = (newNumber: string) => setPhoneNumber(newNumber);

  const onCountryCodeChange = (ccode: string, flagEmoji: string) => {
    setCountryCode(ccode);
    setCountryFlag(flagEmoji);
  };

  const submitPhoneNumber = () => {
    setTimeout(() => {
      setPhoneNumberSubmitStatus(true);
    }, 300);
  };

  const otpPanelClosed = () => {
    setPhoneNumberSubmitStatus(false);
  };

  const gradientOptions = {
    locations: [0.25, 0.5, 0.7, 1],
    colors: [
      CONSTANT_darkGradientAlpha(0.2),
      CONSTANT_darkGradientAlpha(0.1),
      CONSTANT_darkGradientAlpha(0.5),
      CONSTANT_darkGradientAlpha(0.9)
    ]
  };

  if (keyboardHeight) {
    gradientOptions.colors = [
      CONSTANT_darkGradientAlpha(0.4),
      CONSTANT_darkGradientAlpha(0.8),
      CONSTANT_darkGradientAlpha(0.9),
      CONSTANT_darkGradientAlpha(0.9)
    ];
  }

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  const onOtpPanelSnap = (snapEvent: Interactable.ISnapEvent) => {
    if (snapEvent.nativeEvent.index === 2) {
      otpPanelClosed();
    }
  };

  useEffect(() => {
    // @ts-ignore
    otpPanelRef.current && otpPanelRef.current.snapTo({ index: 2 });
  }, []);

  return (
    <Fragment>
      <SmartImageV2
        useFastImage={true}
        style={styles.container}
        source={{ uri: CONSTANT_loginBackground }}
        fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
        resizeMode="cover"
      >
        <LinearGradient {...gradientOptions} style={styles.backgroundGradient}>
          <AppLoginTitle
            skipAction={() => null}
            containerStyle={styles.loginTitleContainer}
          />
          <View
            style={[
              styles.loginInputContainer,
              {
                marginBottom: (Platform.OS === "ios" ? keyboardHeight : 0) + 50
              }
            ]}
          >
            <SectionTitle
              smallTitleTextStyle={styles.smallWelcomeTitle}
              titleTextStyle={styles.welcomeTitle}
              titleNumberOfLines={2}
              title="Let’s find you your next dream holiday :)"
              smallTitle="Welcome"
            />
            <PhoneNumberInput
              isLoading={true}
              placeholder="Phone Number"
              phoneNumber={phoneNumber}
              countryCode={countryCode}
              emoji={countryFlag}
              onChangeText={updatePhoneNumber}
              onCountryCodeChange={onCountryCodeChange}
              onSubmitEditing={submitPhoneNumber}
              editable={!isPhoneNumberSubmitted}
            />
            <XSensorPlaceholder />
          </View>
        </LinearGradient>
      </SmartImageV2>
      {isPhoneNumberSubmitted ? (
        <ActionSheet interactableRef={otpPanelRef} onSnap={onOtpPanelSnap}>
          <OtpPanel containerStyle={styles.otpContainer} />
        </ActionSheet>
      ) : null}
    </Fragment>
  );
};

AppLogin.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  backgroundGradient: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 24
  },
  smallWelcomeTitle: {
    color: "white",
    ...CONSTANT_fontCustom(constants.primarySemiBold, 10)
  },
  welcomeTitle: {
    color: "white",
    ...CONSTANT_fontCustom(constants.primarySemiBold, 30, 36)
  },
  loginTitleContainer: {
    marginTop: 40 + (isIphoneX() ? CONSTANT_xNotchHeight : 0)
  },
  loginInputContainer: {
    marginBottom: 80
  },
  otpContainer: {
    marginHorizontal: 24,
    marginTop: 24
  }
});

export default AppLogin;
