import React, { Fragment } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { CONSTANT_black1 } from "../../../../../constants/colorPallete";
import { CONSTANT_fontCustom } from "../../../../../constants/fonts";
import SmartImageV2 from "../../../../../CommonComponents/SmartImage/SmartImageV2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CONSTANT_primaryRegular } from "../../../../../constants/fonts";
import { IAgentOptionData } from "../AgentFeedback";

interface AgentOptionProps {
  agentOptionData: IAgentOptionData[];
}

const AgentOption = ({ agentOptionData = [] }: AgentOptionProps) => {
  return (
    <Fragment>
      {agentOptionData.map((optionData, index) => {
        return (
          <TouchableOpacity key={index}>
            <View style={styles.feedbackOptionContainer}>
              <SmartImageV2
                source={{ uri: optionData.image }}
                fallbackSource={{ uri: optionData.image }}
                style={[styles.feedbackImage, styles.activeOpacity]}
              />

              <Text style={[styles.feedbackText, styles.activeOpacity]}>
                {optionData.text}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </Fragment>
  );
};

const styles = StyleSheet.create({
  feedbackOptionContainer: {
    width: responsiveWidth(100) / 4,
    flexDirection: "column",
    alignItems: "center"
  },

  feedbackImage: {
    width: 56,
    height: 56,
    borderRadius: 25,
    opacity: 0.6,
    marginBottom: 8
  },

  feedbackText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15),
    opacity: 0.3,
    textAlign: "center"
  },

  activeOpacity: {
    opacity: 1
  }
});

export default AgentOption;
