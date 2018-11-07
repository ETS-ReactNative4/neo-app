import React from "react";
import { View, StyleSheet } from "react-native";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../constants/constants";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";

const VisaActionBar = ({ navigation }) => {
  return (
    <View style={styles.visaActionContainer}>
      <SimpleButton
        text={"View checklist"}
        action={() => navigation.navigate("Tools")}
        textColor={"white"}
        containerStyle={{
          backgroundColor: constants.firstColor,
          marginHorizontal: 4
        }}
        underlayColor={constants.firstColorAlpha(0.3)}
      />
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
  navigation: PropTypes.object.isRequired
});

const styles = StyleSheet.create({
  visaActionContainer: {
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    marginVertical: 24
  }
});

export default VisaActionBar;
