import React from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
  Text
} from "react-native";
import PropTypes from "prop-types";
import constants from "../../constants/constants";
import Icon from "../Icon/Icon";

const SearchPlaceholder = ({ action, containerStyle }) => {
  if (!containerStyle) containerStyle = {};

  return (
    <TouchableHighlight
      style={[styles.placeholderContainer, containerStyle]}
      onPress={action}
      underlayColor={constants.shade4}
    >
      <View style={styles.placeHolderView}>
        <View style={styles.iconWrapper}>
          <Icon
            name={constants.searchIcon}
            size={18}
            color={constants.shade2}
          />
        </View>
        <View style={styles.searchTextWrapper}>
          <Text style={styles.searchText}>Search</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  placeholderContainer: {
    height: 32,
    marginTop: 8,
    marginBottom: 18,
    backgroundColor: constants.shade5,
    borderRadius: 8
  },
  placeHolderView: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  iconWrapper: {
    marginHorizontal: 8
  },
  searchTextWrapper: {
    height: 17
  },
  searchText: {
    fontFamily: constants.primaryLight,
    fontSize: 17,
    lineHeight: 17,
    color: constants.shade2
  }
});

SearchPlaceholder.propTypes = {
  action: PropTypes.func.isRequired,
  containerStyle: PropTypes.object
};

export default SearchPlaceholder;
