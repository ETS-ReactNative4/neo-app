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
  CONSTANT_black2
} from "../../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
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
    marginVertical: 120,
    width: responsiveWidth(100),
    borderColor: CONSTANT_black2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingVertical: 24
  },

  titleText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15),
    marginBottom: 20
  },

  feedbackScrollContainer: {
    width: responsiveWidth(100)
  },

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

export default AgentFeedback;
