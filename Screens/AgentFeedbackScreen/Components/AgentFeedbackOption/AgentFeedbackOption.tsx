import React from "react";
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Text,
  ScrollView
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import {
  CONSTANT_black1,
  CONSTANT_shade5
} from "../../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../../constants/fonts";
import AgentOption from "./Components/AgentOption";
import { IQuality } from "../../../../mobx/SOFeedback";

interface AgentFeedbackOptionProps {
  containerStyle?: StyleProp<ViewStyle>;
  agentOptionData: IQuality[];
  selectedQualities: string[];
  selectQuality: (quality: string) => any;
  unselectQuality: (quality: string) => any;
}

const AgentFeedbackOption = ({
  containerStyle,
  agentOptionData = [],
  selectedQualities = [],
  selectQuality = () => null,
  unselectQuality = () => null
}: AgentFeedbackOptionProps) => {
  return (
    <View style={[styles.agentFeedbackOptionContainer, containerStyle]}>
      <Text style={styles.titleText}>What did you like the most?</Text>
      <View style={styles.feedbackScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {agentOptionData.map((agentQuality, qualityIndex) => {
            const isSelected =
              selectedQualities.indexOf(agentQuality.qualityText) > -1;

            const selectOption = () => {
              selectQuality(agentQuality.qualityText);
            };

            const unselectOption = () => {
              unselectQuality(agentQuality.qualityText);
            };

            return (
              <AgentOption
                key={qualityIndex}
                agentQuality={agentQuality}
                isSelected={isSelected}
                onPress={isSelected ? unselectOption : selectOption}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  agentFeedbackOptionContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: responsiveWidth(100),
    borderColor: CONSTANT_shade5,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 24
  },

  titleText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13),
    marginBottom: 20
  },

  feedbackScrollContainer: {
    width: responsiveWidth(100)
  }
});

export default AgentFeedbackOption;
