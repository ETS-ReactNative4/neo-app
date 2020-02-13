import React from "react";
import Modal from "react-native-modal";
import { StyleSheet } from "react-native";

import ModalContent from "./Components/ModalContent";

const ForceUpdateModal = () => {
  return (
    <Modal style={styles.modalWrapperStyle} isVisible={true}>
      <ModalContent
        title={""}
        description={""}
        buttonText={""}
        buttonClickAction={() => {}}
        bottomText={""}
        linkText={""}
        linkClickAction={() => {}}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalWrapperStyle: {
    margin: 0,
    paddingHorizontal: 16
  }
});

export default ForceUpdateModal;
