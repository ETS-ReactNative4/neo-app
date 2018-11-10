import React from "react";
import { View, StyleSheet } from "react-native";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import { isIphoneX } from "react-native-iphone-x-helper";

const VisaActionBar = ({ isVisaOnArrival, navigation }) => {
  return (
    <View style={styles.visaActionContainer}>
      {true || !isVisaOnArrival ? (
        <SimpleButton
          text={"View checklist"}
          action={() => navigation.navigate("VisaChecklist")}
          textColor={"white"}
          containerStyle={{
            backgroundColor: constants.firstColor,
            marginHorizontal: 4
          }}
          underlayColor={constants.firstColorAlpha(0.3)}
        />
      ) : null}
      <SimpleButton
        text={"Contact helpdesk"}
        action={() => navigation.navigate("FAQ", { title: "Visa Processing" })}
        textColor={constants.black2}
        containerStyle={{ backgroundColor: "white", marginHorizontal: 4 }}
        hasBorder={true}
      />
    </View>
  );
};

VisaActionBar.propTypes = forbidExtraProps({
  navigation: PropTypes.object.isRequired,
  isVisaOnArrival: PropTypes.bool.isRequired
});

const styles = StyleSheet.create({
  visaActionContainer: {
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "rgba(0,0,0,.3)",
    marginBottom: isIphoneX() ? 30 : 0
  }
});

export default VisaActionBar;
