import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import constants from "../../../constants/constants";
import InfoDot from "../../../CommonComponents/InfoDot/InfoDot";

/**
 * These constants are needed to calculate the progress
 * vertical line
 */
const stageMarginSpacing = 32;
const infoDotRadius = 7.5;

const VisaStagesCard = ({
  containerStyle = StyleSheet.create({}),
  title = "",
  stages = []
}) => {
  return (
    <View style={[styles.visaStagesCardContainer, containerStyle]}>
      <View>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.stagesListContainer}>
        {stages.map((stage, stageIndex) => {
          const isFirst = stageIndex === 0;
          const isLast = stageIndex === stages.length - 1;
          return (
            <View
              style={[
                styles.visaStageWrapper,
                !isFirst && !isLast ? styles.stageMargins : {} // apply margin to the stage that is neither in first and last position
              ]}
              key={stageIndex}
            >
              {/* The progress line is drawn from bottom to top on all stages except the first one */}
              {!isFirst ? <View style={styles.progressLine} /> : null}
              <View>
                <InfoDot dotRadius={infoDotRadius} color={constants.shade5} />
              </View>
              <View style={styles.stageTextWrapper}>
                <Text style={styles.stageText}>{stage.stageText}</Text>
              </View>
              <View style={styles.dateTextWrapper}>
                <Text style={styles.dateText}>{stage.dateText}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

VisaStagesCard.propTypes = {
  containerStyle: ViewPropTypes.style,
  title: PropTypes.string.isRequired,
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      stageText: PropTypes.string.isRequired,
      dateText: PropTypes.string.isRequired
    })
  ).isRequired
};

const styles = StyleSheet.create({
  visaStagesCardContainer: {
    padding: 24,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: constants.shade5,
    backgroundColor: "white"
  },
  stageMargins: {
    marginVertical: stageMarginSpacing
  },
  progressLine: {
    width: 3,
    height: stageMarginSpacing + 4,
    position: "absolute",
    backgroundColor: constants.shade5,
    top: -stageMarginSpacing - 2,
    left: infoDotRadius / 2 + 2
  },
  titleText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.black2
  },
  stagesListContainer: {
    marginTop: 16
  },
  visaStageWrapper: {
    flexDirection: "row",
    alignItems: "center"
  },
  stageTextWrapper: {
    flex: 1,
    marginLeft: 16,
    marginTop: 2
  },
  stageText: {
    ...constants.fontCustom(constants.primaryRegular, 16),
    color: constants.black1
  },
  dateTextWrapper: {
    flex: 1,
    alignItems: "flex-end",
    marginTop: 2
  },
  dateText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black1
  }
});

export default VisaStagesCard;
