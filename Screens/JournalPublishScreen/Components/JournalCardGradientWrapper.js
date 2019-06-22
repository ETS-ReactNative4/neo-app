import React, { Fragment } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../Services/PropTypeValidation/forbidExtraProps";

const JournalCardGradientWrapper = ({ enableGradient, children }) => {
  const Wrapper = enableGradient ? LinearGradient : Fragment;
  const wrapperProps = enableGradient
    ? {
        locations: [0.15, 0.35, 0.5, 1],
        colors: [
          "rgba(255,255,255,0)",
          "rgba(255,255,255,0.6)",
          "rgba(255,255,255,0.8)",
          "rgba(255,255,255,1)"
        ],
        style: styles.gradientView
      }
    : {
        locations: [0, 0, 0, 0],
        colors: [
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0)"
        ],
        style: styles.gradientView
      };
  return <LinearGradient {...wrapperProps}>{children}</LinearGradient>;
};

JournalCardGradientWrapper.propTypes = forbidExtraProps({
  enableGradient: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired
});

const styles = StyleSheet.create({
  gradientView: {
    flex: 1,
    justifyContent: "space-between"
  }
});

export default JournalCardGradientWrapper;
