import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import PropTypes from "prop-types";
import { responsiveWidth } from "react-native-responsive-dimensions";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

const JournalDayCard = ({
  image,
  info,
  action,
  isActivated,
  editAction,
  deleteAction
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={styles.journalDayCardContainer}
    >
      {image ? (
        <ImageBackground
          blurRadius={isActivated ? 0 : 5}
          source={image}
          resizeMode={"cover"}
          style={styles.dayCardImage}
        >
          {isActivated ? null : (
            <View style={styles.imageOverlay}>
              <Icon name={constants.addImageIcon} color={"white"} size={24} />
            </View>
          )}
        </ImageBackground>
      ) : null}
      <Text numberOfLines={2} ellipsizeMode={"tail"} style={styles.infoText}>
        {info}
      </Text>
      {isActivated ? (
        <View style={styles.actionBar}>
          <SimpleButton
            color={"transparent"}
            iconSize={15}
            textStyle={{ fontSize: 15 }}
            text={"Edit"}
            action={editAction}
            containerStyle={{ width: null, marginHorizontal: 16 }}
            textColor={constants.firstColor}
            icon={constants.trashCanIcon}
          />
          <SimpleButton
            color={"transparent"}
            iconSize={15}
            textStyle={{ fontSize: 15 }}
            text={"Delete"}
            action={deleteAction}
            containerStyle={{ width: null, marginLeft: 8 }}
            textColor={constants.firstColor}
            icon={constants.trashCanIcon}
          />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

JournalDayCard.propTypes = forbidExtraProps({
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  info: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  isActivated: PropTypes.bool,
  editAction: PropTypes.func,
  deleteAction: PropTypes.func
});

const styles = StyleSheet.create({
  journalDayCardContainer: {
    width: responsiveWidth(100) - 48,
    marginHorizontal: 24,
    backgroundColor: "white",
    marginVertical: 16,
    borderRadius: 2,
    overflow: "hidden"
  },
  dayCardImage: {
    backgroundColor: "white",
    height: 164
  },
  imageOverlay: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.15)"
  },
  infoText: {
    padding: 16,
    ...constants.fontCustom(constants.primaryRegular, 14, 20),
    color: constants.black1
  },
  actionBar: {
    flexDirection: "row"
  }
});

export default JournalDayCard;
