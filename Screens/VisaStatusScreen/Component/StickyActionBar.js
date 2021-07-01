import React from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  Text,
  Platform,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";

const StickyActionBar = ({
  containerStyle = StyleSheet.create({}),
  title = "Document Checklist",
  icon,
  action = () => null,
  backgroundColor = constants.fourteenthColor,
  color = constants.fifteenthColor
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[
        styles.stickyActionBarContainer,
        { backgroundColor },
        containerStyle
      ]}
    >
      {icon ? (
        <View style={styles.iconWrapper}>
          <Icon name={icon} color={color} size={16} />
        </View>
      ) : null}
      <View style={styles.textWrapper}>
        <Text style={[styles.titleText, { color }]}>{title}</Text>
      </View>
      <View style={styles.actionIconWrapper}>
        <Icon name={constants.arrowRight} color={color} size={10} />
      </View>
    </TouchableOpacity>
  );
};

StickyActionBar.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
  action: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string
};

const styles = StyleSheet.create({
  stickyActionBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  iconWrapper: {
    paddingRight: 8
  },
  textWrapper: {
    paddingRight: 4
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 16),
    ...Platform.select({
      ios: {
        marginTop: 3
      },
      android: {
        marginTop: 1
      }
    })
  },
  actionIconWrapper: {}
});

export default StickyActionBar;
