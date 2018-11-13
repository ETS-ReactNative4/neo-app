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
import _ from "lodash";
import dialer from "../../../Services/dialer/dialer";
import directions from "../../../Services/directions/directions";

const PlaceCard = ({ selectedPlace, isVisible, onClose }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      style={styles.modalContainer}
    >
      {!_.isEmpty(selectedPlace) ? (
        <View style={styles.modalView}>
          <PlaceDetails
            name={selectedPlace.name}
            rating={selectedPlace.rating}
            ratingCount={
              selectedPlace.reviews ? selectedPlace.reviews.length : 0
            }
            type={selectedPlace.types ? selectedPlace.types[0] : ""}
            isClosed={
              selectedPlace.openingHours
                ? !selectedPlace.openingHours.openNow
                : false
            }
            opensAt={
              selectedPlace.openingHours
                ? selectedPlace.openingHours.weekdayText
                : ""
            }
            distance={selectedPlace.distance}
            formattedAddress={selectedPlace.formattedAddress}
            isDetailed={true}
          />
          {selectedPlace.photos && selectedPlace.photos.length ? (
            <Carousel containerStyle={{ height: 176 }}>
              {selectedPlace.photos.map((photo, photoIndex) => {
                if (!photo.photoUrl) return null;
                const isLast = selectedPlace.photos.length === photoIndex + 1;
                return (
                  <PlaceImageContainer
                    key={photoIndex}
                    imageUrl={photo.photoUrl}
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
              action={() =>
                directions({
                  latitude: selectedPlace.geometry.location.lat,
                  longitude: selectedPlace.geometry.location.lng
                })
              }
              color={"transparent"}
              textColor={constants.firstColor}
              hasBorder={true}
              icon={constants.compassIcon}
              iconSize={16}
            />
            <SimpleButton
              text={"Contact"}
              containerStyle={{ width: (responsiveWidth(100) - 48) / 2 - 12 }}
              action={() => dialer(selectedPlace.internationalPhoneNumber)}
              color={"transparent"}
              textColor={constants.firstColor}
              hasBorder={true}
              icon={constants.callIcon}
              iconSize={16}
            />
          </View>
        </View>
      ) : null}
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
