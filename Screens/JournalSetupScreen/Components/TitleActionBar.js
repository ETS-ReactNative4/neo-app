import React from "react";
import { Text, View, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const TitleActionBar = ({ title, description }) => {
  return (
    <View>
      <View>
        <Text />
        <Text />
      </View>
      <View />
    </View>
  );
};

TitleActionBar.propTypes = forbidExtraProps({
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
});

const styles = StyleSheet.create({
  titleActionBarContainer: {},
  textArea: {}
});

export default TitleActionBar;
