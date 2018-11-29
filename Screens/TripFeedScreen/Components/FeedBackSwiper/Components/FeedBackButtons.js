import React, { Component } from "react";
import { View, StyleSheet, Image } from "react-native";
import PropTypes from "prop-types";

const FeedBackButtons = ({ buttons }) => {
  return (
    <View style={styles.feedBackContainer}>
      {buttons.map((button, buttonIndex) => {
        return (
          <Image
            key={buttonIndex}
            resizeMode={"contain"}
            source={button.active}
            style={styles.buttonImage}
          />
        );
      })}
    </View>
  );
};

FeedBackButtons.propTypes = {
  buttons: PropTypes.array.isRequired
};

const styles = StyleSheet.create({
  feedBackContainer: {
    width: 112,
    height: 32,
    flexDirection: "row"
  },
  buttonImage: {
    height: 32,
    width: 32,
    marginHorizontal: 2
  }
});

export default FeedBackButtons;
