import React from "react";
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle
} from "react-native";
import SmartImageV2 from "../../../CommonComponents/SmartImage/SmartImageV2";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_black2,
  CONSTANT_shade5
} from "../../../constants/colorPallete";

interface AgentInfoTextProps {
  containerStyle?: StyleProp<ViewStyle>;
  agentImageContainerStyle?: StyleProp<ImageStyle>;
  agentImage: string;
  agentName: string;
  agentDescription: string;
}

const AgentInfoText = ({
  containerStyle,
  agentImageContainerStyle,
  agentImage = "https://i.imgur.com/Uq2zUZA.png",
  agentName = "Mahesh Raja",
  agentDescription = "Your travel consultant"
}: AgentInfoTextProps) => {
  return (
    <View style={[styles.infoContainer, containerStyle]}>
      <SmartImageV2
        resizeMode={"cover"}
        source={{ uri: agentImage }}
        fallbackSource={{ uri: agentImage }}
        style={styles.agentImage}
        imageStyle={agentImageContainerStyle}
      />
      <Text style={styles.agentName}>{agentName}</Text>
      <Text style={styles.agentDescription}>{agentDescription}</Text>

      <View style={styles.dashedLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: "center"
  },

  agentImage: {
    width: 124,
    height: 124,
    marginBottom: 16
  },

  agentName: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 4
  },
  agentDescription: {
    color: CONSTANT_black2,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15),
    marginBottom: 32
  },
  dashedLine: {
    width: 54,
    height: 1,
    backgroundColor: CONSTANT_shade5,
    marginBottom: 32
  }
});

export default AgentInfoText;
