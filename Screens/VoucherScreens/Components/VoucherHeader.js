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

const VoucherHeader = ({ infoText, title, onClickClose, menu }) => {
  return (
    <View style={styles.headerContainer}>
      <ImageBackground
        resizeMode={"cover"}
        source={constants.splashBackground}
        style={styles.image}
      >
        <TouchableOpacity
          style={styles.closeIconContainer}
          onPress={onClickClose}
        >
          <Image
            resizeMode={"contain"}
            source={constants.closeIcon}
            style={styles.closeIcon}
          />
        </TouchableOpacity>
        <View style={styles.infoTextWrapper}>
          <Text style={styles.infoText}>{infoText}</Text>
        </View>
        <View style={styles.titleTextWrapper}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </ImageBackground>
      <Image style={styles.circleSpace} source={constants.semiCircleShape} />
      <View style={styles.placeHolderLeft} />
      <View style={styles.placeHolderRight} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 214
  },
  image: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
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
  closeIcon: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: "white"
  }
});

export default VoucherHeader;
