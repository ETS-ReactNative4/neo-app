import React from "react";
import { TouchableHighlight, Image } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import Icon from "../Icon/Icon";

const SearchButton = ({ action }) => (
  <TouchableHighlight
    style={{ paddingHorizontal: 16 }}
    onPress={action}
    underlayColor={"transparent"}
  >
    <Icon name={constants.searchIcon} size={24} color={constants.black1} />
  </TouchableHighlight>
);

SearchButton.propTypes = {
  action: PropTypes.func.isRequired
};

export default SearchButton;
