import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Modal from "react-native-modal";
import ModalHeader from "../../../../CommonComponents/ModalHeader/ModalHeader";
import constants from "../../../../constants/constants";
import ForexGuidesSection from "./Components/ForexGuidesSection";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import XSensorPlaceholder from "../../../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import { isIphoneX } from "react-native-iphone-x-helper";

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
      <View style={styles.forexGuidesContainer}>
        <ModalHeader
          containerStyle={{ marginHorizontal: 24 }}
          leftIcon={constants.closeIcon}
          leftButtonAction={onClose}
          title={"Forex Info"}
        />
        <View style={{ flex: 1 }}>
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
        <XSensorPlaceholder />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  forexGuidesContainer: {
    flex: 1,
    marginTop: 24
  },
  forexGuidesScrollContainer: {
    paddingHorizontal: 24
  }
});

ForexGuidesInfo.propTypes = forbidExtraProps({
  isVisible: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
});

export default ForexGuidesInfo;
