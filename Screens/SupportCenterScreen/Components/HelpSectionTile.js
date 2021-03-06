import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewPropTypes
} from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import constants from "../../../constants/constants";
import PropTypes from "prop-types";
import { inject, observer } from "mobx-react";
import faqIconMap from "../../../Services/faqIconMap/faqIconMap";

const HelpSectionTile = inject("supportStore")(
  observer(
    ({
      containerStyle = StyleSheet.create({}),
      title = "",
      action = () => null,
      disableIcons = false,
      supportStore
    }) => {
      const faqDetails = supportStore.getFaqDetailsByName(title);
      return (
        <TouchableOpacity
          onPress={action}
          style={[styles.helpSectionTileContainer, containerStyle]}
        >
          {disableIcons ? null : (
            <View style={styles.leftIconContainer}>
              <Icon
                size={20}
                color={constants.shade2}
                name={faqIconMap[faqDetails.categoryId]}
              />
            </View>
          )}
          <View style={styles.textSectionContainer}>
            <Text style={styles.titleText}>{title}</Text>
          </View>
          <View style={styles.rightIconContainer}>
            <Icon size={10} name={constants.arrowRight} />
          </View>
        </TouchableOpacity>
      );
    }
  )
);

HelpSectionTile.propTypes = {
  containerStyle: ViewPropTypes.style,
  icon: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.func,
  disableIcons: PropTypes.bool
};

const styles = StyleSheet.create({
  helpSectionTileContainer: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 2,
    backgroundColor: "white"
  },
  leftIconContainer: {
    height: 20,
    width: 20,
    marginLeft: 24
  },
  textSectionContainer: {
    flex: 1,
    marginLeft: 24
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black1,
    marginTop: 4
  },
  rightIconContainer: {
    height: 10,
    width: 10,
    marginHorizontal: 24
  }
});

export default HelpSectionTile;
