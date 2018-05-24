import React from "react";
import {
  View,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Text
} from "react-native";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PropTypes from "prop-types";

const VoucherHeader = ({ infoText, title, onClickClose, menu }) => {
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        resizeMode={"cover"}
        source={constants.splashBackground}
        style={styles.image}
      >
        <View style={styles.closeIconRow}>
          <TouchableOpacity
            style={styles.closeIconContainer}
            onPress={onClickClose}
            activeOpacity={0.2}
          >
            <Image
              resizeMode={"contain"}
              source={constants.closeIcon}
              style={styles.closeIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textRow}>
          <View style={styles.infoTextWrapper}>
            <Text style={styles.infoText}>{infoText}</Text>
          </View>
          <View style={styles.titleTextWrapper}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.menuIconContainer}
            onPress={menu}
            activeOpacity={0.2}
          >
            <Image
              resizeMode={"contain"}
              source={constants.notificationIcon}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <Image style={styles.circleSpace} source={constants.semiCircleShape} />
      <View style={styles.placeHolderLeft} />
      <View style={styles.placeHolderRight} />
    </View>
  );
};

VoucherHeader.propTypes = {
  infoText: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClickClose: PropTypes.func.isRequired,
  menu: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 214
  },
  image: {
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
    width: responsiveWidth(50) - 18,
    position: "absolute",
    bottom: 0,
    left: 0,
    backgroundColor: "white"
  },
  placeHolderRight: {
    height: 16,
    width: responsiveWidth(50) - 18,
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
  closeIconContainer: {
    height: 24,
    width: 24,
    borderRadius: 12,
    marginLeft: 24,
    marginTop: 32,
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
    color: "rgba(255,255,255,0.7)",
    fontSize: 13
  },
  titleTextWrapper: {
    alignItems: "center",
    justifyContent: "center",
    height: 32
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
