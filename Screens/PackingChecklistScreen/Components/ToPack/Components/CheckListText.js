import React from "react";
import PropTypes from "prop-types";
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  StyleSheet,
  Platform
} from "react-native";
import constants from "../../../../../constants/constants";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { recordEvent } from "../../../../../Services/analytics/analyticsService";

const CheckListText = ({
  id,
  item,
  isComplete,
  type,
  toggleCheckListStatus,
  isPackedTab
}) => {
  return (
    <TouchableHighlight
      onPress={() => {
        if (isComplete) {
          recordEvent(constants.PackingChecklist.event, {
            click: constants.PackingChecklist.click.unselectItem
          });
        } else {
          recordEvent(constants.PackingChecklist.event, {
            click: constants.PackingChecklist.click.selectItem
          });
        }
        toggleCheckListStatus({ id, item, isComplete, type });
      }}
      underlayColor={constants.shade5}
    >
      <View style={styles.checklistContainer} activeOpacity={1}>
        <Icon
          name={
            isComplete ? constants.checkBoxCheckedIcon : constants.checkBoxIcon
          }
          size={16}
          color={isComplete ? constants.firstColor : constants.shade5}
        />
        <Text
          style={[
            styles.textBox,
            isComplete && !isPackedTab ? styles.textBoxComplete : null
          ]}
        >
          {item}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

CheckListText.propTypes = {
  id: PropTypes.number.isRequired,
  item: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  type: PropTypes.string.isRequired,
  toggleCheckListStatus: PropTypes.func.isRequired,
  isPackedTab: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  checklistContainer: {
    flex: -1,
    ...Platform.select({
      ios: {
        minHeight: 24
      },
      android: {
        minHeight: 30
      }
    }),
    minWidth: responsiveWidth(70),
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white"
  },
  textBox: {
    marginLeft: 16,
    ...Platform.select({
      ios: {
        marginTop: 6
      }
    }),
    ...constants.fontCustom(constants.primaryLight, 17),
    color: constants.black2
  },
  textBoxComplete: {
    textDecorationLine: "line-through",
    color: constants.shade2
  }
});

export default CheckListText;
