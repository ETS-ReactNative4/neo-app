import React from "react";
import { View, Text, StyleSheet, Image, Modal } from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const Loader = ({ isVisible }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.container}>
        <Image source={constants.loadingIcon} style={styles.loadingIcon} />
      </View>
    </Modal>
  );
};

Loader.propTypes = {
  isVisible: PropTypes.bool.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    alignItems: "center",
    justifyContent: "center"
  },
  loadingIcon: {
    height: 40,
    width: 40
  }
});

export default Loader;
