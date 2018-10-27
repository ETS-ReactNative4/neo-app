import React from "react";
import { View, StyleSheet } from "react-native";
import Step from "./Components/Step";
import PropTypes from "prop-types";
import Connector from "./Components/Connector";

const VisaProgressIndicator = ({ totalSteps, completed }) => {
  const stepArray = Array.from(Array(totalSteps).keys());
  console.log(stepArray);
  return (
    <View style={styles.progressIndicatorContainer}>
      {stepArray.map((step, stepIndex) => {
        const isLast = stepArray.length - 1 === stepIndex;
        const isActive = stepIndex + 1 < completed;
        const isLastActive = stepIndex + 1 === completed;

        return [
          <Step isActive={isActive} isLastActive={isLastActive} />,
          !isLast ? (
            <Connector isActive={isActive} isLastActive={isLastActive} />
          ) : null
        ];
      })}
    </View>
  );
};

VisaProgressIndicator.propTypes = {
  totalSteps: PropTypes.number.isRequired,
  completed: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  progressIndicatorContainer: {
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default VisaProgressIndicator;
