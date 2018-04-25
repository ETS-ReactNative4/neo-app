import React from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  Image,
  Platform,
  StyleSheet
} from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const SearchInput = ({ onSearch, onClearSearch, value, containerStyle }) => {
  return (
    <View style={[styles.textInputWrapper, containerStyle]}>
      <TextInput
        onChangeText={onSearch}
        placeholder={"Search..."}
        value={value}
        style={styles.searchInput}
        clearButtonMode={"always"}
        underlineColorAndroid={"transparent"}
      />
      {Platform.OS === "android" ? (
        <TouchableHighlight
          onPress={onClearSearch}
          underlayColor={"transparent"}
          style={styles.clearTextTouchable}
        >
          <Image
            resizeMode={"contain"}
            source={constants.closeIcon}
            style={styles.clearTextIcon}
          />
        </TouchableHighlight>
      ) : null}
    </View>
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  containerStyle: PropTypes.object
};

const styles = StyleSheet.create({
  textInputWrapper: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: constants.shade5,
    paddingHorizontal: 8,
    borderRadius: 8
  },
  searchInput: {
    flex: 1,
    backgroundColor: constants.shade5,
    color: constants.shade2,
    fontSize: 16,
    fontFamily: constants.primaryLight
  },
  clearTextTouchable: {
    alignSelf: "center"
  },
  clearTextIcon: {
    height: 18,
    width: 18
  }
});

export default SearchInput;
