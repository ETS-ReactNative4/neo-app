import {
  Image,
  Text,
  TouchableHighlight,
  View,
  StyleSheet
} from "react-native";
import React from "react";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../Services/PropTypeValidation/forbidExtraProps";

const SelectionRow = ({ image, text, action, disableImage }) => {
  return (
    <TouchableHighlight
      underlayColor={"transparent"}
      onPress={action}
      style={styles.currencyRowTouchable}
    >
      <View style={styles.currencyRowContainer}>
        {disableImage ? null : (
          <Image style={styles.currencyRowFlagImage} source={image} />
        )}
        <Text style={styles.currencyName}>{text}</Text>
      </View>
    </TouchableHighlight>
  );
};

SelectionRow.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
  text: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  disableImage: PropTypes.bool
});

const styles = StyleSheet.create({
  currencyRowTouchable: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: constants.shade4
  },
  currencyRowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  currencyRowFlagImage: {
    height: 20,
    width: 30,
    marginRight: 8
  },
  currencyName: {
    ...constants.font17(constants.primaryLight),
    marginTop: 8,
    color: constants.black2
  }
});

export default SelectionRow;
