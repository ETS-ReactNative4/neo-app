import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  Text
} from "react-native";
import constants from "../../../constants/constants";
import { isIphoneX } from "react-native-iphone-x-helper";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";
import Icon from "../../../CommonComponents/Icon/Icon";
import LinearGradient from "react-native-linear-gradient";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import openCustomTab from "../../../Services/openCustomTab/openCustomTab";
import { recordEvent } from "../../../Services/analytics/analyticsService";

const VoucherHeader = ({
  infoText,
  title,
  onClickClose,
  image,
  children,
  voucherUrl = "",
  enableGradient = true
}) => {
  let ContentWrapper = View;
  let contentWrapperProps = { style: styles.gradientView };

  if (enableGradient) {
    ContentWrapper = LinearGradient;
    contentWrapperProps = {
      ...contentWrapperProps,
      locations: [0.25, 0.5, 0.6, 1],
      colors: [
        "rgba(0,0,0,0.1)",
        "rgba(0,0,0,0.5)",
        "rgba(0,0,0,0.6)",
        constants.firstGradientAlpha(55)
      ]
    };
  }

  const viewVoucherStyle = {
    marginBottom: 24,
    width: null,
    marginRight: 24
  };

  const viewVoucherTextStyle = {
    textDecorationLine: "underline",
    fontSize: 16
  };

  return (
    <View style={styles.headerContainer}>
      <ImageBackground resizeMode={"cover"} source={image} style={styles.image}>
        <ContentWrapper {...contentWrapperProps}>
          <View style={styles.closeIconRow}>
            {Platform.OS === "android" ? (
              <TouchableOpacity
                style={styles.closeIconTouchable}
                onPress={onClickClose}
                activeOpacity={0.2}
              >
                <View style={styles.iconContainer}>
                  <Icon color={"white"} name={constants.closeIcon} size={24} />
                </View>
              </TouchableOpacity>
            ) : null}
          </View>
          {children ? (
            children
          ) : (
            <View style={styles.textRow}>
              <View style={styles.infoTextWrapper}>
                <Text style={styles.infoText}>{infoText}</Text>
              </View>
              <View style={styles.titleTextWrapper}>
                <Text
                  style={styles.titleText}
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                >
                  {title}
                </Text>
              </View>
            </View>
          )}
          <View style={styles.actionRow}>
            {voucherUrl ? (
              <SimpleButton
                text={"View Voucher"}
                containerStyle={viewVoucherStyle}
                action={() => {
                  recordEvent(constants.voucherHeaderViewVoucherClick);
                  openCustomTab(voucherUrl);
                }}
                textColor={"white"}
                textStyle={viewVoucherTextStyle}
                underlayColor={"transparent"}
                color={"transparent"}
              />
            ) : null}
          </View>
        </ContentWrapper>
      </ImageBackground>
      <Image
        style={styles.circleSpace}
        source={constants.semiCircleShape}
        resizeMode={"contain"}
      />
      <View style={styles.placeHolderLeft} />
      <View style={styles.placeHolderRight} />
    </View>
  );
};

VoucherHeader.propTypes = {
  infoText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  children: PropTypes.element,
  voucherUrl: PropTypes.string.isRequired,
  enableGradient: PropTypes.bool
};

const xHeight = isIphoneX() ? constants.xNotchHeight : 0;
const styles = StyleSheet.create({
  headerContainer: {
    height: 214 + xHeight
  },
  image: {
    flex: 1,
    justifyContent: "space-between"
  },
  gradientView: {
    flex: 1,
    justifyContent: "space-between"
  },

  circleSpace: {
    position: "absolute",
    bottom: 0,
    left: responsiveWidth(50) - 20
  },
  placeHolderLeft: {
    height: 16,
    width: responsiveWidth(50) - 18.3,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white"
  },
  placeHolderRight: {
    height: 16,
    width: responsiveWidth(50) - 20,
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "white"
  },

  closeIconRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-start"
  },
  closeIconTouchable: {
    marginLeft: 8,
    marginTop: 16,
    padding: 16
  },
  iconContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    backgroundColor: "rgba(0,0,0,0.4)",
    alignItems: "center",
    justifyContent: "center"
  },
  closeIcon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignSelf: "flex-start"
  },

  textRow: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  infoTextWrapper: {
    height: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  infoText: {
    fontFamily: constants.primarySemiBold,
    color: "rgba(255,255,255,0.6)",
    fontSize: 13
  },
  titleTextWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 38
  },
  titleText: {
    fontFamily: constants.primarySemiBold,
    color: constants.secondColor,
    fontSize: 30
  },

  actionRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  menuIconContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginRight: 24,
    marginBottom: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  menuIcon: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignSelf: "flex-start"
  }
});

export default VoucherHeader;
