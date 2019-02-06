import React from "react";
import {
  TouchableHighlight,
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity
} from "react-native";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";

const ToolListItem = ({ icon, action, text, containerStyle, isComingSoon }) => {
  const Container = isComingSoon ? View : TouchableOpacity;
  return (
    <Container
      style={[
        styles.secondaryContainer,
        /**
         * use the following styles for card layout
         */
        // isComingSoon
        //   ? { borderColor: constants.shade5 }
        //   : { ...constants.elevationTwo },
        containerStyle || {}
      ]}
      onPress={action}
      underlayColor={"transparent"}
    >
      <Image
        resizeMode={"contain"}
        source={icon}
        style={styles.icon}
        opacity={isComingSoon ? 0.5 : 1}
      />
      <Text
        numberOfLines={2}
        ellipsizeMode={"tail"}
        style={[styles.text, isComingSoon ? styles.comingSoonTextStyle : {}]}
      >
        {text}
      </Text>
      <View style={styles.comingSoonContainer}>
        {isComingSoon ? (
          <Text style={styles.comingSoonText}>{`coming soon`}</Text>
        ) : null}
      </View>
    </Container>
  );
};

ToolListItem.propTypes = {
  icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isComingSoon: PropTypes.bool
};

const maxWidth = responsiveWidth(100) - 48;
const containerWidth = maxWidth / 3 - 8;
const styles = StyleSheet.create({
  secondaryContainer: {
    flexDirection: "row",
    width: responsiveWidth(100) - 48,
    marginVertical: 8,
    alignItems: "center",
    justifyContent: "flex-start"
    /**
     * use the following styles for card layout
     */
    // backgroundColor: "white",
    // borderWidth: StyleSheet.hairlineWidth,
    // borderRadius: 5,
    // borderColor: constants.shade4,
    // padding: 16
  },
  icon: {
    height: 32,
    width: 32
  },
  text: {
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2,
    marginLeft: 16
  },
  comingSoonTextStyle: {
    alignSelf: "flex-start",
    color: constants.shade2,
    marginTop: 8
  },
  comingSoonContainer: {
    flex: 1,
    marginTop: -4
  },
  comingSoonText: {
    ...constants.fontCustom(constants.primaryLight, 10),
    color: constants.shade2,
    textAlign: "right"
  }
});

export default ToolListItem;
