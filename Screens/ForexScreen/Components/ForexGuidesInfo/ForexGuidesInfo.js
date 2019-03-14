import React from "react";
import { SafeAreaView, View, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import ModalHeader from "../../../../CommonComponents/ModalHeader/ModalHeader";
import constants from "../../../../constants/constants";
import ForexGuidesSection from "./Components/ForexGuidesSection";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";

/**
 * Used to show the Guides Forex information for all the countries in the itinerary
 */
const ForexGuidesInfo = ({ isVisible, data = {}, onClose = () => null }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      style={{ margin: 0, backgroundColor: "white" }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.forexGuidesContainer}>
          <ModalHeader
            leftIcon={constants.closeIcon}
            leftButtonAction={onClose}
            title={"Forex Info"}
          />
          <ScrollView contentContainerStyle={styles.forexGuidesScrollContainer}>
            {Object.keys(data).map((sectionName, sectionIndex) => {
              return (
                <ForexGuidesSection
                  key={sectionIndex}
                  title={sectionName}
                  data={data[sectionName]}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  forexGuidesContainer: {
    marginHorizontal: 24
  },
  forexGuidesScrollContainer: {}
});

ForexGuidesInfo.propTypes = forbidExtraProps({
  isVisible: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
});

export default ForexGuidesInfo;
