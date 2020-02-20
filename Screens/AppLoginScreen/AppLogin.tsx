import React, { useState, Fragment, useRef, useEffect } from "react";
import { View, StyleSheet, LayoutAnimation, Platform } from "react-native";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import {
  CONSTANT_defaultPlaceImage,
  CONSTANT_loginBackground
} from "../../constants/imageAssets";
import LinearGradient from "react-native-linear-gradient";
import { CONSTANT_darkGradientAlpha } from "../../constants/colorPallete";
import { CONSTANT_splashBackgroundVideo } from "../../constants/imageAssets";
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
import { CONSTANT_platformIos } from "../../constants/stringConstants";
import useMobileNumberApi from "../MobileNumberScreen/hooks/useMobileNumberApi";
import { validateLoginMobileNumber } from "../../Services/validateMobileNumber/validateMobileNumber";
import DismissKeyboardView from "../../CommonComponents/DismissKeyboardView/DismissKeyboardView";
import { toastCenter } from "../../Services/toast/toast";
import moment from "moment";
import Video from "react-native-video";
import {
  responsiveHeight,
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import useLoginForm from "./hooks/useLoginForm";
import { SCREEN_APP_LOGIN } from "../../NavigatorsV2/ScreenNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";

type screenName = typeof SCREEN_APP_LOGIN;

export type StarterScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamsType,
  screenName
>;

export interface IAppLoginProps {
  navigation: StarterScreenNavigationProp;
}

const AppLogin = ({ navigation }: IAppLoginProps) => {
  const [isVideoReady, setVideoStatus] = useState(false);
  const [
    { phoneNumber, countryCode, countryFlag, code },
    { updatePhoneNumber, updateCountryCode, updateCountryFlag, updateCode }
  ] = useLoginForm();
  const [isPhoneNumberSubmitted, setPhoneNumberSubmitStatus] = useState<
    boolean
  >(false);
  const { keyboardHeight } = useKeyboard();
  const otpPanelRef = useRef(null);
  const [mobileNumberApiDetails, mobileNumberSubmitCall] = useMobileNumberApi();
  const [isPhoneSubmitAttempted, setPhoneSubmitAttempt] = useState<boolean>(
    false
  );
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);

  const mobileNumber = `${countryCode}${phoneNumber}`;

  const onCountryCodeChange = (ccode: string, flagEmoji: string) => {
    updateCountryCode(ccode);
    updateCountryFlag(flagEmoji);
  };

  const onResend = () => {};

  const codeFilled = () => {};

  const onTimeout = () => setIsTimedOut(true);

  const submitPhoneNumber = async () => {
    setPhoneSubmitAttempt(true);
    if (validateLoginMobileNumber(mobileNumber)) {
      const result = await mobileNumberSubmitCall({
        mob_num: phoneNumber,
        ccode: countryCode
      });
      if (result) {
        setPhoneNumberSubmitStatus(true);
        // @ts-ignore
        otpPanelRef.current && otpPanelRef.current.snapTo({ index: 1 });
      }
    } else {
      toastCenter("Invalid Phone Number");
    }
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

  if (Platform.OS === CONSTANT_platformIos) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }

  const onOtpPanelSnap = (snapEvent: Interactable.ISnapEvent) => {
    if (snapEvent.nativeEvent.index === 2) {
      otpPanelClosed();
    }
  };

  const highlightPhoneField =
    !validateLoginMobileNumber(mobileNumber) && isPhoneSubmitAttempted;

  const onVideoLoaded = () => setVideoStatus(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <DismissKeyboardView style={styles.keyboardAvoider}>
        <Video
          onLoad={onVideoLoaded}
          repeat={true}
          style={styles.videoView}
          source={CONSTANT_splashBackgroundVideo()}
          resizeMode="cover"
        />
        {!isVideoReady ? (
          <SmartImageV2
            useFastImage={true}
            style={styles.imageContainer}
            source={CONSTANT_loginBackground()}
            fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
            resizeMode="cover"
          />
        ) : null}
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
              isLoading={mobileNumberApiDetails.isLoading}
              placeholder="Phone Number"
              phoneNumber={phoneNumber}
              countryCode={countryCode}
              emoji={countryFlag}
              onChangeText={updatePhoneNumber}
              onCountryCodeChange={onCountryCodeChange}
              onSubmitEditing={submitPhoneNumber}
              editable={!isPhoneNumberSubmitted}
              hasError={highlightPhoneField}
            />
            <XSensorPlaceholder />
          </View>
        </LinearGradient>
      </DismissKeyboardView>
      {isPhoneNumberSubmitted ? (
        <ActionSheet interactableRef={otpPanelRef} onSnap={onOtpPanelSnap}>
          <OtpPanel
            code={code}
            updateCode={updateCode}
            requestTime={moment(1580987401597)}
            expiryTime={moment(1580987441416)}
            containerStyle={styles.otpContainer}
            onResend={onResend}
            onCodeFilled={codeFilled}
            isTimedOut={isTimedOut}
            onTimedOut={onTimeout}
          />
        </ActionSheet>
      ) : null}
    </Fragment>
  );
};

AppLogin.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  keyboardAvoider: {
    flex: 1
  },
  imageContainer: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    position: "absolute"
  },
  videoView: {
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    position: "absolute"
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
    marginHorizontal: 56,
    marginTop: 56
  }
});

export default AppLogin;
