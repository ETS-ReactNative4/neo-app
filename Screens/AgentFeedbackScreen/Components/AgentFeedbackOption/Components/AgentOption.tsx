import React, { Fragment } from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { CONSTANT_shade1 } from "../../../../../constants/colorPallete";
import { CONSTANT_fontCustom } from "../../../../../constants/fonts";
import SmartImageV2 from "../../../../../CommonComponents/SmartImage/SmartImageV2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CONSTANT_primaryRegular } from "../../../../../constants/fonts";
import { IAgentOptionData } from "../AgentFeedbackOption";

interface AgentOptionProps {
  agentOptionData: IAgentOptionData[];
}

const AgentOption = ({ agentOptionData = [] }: AgentOptionProps) => {
  return (
    <Fragment>
      {agentOptionData.map((optionData, index) => {
        return (
          <TouchableOpacity key={index} activeOpacity={0.8}>
            <View style={styles.feedbackOptionContainer}>
              <SmartImageV2
                source={{ uri: optionData.image }}
                fallbackSource={{ uri: optionData.image }}
                style={[styles.feedbackImage]}
              />

              <Text style={[styles.feedbackText]}>{optionData.text}</Text>
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
    marginBottom: 8
  },

  feedbackText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 15),
    textAlign: "center",
    paddingHorizontal: 8
  }
});

export default AgentOption;
