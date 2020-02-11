import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import {
  CONSTANT_shade1,
  CONSTANT_shade5,
  CONSTANT_firstColorBackground,
  CONSTANT_firstColor
} from "../../../../../constants/colorPallete";
import { CONSTANT_fontCustom } from "../../../../../constants/fonts";
import SmartImageV2 from "../../../../../CommonComponents/SmartImage/SmartImageV2";
import { TouchableOpacity } from "react-native-gesture-handler";
import { CONSTANT_primaryRegular } from "../../../../../constants/fonts";
import { IQuality } from "../../../../../mobx/SOFeedback";
import { CONSTANT_defaultPlaceImage } from "../../../../../constants/imageAssets";

export interface AgentOptionProps {
  agentQuality: IQuality;
  isSelected: boolean;
  onPress: (quality: string) => any;
}

const AgentOption = ({
  agentQuality,
  isSelected,
  onPress
}: AgentOptionProps) => {
  const clickedOption = () => {
    onPress(agentQuality.qualityText);
  };

  return (
    <TouchableOpacity onPress={clickedOption} activeOpacity={0.8}>
      <View style={styles.feedbackOptionContainer}>
        <View
          style={[
            styles.imageWrapper,
            isSelected ? styles.imageWrapperSelected : null
          ]}
        >
          <SmartImageV2
            source={{ uri: agentQuality.qualityImage }}
            fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
            style={[
              styles.feedbackImage,
              isSelected ? styles.isImageSelected : null
            ]}
            resizeMode={"contain"}
          />
        </View>
        <Text style={styles.feedbackText}>{agentQuality.qualityText}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  feedbackOptionContainer: {
    width: responsiveWidth(100) / 4,
    flexDirection: "column",
    alignItems: "center"
  },

  imageWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    backgroundColor: CONSTANT_shade5
  },

  imageWrapperSelected: {
    backgroundColor: CONSTANT_firstColorBackground
  },

  feedbackImage: {
    width: 32,
    height: 32
  },

  isImageSelected: {
    tintColor: CONSTANT_firstColor
  },

  feedbackText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13, 15),
    textAlign: "center",
    paddingHorizontal: 8
  }
});

export default AgentOption;
