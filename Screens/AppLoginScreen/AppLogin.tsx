import React, { useState, Fragment, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  LayoutAnimation,
  Platform,
  TextInput
} from "react-native";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import {
  CONSTANT_defaultPlaceImage,
  CONSTANT_loginBackground,
  CONSTANT_userIcon,
  CONSTANT_mailIcon
} from "../../constants/imageAssets";
import LinearGradient from "react-native-linear-gradient";
import {
  CONSTANT_darkGradientAlpha,
  CONSTANT_shade1
} from "../../constants/colorPallete";
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
import {
  CONSTANT_platformIos,
  CONSTANT_responseUserUnavailable
} from "../../constants/stringConstants";
import useMobileNumberApi from "./hooks/useMobileNumberApi";
import { validateLoginMobileNumber } from "../../Services/validateMobileNumber/validateMobileNumber";
import DismissKeyboardView from "../../CommonComponents/DismissKeyboardView/DismissKeyboardView";
import { toastCenter } from "../../Services/toast/toast";
import Video from "react-native-video";
import {
  responsiveHeight,
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import useLoginForm from "./hooks/useLoginForm";
import {
  SCREEN_APP_LOGIN,
  SCREEN_EXPLORE_PAGE,
  SCREEN_SAVED_ITINERARIES
} from "../../NavigatorsV2/ScreenNames";
import { StackNavigationProp } from "@react-navigation/stack";
import { observer, inject } from "mobx-react";
import { AppNavigatorParamsType } from "../../NavigatorsV2/AppNavigator";
import LoginInputField from "./Components/LoginInputField";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import useRegisterUserApi from "./hooks/useRegisterUserApi";
import validateEmail from "../../Services/validateEmail/validateEmail";
import useRequestOtpApi from "./hooks/useRequestOtpApi";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import useLoginUserApi, {
  ILoginSuccessData,
  ILoginFailureData
} from "./hooks/useLoginUserApi";
import { registerTokenV2 } from "../../Services/registerToken/registerToken";
import { logError } from "../../Services/errorLogger/errorLogger";
import useDeepCompareEffect from "use-deep-compare-effect";
import DebouncedAlert from "../../CommonComponents/DebouncedAlert/DebouncedAlert";
import { RouteProp } from "@react-navigation/native";
import launchPretripHome from "../../Services/launchPretripHome/launchPretripHome";
import TranslucentStatusBar from "../../CommonComponents/TranslucentStatusBar/TranslucentStatusBar";
import resetToWelcomeFlow from "../../Services/resetToWelcomeFlow/resetToWelcomeFlow";
import YourBookings from "../../mobx/YourBookings";
import launchPostBookingV2 from "../../Services/launchPostBookingV2/launchPostBookingV2";
import storeService from "../../Services/storeService/storeService";
import Itineraries from "../../mobx/Itineraries";
import launchItinerarySelector from "../../Services/launchItinerarySelector/launchItinerarySelector";
import launchSavedItineraries from "../../Services/launchSavedItineraries/launchSavedItineraries";

type screenName = typeof SCREEN_APP_LOGIN;

type StarterScreenRouteProp = RouteProp<AppNavigatorParamsType, screenName>;

export type StarterScreenNavigationProp = StackNavigationProp<
  AppNavigatorParamsType,
  screenName
>;

export interface IAppLoginProps {
  navigation: StarterScreenNavigationProp;
  route: StarterScreenRouteProp;
  yourBookingsStore: YourBookings;
  itineraries: Itineraries;
}

const AppLogin = ({
  navigation,
  route,
  yourBookingsStore,
  itineraries
}: IAppLoginProps) => {
  const [isVideoReady, setVideoStatus] = useState(false);
  const [
    { phoneNumber, countryCode, countryFlag, code, name, email },
    {
      updatePhoneNumber,
      updateCountryCode,
      updateCountryFlag,
      updateCode,
      updateName,
      updateEmail
    }
  ] = useLoginForm();
  const [isRegistrationAttempted, setRegisterationAttemptStatus] = useState<
    boolean
  >(false);
  const { keyboardHeight, keyboardShown } = useKeyboard();
  const emailRef = useRef<TextInput>(null);
  const otpPanelRef = useRef(null);
  const [mobileNumberApiDetails, mobileNumberSubmitCall] = useMobileNumberApi();
  const [registrationApiDetails, registerNewUser] = useRegisterUserApi();
  const [otpApiDetails, makeOtpRequestCall] = useRequestOtpApi();
  const [loginApiDetails, loginUser] = useLoginUserApi();
  const {
    successResponseData: loginSuccessData = {} as ILoginSuccessData | undefined,
    failureResponseData: loginFailureData = {} as ILoginFailureData | undefined
  } = loginApiDetails;
  const [isPhoneSubmitAttempted, setPhoneSubmitAttempt] = useState<boolean>(
    false
  );
  const [isTimedOut, setIsTimedOut] = useState<boolean>(false);

  const mobileNumber = `${countryCode}${phoneNumber}`;

  const onCountryCodeChange = (ccode: string, flagEmoji: string) => {
    updateCountryCode(ccode);
    updateCountryFlag(flagEmoji);
  };

  const onResend = () => {
    requestOtp();
  };

  const onTimeout = () => {
    DebouncedAlert("Oops!", "OTP Time out!", [
      {
        text: "Okay",
        onPress: () => closeOtpPanel()
      }
    ]);
    setIsTimedOut(true);
  };

  const submitPhoneNumber = async () => {
    setPhoneSubmitAttempt(true);
    if (validateLoginMobileNumber(mobileNumber)) {
      const result = await mobileNumberSubmitCall({
        mobileNumber: phoneNumber,
        countryPhoneCode: countryCode
      });
      /**
       * If phone number exists then he/she is a registered user
       * & result will be true
       * otherwise no action needed...
       */
      if (result) {
        requestOtp();
      }
    } else {
      toastCenter("Invalid Phone Number");
    }
  };

  const openOtpPanel = () => {
    // @ts-ignore
    otpPanelRef.current && otpPanelRef.current.snapTo({ index: 1 });
  };

  const closeOtpPanel = () => {
    // @ts-ignore
    otpPanelRef.current && otpPanelRef.current.snapTo({ index: 2 });
  };

  /**
   * event handler whne otp panel is closed...
   */
  const otpPanelClosed = () => {
    updateCode("");
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

  const highlightNameField = !name && isRegistrationAttempted;

  const highlightEmailField = !validateEmail(email) && isRegistrationAttempted;

  const onVideoLoaded = () => setVideoStatus(true);

  const focusOnEmailField = () => emailRef?.current?.focus();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false
    });
    storeService.welcomeStateStore.loadWelcomeState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const registerUser = async () => {
    setRegisterationAttemptStatus(true);
    if (highlightPhoneField || highlightNameField || highlightEmailField) {
      // PT TODO: Any visual feedback?
    } else {
      const result = await registerNewUser({
        countryPhoneCode: countryCode,
        mobileNumber: phoneNumber,
        email,
        userName: name
      });
      if (result) {
        requestOtp();
      }
    }
  };

  const requestOtp = async () => {
    const result = await makeOtpRequestCall({
      ccode: countryCode,
      mob_num: phoneNumber,
      factors: ["SMS", "EMAIL"]
    });
    if (result) {
      openOtpPanel();
    } else {
      toastCenter("Unable to send OTP!");
    }
  };

  const codeFilled = async (otp: string) => {
    try {
      await loginUser({
        countryPhoneCode: countryCode,
        mobileNumber: phoneNumber,
        otp,
        otpDetailsId:
          otpApiDetails.successResponseData?.data?.otpDetailsId || ""
      });
    } catch (e) {
      toastCenter("Login Failed");
    }
  };

  const continueFlow = () => {
    const isNewUser =
      mobileNumberApiDetails.failureResponseData?.status ===
      CONSTANT_responseUserUnavailable;

    // PT TODO: Launch Post booking flow goes here once old screen wiring is done
    const { resetTarget } = route.params || {};
    if (resetTarget === SCREEN_EXPLORE_PAGE) {
      navigation.dispatch(launchPretripHome());
    } else if (resetTarget === SCREEN_SAVED_ITINERARIES && !isNewUser) {
      navigation.dispatch(launchSavedItineraries());
    } else {
      yourBookingsStore
        .getUpcomingItineraries()
        .then(() => {
          if (yourBookingsStore.hasUpcomingItineraries) {
            preparePostBookingFlow();
          } else {
            resetToWelcomeFlow().then(resetAction => {
              navigation.dispatch(resetAction);
            });
          }
        })
        .catch(() => {
          logError("Failed to load upcoming itineraries at login");
          resetToWelcomeFlow().then(resetAction => {
            navigation.dispatch(resetAction);
          });
        });
    }
  };

  const preparePostBookingFlow = () => {
    yourBookingsStore
      .getUpcomingItineraries()
      .then(itinerariesArray => {
        if (itinerariesArray.length > 1) {
          navigation.dispatch(launchItinerarySelector());
        } else {
          const itineraryId: string = itinerariesArray[0].itineraryId;
          itineraries
            .selectItinerary(itineraryId)
            .then(() => {
              navigation.dispatch(launchPostBookingV2());
            })
            .catch(logError);
        }
      })
      .catch(logError);
  };

  /**
   * Effect hook that will be fired once Login Details are received.
   * This requires a ref hook to store the previous values
   * and a deep equality check on the ref & the store value
   * so that it will not unnecessarily fire the login actions
   *
   * Problem: https://github.com/kentcdodds/use-deep-compare-effect#the-problem
   * Solution: https://github.com/kentcdodds/use-deep-compare-effect#this-solution
   */
  useDeepCompareEffect(() => {
    if (loginSuccessData?.data?.otpStatus === "VERIFIED") {
      registerTokenV2(loginSuccessData.data?.authToken || "")
        .then(isTokenStored => {
          if (isTokenStored) {
            continueFlow();
          } else {
            toastCenter("Login Failed");
          }
        })
        .catch(e => {
          logError(e);
          toastCenter("Login Failed");
        });
    } else if (loginFailureData?.data?.otpStatus === "VERIFICATIONFAILED") {
      DebouncedAlert("Invalid OTP", "Please try again ☹️", [
        {
          text: "Okay",
          onPress: () => closeOtpPanel()
        }
      ]);
    }
  }, [loginSuccessData, loginFailureData]);

  return (
    <Fragment>
      <TranslucentStatusBar />
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
          {!keyboardShown ? (
            <AppLoginTitle
              skipAction={() => null}
              containerStyle={styles.loginTitleContainer}
            />
          ) : (
            <View />
          )}
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
              hasError={highlightPhoneField}
              placeholderTextColor={CONSTANT_shade1}
            />
            {mobileNumberApiDetails.failureResponseData?.status ===
            CONSTANT_responseUserUnavailable ? (
              <Fragment>
                <LoginInputField
                  icon={CONSTANT_userIcon}
                  placeholder={"Name"}
                  hasError={highlightNameField}
                  value={name}
                  onChangeText={updateName}
                  containerStyle={styles.inputField}
                  placeholderTextColor={CONSTANT_shade1}
                  keyboardType={"default"}
                  returnKeyType={"next"}
                  onSubmitEditing={focusOnEmailField}
                />
                <LoginInputField
                  textInputRef={emailRef}
                  icon={CONSTANT_mailIcon}
                  placeholder={"Email"}
                  hasError={highlightEmailField}
                  value={email}
                  onChangeText={updateEmail}
                  containerStyle={styles.inputField}
                  placeholderTextColor={CONSTANT_shade1}
                  keyboardType={"email-address"}
                  returnKeyType={"done"}
                  onSubmitEditing={registerUser}
                />
                {!registrationApiDetails.isLoading ? (
                  <PrimaryButton
                    text="Verify & Sign in"
                    clickAction={registerUser}
                    buttonStyle={styles.registrationButton}
                  />
                ) : (
                  <PrimaryButton
                    text="Verifying..."
                    clickAction={() => null}
                    buttonStyle={styles.registrationButton}
                  />
                )}
              </Fragment>
            ) : null}
            <XSensorPlaceholder />
          </View>
        </LinearGradient>
      </DismissKeyboardView>
      <ActionSheet interactableRef={otpPanelRef} onSnap={onOtpPanelSnap}>
        <OtpPanel
          code={code}
          updateCode={updateCode}
          expiryTime={otpApiDetails.successResponseData?.data?.otpExpiresIn}
          containerStyle={styles.otpContainer}
          onResend={onResend}
          onCodeFilled={codeFilled}
          isTimedOut={isTimedOut}
          onTimedOut={onTimeout}
        />
      </ActionSheet>
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
    marginHorizontal: 24,
    marginTop: 56
  },
  inputField: {
    marginTop: 24
  },
  registrationButton: {
    marginTop: 24
  }
});

export default ErrorBoundary()(
  inject("itineraries")(inject("yourBookingsStore")(observer(AppLogin)))
);
