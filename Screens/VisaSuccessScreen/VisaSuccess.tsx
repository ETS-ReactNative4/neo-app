import React, { useEffect } from "react";
import {
  StyleSheet,
  ViewStyle,
  SafeAreaView,
  View,
  Text,
  TextStyle
} from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import LottieView from "lottie-react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { CONSTANT_visaSuccessAnimation } from "../../constants/imageAssets";
import { CONSTANT_visaSuccessTitleFn } from "../../constants/appText";
import { observer, inject } from "mobx-react";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import {
  CONSTANT_fontCustom,
  CONSTANT_fontPrimarySemiBold
} from "../../constants/fonts";
import constants from "../../constants/constants";
import User from "../../mobx/User";
import Visa from "../../mobx/Visa";
import { isIphoneX } from "react-native-iphone-x-helper";

export interface VisaSuccessProps {
  containerStyle?: ViewStyle;
  navigation: NavigationStackProp;
  userStore: User;
  visaStore: Visa;
}

const VisaSuccess = ({
  containerStyle = StyleSheet.create({}),
  navigation,
  userStore,
  visaStore
}: VisaSuccessProps) => {
  const goBack = () => {
    navigation.goBack();
    return null;
  };
  useEffect(() => {
    return () => {
      const {
        isVisaInitialized,
        isSingleVisa,
        visaList,
        isVisaAvailable,
        updateUserHasSeenSuccessAnimation
      } = visaStore;
      Visa.visaOpener({
        navigation,
        isVisaInitialized,
        isSingleVisa,
        visaList,
        isVisaAvailable
      });
      updateUserHasSeenSuccessAnimation();
    };
  });
  const { userDetails = {} } = userStore;
  // @ts-ignore TODO: Write types for User interface.
  const { name = "" } = userDetails;
  const { isSingleVisa = true } = visaStore;
  const buttonStyle = {
    width: null,
    marginHorizontal: 24,
    borderRadius: 4,
    marginBottom: isIphoneX() ? 0 : 24
  };
  return (
    <SafeAreaView style={[styles.visaSuccessContainer, containerStyle]}>
      <View style={styles.animationContainer}>
        <Text style={styles.successText}>
          {CONSTANT_visaSuccessTitleFn(name, isSingleVisa)}
        </Text>
        <View style={styles.animationWrapper}>
          {/* Wrapper to make sure Lottie doesn't overflow into other flex-ful components. */}
          <LottieView source={CONSTANT_visaSuccessAnimation()} autoPlay loop />
        </View>
      </View>
      <View>
        <SimpleButton
          text="View details"
          textColor="white"
          containerStyle={buttonStyle}
          action={goBack}
        />
      </View>
    </SafeAreaView>
  );
};

VisaSuccess.navigationOptions = {
  header: null
};

const VisaSuccessObserver = inject("userStore")(
  inject("visaStore")(observer(VisaSuccess))
);

export interface VisaSuccessStyles {
  visaSuccessContainer: ViewStyle;
  successAnimation: ViewStyle;
  animationContainer: ViewStyle;
  animationWrapper: ViewStyle;
  successText: TextStyle;
}

const styles = StyleSheet.create<VisaSuccessStyles>({
  visaSuccessContainer: {
    flex: 1
  },
  successAnimation: {
    flex: 1
  },
  animationContainer: {
    flex: 1
  },
  animationWrapper: {
    flex: 1
  },
  successText: {
    textAlign: "center",
    marginTop: 72,
    marginHorizontal: 24,
    ...CONSTANT_fontCustom(CONSTANT_fontPrimarySemiBold, 24, 29),
    color: constants.black2
  }
});

export default ErrorBoundary()(VisaSuccessObserver);
