import React from "react";
import constants from "../../../../constants/constants";
import { Text, View, StyleSheet } from "react-native";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { PropTypes } from "prop-types";

const PassengerName = ({ name }) => {
  return (
    <View style={styles.userDetails}>
      <View style={styles.userIcon}>
        <Icon name={constants.trainIcon} color={"black"} size={16} />
      </View>
      <View style={styles.userNameWrapper}>
        <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.userName}>
          {name}
        </Text>
      </View>
    </View>
  );
};

PassengerName.propTypes = {
  name: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  userDetails: {
    flexDirection: "row",
    marginTop: 16
  },
  userIcon: {
    height: 16,
    width: 16,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8
  },
  userNameWrapper: {
    marginLeft: 8
  },
  userName: {
    ...constants.fontCustom(constants.primaryLight, 17),
    fontWeight: "400",
    marginTop: 3,
    color: constants.black1
  }
});

export default PassengerName;
