import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import Modal from "react-native-modal";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import { responsiveWidth } from "react-native-responsive-dimensions";
import PlaceDetails from "./PlaceDetails";
import PlaceImageContainer from "./PlaceImageContainer";
import Carousel from "../../../CommonComponents/Carousel/Carousel";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";
import constants from "../../../constants/constants";

const PlaceCard = ({ selectedPlace, isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.modalView}>
        <PlaceDetails {...selectedPlace} isDetailed={true} />
        {selectedPlace.images ? (
          <Carousel containerStyle={{ height: 176 }}>
            {selectedPlace.images.map((imageUrl, imageIndex) => {
              const isLast = selectedPlace.images.length === imageIndex + 1;
              return (
                <PlaceImageContainer
                  key={imageIndex}
                  imageUrl={imageUrl}
                  isLast={isLast}
                />
              );
            })}
          </Carousel>
        ) : null}
        <View style={styles.actionRow}>
          <SimpleButton
            text={"Directions"}
            containerStyle={{ width: (responsiveWidth(100) - 48) / 2 - 12 }}
            action={() => {}}
            color={"transparent"}
            textColor={constants.firstColor}
            hasBorder={true}
            icon={constants.compassIcon}
            iconSize={16}
          />
          <SimpleButton
            text={"Contact"}
            containerStyle={{ width: (responsiveWidth(100) - 48) / 2 - 12 }}
            action={() => {}}
            color={"transparent"}
            textColor={constants.firstColor}
            hasBorder={true}
            icon={constants.callIcon}
            iconSize={16}
          />
        </View>
      </View>
    </Modal>
  );
};

PlaceCard.propTypes = forbidExtraProps({
  selectedPlace: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
});

const styles = StyleSheet.create({
  modalContainer: {
    margin: 0,
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  modalView: {
    width: responsiveWidth(100) - 48,
    backgroundColor: "white",
    borderRadius: 5
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
    marginBottom: 8,
    paddingHorizontal: 8,
    elevation: 5
  }
});

export default PlaceCard;
