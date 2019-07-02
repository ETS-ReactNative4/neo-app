import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../../Services/PropTypeValidation/forbidExtraProps";

const JournalActionRow = ({
  publishJournal = () => {},
  shareJournal = () => {},
  viewJournal = () => {},
  addStory = () => {},
  isJournalPublished = false
}) => {
  return (
    <View style={styles.journalActionRowContainer}>
      <TouchableOpacity
        onPress={addStory}
        activeOpacity={0.8}
        style={styles.actionWrapper}
      >
        <View style={styles.iconWrapper}>
          <Icon name={constants.addIcon} size={12} color={"white"} />
        </View>
        <Text style={styles.actionText}>{"Add new story"}</Text>
      </TouchableOpacity>
      {isJournalPublished ? (
        <TouchableOpacity
          onPress={viewJournal}
          activeOpacity={0.8}
          style={styles.actionWrapper}
        >
          <View style={styles.iconWrapper}>
            <Icon name={constants.eyeIcon} size={12} color={"white"} />
          </View>
          <Text style={styles.actionText}>{"View Journal"}</Text>
        </TouchableOpacity>
      ) : (
        <View />
      )}
      <TouchableOpacity
        onPress={isJournalPublished ? shareJournal : publishJournal}
        activeOpacity={0.8}
        style={styles.actionWrapper}
      >
        <View style={styles.iconWrapper}>
          <Icon
            name={
              isJournalPublished ? constants.shareIcon : constants.uploadIcon
            }
            size={12}
            color={"white"}
          />
        </View>
        <Text style={styles.actionText}>
          {isJournalPublished ? "Share" : "Publish"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

JournalActionRow.propTypes = forbidExtraProps({
  publishJournal: PropTypes.func.isRequired,
  shareJournal: PropTypes.func.isRequired,
  viewJournal: PropTypes.func.isRequired,
  addStory: PropTypes.func.isRequired,
  isJournalPublished: PropTypes.bool.isRequired
});

const styles = StyleSheet.create({
  journalActionRowContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    marginHorizontal: 24,
    paddingVertical: 16
  },
  leftSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  rightSection: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end"
  },
  actionWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: 80
  },
  actionText: {
    paddingTop: 8,
    ...constants.fontCustom(constants.primaryRegular, 12, 12),
    color: constants.shade1
  },
  iconWrapper: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: constants.black1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default JournalActionRow;
