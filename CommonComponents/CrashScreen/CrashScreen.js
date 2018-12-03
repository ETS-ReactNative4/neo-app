import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import constants from "../../constants/constants";
import {
  responsiveWidth,
  responsiveHeight
} from "react-native-responsive-dimensions";
import { isIphoneX } from "react-native-iphone-x-helper";
import SimpleButton from "../../CommonComponents/SimpleButton/SimpleButton";
import RNRestart from "react-native-restart";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const CrashScreen = ({ isRoot, navigation }) => {
  return (
    <View style={style.containerStyle}>
      <Image
        source={constants.errorBoxIllus}
        style={style.centerIcon}
        resizeMode={"contain"}
      />
      <Text style={style.crashText}>
        {isRoot ? constants.appCrashText.reload : constants.appCrashText.goBack}
      </Text>
      {isRoot ? (
        <SimpleButton
          text={"Reload"}
          color={constants.firstColor}
          textColor={"white"}
          action={() => {
            RNRestart.Restart();
          }}
        />
      ) : (
        <SimpleButton
          text={"Go Back"}
          color={constants.firstColor}
          textColor={"white"}
          action={() => {
            navigation.goBack();
          }}
        />
      )}
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    paddingHorizontal: 24
  },
  centerIcon: {
    width: responsiveWidth(100) - 48,
    height: responsiveHeight(30),
    marginTop: -(
      constants.headerHeight + (isIphoneX() ? constants.xNotchHeight : 0)
    )
  },
  crashText: {
    ...constants.fontCustom(constants.primaryRegular, 17),
    textAlign: "center",
    color: constants.black2,
    marginBottom: 8
  }
});

CrashScreen.propTypes = forbidExtraProps({
  isRoot: PropTypes.bool,
  navigation: PropTypes.object.isRequired
});

export default CrashScreen;
