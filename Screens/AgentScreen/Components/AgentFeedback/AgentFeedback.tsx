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

export interface IAgentOptionData {
  text: string;
  image: string;
}

interface AgentFeedbackProps {
  containerStyle?: StyleProp<ViewStyle>;
  agentOptionData: IAgentOptionData[];
}

const AgentFeedback = ({
  containerStyle,
  agentOptionData
}: AgentFeedbackProps) => {
  return (
    <View style={[styles.agentFeedbackContainer, containerStyle]}>
      <Text style={styles.titleText}>What did you like the most?</Text>

      <View style={styles.feedbackScrollContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <AgentOption agentOptionData={agentOptionData} />
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  agentFeedbackContainer: {
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

export default AgentFeedback;
