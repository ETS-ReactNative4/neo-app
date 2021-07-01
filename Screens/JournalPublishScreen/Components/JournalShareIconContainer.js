import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import * as Animatable from "react-native-animatable";

const JournalShareIconContainer = ({
  shareAction = () => null,
  facebookAction = () => null,
  twitterAction = () => null
}) => {
  return (
    <View style={styles.shareIconContainer}>
      <TouchableOpacity onPress={shareAction} style={styles.iconContainer}>
        <Animatable.View
          animation={"fadeInUp"}
          useNativeDriver={true}
          duration={300}
        >
          <Icon name={constants.shareIcon} size={24} />
        </Animatable.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={twitterAction} style={styles.iconContainer}>
        <Animatable.View
          animation={"fadeInUp"}
          duration={300}
          useNativeDriver={true}
        >
          <Icon name={constants.twitterIcon} size={24} />
        </Animatable.View>
      </TouchableOpacity>
      <TouchableOpacity onPress={facebookAction} style={styles.iconContainer}>
        <Animatable.View
          animation={"fadeInUp"}
          duration={300}
          useNativeDriver={true}
        >
          <Icon name={constants.facebookIcon} size={24} />
        </Animatable.View>
      </TouchableOpacity>
    </View>
  );
};

JournalShareIconContainer.propTypes = forbidExtraProps({
  shareAction: PropTypes.func.isRequired,
  facebookAction: PropTypes.func.isRequired,
  twitterAction: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  shareIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 24,
    marginBottom: 24
  },
  iconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
});

export default JournalShareIconContainer;
