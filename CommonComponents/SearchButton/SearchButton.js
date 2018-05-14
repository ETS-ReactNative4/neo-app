import React from "react";
import { TouchableHighlight, Image } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const SearchButton = ({ action }) => (
  <TouchableHighlight
    style={{ paddingHorizontal: 16 }}
    onPress={action}
    underlayColor={"transparent"}
  >
    <Image
      resizeMode={"contain"}
      source={constants.searchIcon}
      style={{ height: 24, width: 30 }}
    />
  </TouchableHighlight>
);

SearchButton.propTypes = {
  action: PropTypes.func.isRequired
};

export default SearchButton;
