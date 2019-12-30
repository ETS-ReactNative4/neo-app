import React, { Fragment, useState } from "react";
import { StyleSheet, Platform, Text, TextStyle } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { inject, observer } from "mobx-react";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import VoucherStickyHeader from "../Components/VoucherStickyHeader";
import VoucherHeader from "../Components/VoucherHeader";
import constants from "../../../constants/constants";
// @ts-ignore
import ParallaxScrollView from "react-native-parallax-scroll-view";
import { isIphoneX } from "react-native-iphone-x-helper";
import IosCloseButton from "../Components/IosCloseButton";
import { ICustomCostings } from "../../../TypeInterfaces/ICustomCostings";
import { CONSTANT_customBlockCardBanner } from "../../../constants/imageAssets";

export interface CustomBlockCardVoucherProps {
  navigation: NavigationStackProp<{ customVoucher: ICustomCostings }>;
}

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
  ? 20
  : 0;

const CustomBlockCardVoucher = ({
  navigation
}: CustomBlockCardVoucherProps) => {
  const [isCloseVisible, setIsCloseVisible] = useState(true);

  const headerToggle = (status: boolean) => setIsCloseVisible(status);

  const close = () => navigation.goBack();

  const { title, description }: ICustomCostings = navigation.getParam(
    "customVoucher",
    {}
  );

  return (
    <Fragment>
      <ParallaxScrollView
        bounces={false}
        backgroundColor="white"
        contentBackgroundColor="white"
        parallaxHeaderHeight={214 + xHeight}
        stickyHeaderHeight={isCloseVisible ? 0 : 48 + xHeight}
        fadeOutForeground={Platform.OS !== "android"}
        onChangeHeaderVisibility={headerToggle}
        renderStickyHeader={() => (
          <VoucherStickyHeader action={close} text={""} />
        )}
        renderForeground={() => (
          <VoucherHeader
            infoText={""}
            title={""}
            onClickClose={close}
            image={CONSTANT_customBlockCardBanner()}
            placeHolderHeight={48 + xHeight}
            voucherUrl={""}
            enableGradient={false}
          />
        )}
      >
        <Text style={styles.titleStyle}>{title}</Text>
        <Text style={styles.descStyle}>{description}</Text>
      </ParallaxScrollView>
      {Platform.OS === constants.platformIos && isCloseVisible ? (
        <IosCloseButton clickAction={close} />
      ) : null}
    </Fragment>
  );
};

CustomBlockCardVoucher.navigationOptions = {
  header: null,
  gestureResponseDistance: {
    vertical: 214 + xHeight
  }
};

export interface CustomBlockCardVoucherStyles {
  titleStyle: TextStyle;
  descStyle: TextStyle;
}

const styles = StyleSheet.create<CustomBlockCardVoucherStyles>({
  titleStyle: {
    marginTop: 52,
    ...constants.fontCustom(constants.primarySemiBold, 18, 23),
    color: constants.black1,
    marginHorizontal: 24
  },
  descStyle: {
    marginTop: 12,
    ...constants.fontCustom(constants.primaryRegular, 15, 24),
    color: constants.black1,
    marginHorizontal: 24
  }
});

const CustomBlockCardVoucherObserver = inject("userStore")(
  inject("visaStore")(observer(CustomBlockCardVoucher))
);

export default ErrorBoundary()(CustomBlockCardVoucherObserver);
