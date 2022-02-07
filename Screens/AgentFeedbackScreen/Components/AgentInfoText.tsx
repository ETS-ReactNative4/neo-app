import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import SmartImageV2 from '../../../CommonComponents/SmartImage/SmartImageV2';
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular,
} from '../../../constants/fonts';
import {
  CONSTANT_black1,
  CONSTANT_black2,
  CONSTANT_shade5,
} from '../../../constants/colorPallete';
import {CONSTANT_defaultAgentImage} from '../../../constants/imageAssets';

export interface AgentInfoTextProps {
  containerStyle?: StyleProp<ViewStyle>;
  agentImageContainerStyle?: StyleProp<ImageStyle>;
  agentImage: string | {uri: string};
  agentName?: string;
  agentDescription: string;
}

export interface AgentImageProps {
  agentImage: any;
  agentImageContainerStyle: StyleProp<ImageStyle>;
}

/**
 * Component Memoized to prevent image re-rending
 * while animation.
 */
const AgentImage = ({
  agentImage,
  agentImageContainerStyle,
}: AgentImageProps) => {
  console.log(typeof agentImage);
  return (
    <SmartImageV2
      useFastImage={true}
      resizeMode={'contain'}
      source={agentImage}
      fallbackSource={CONSTANT_defaultAgentImage()}
      style={[styles.agentImage, (typeof agentImage !== 'number' ? {width: 150}: {})]}
      imageStyle={agentImageContainerStyle}
    />
  );
};

const AgentInfoText = ({
  containerStyle,
  agentImageContainerStyle,
  agentImage,
  agentName,
  agentDescription = 'Your travel consultant',
}: AgentInfoTextProps) => {
  return (
    <View style={[styles.infoContainer, containerStyle]}>
      <AgentImage
        agentImage={agentImage}
        agentImageContainerStyle={agentImageContainerStyle}
      />
      {agentName !== undefined && (
        <Text style={styles.agentName}>{agentName}</Text>
      )}
      <Text style={styles.agentDescription}>{agentDescription}</Text>

      <View style={styles.dashedLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  infoContainer: {
    alignItems: 'center',
  },

  agentImage: {
    height: 150,
    marginBottom: 26,
  },

  agentName: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 10,
  },
  agentDescription: {
    color: CONSTANT_black2,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15),
    marginBottom: 32,
  },
  dashedLine: {
    width: 54,
    height: 1,
    backgroundColor: CONSTANT_shade5,
    marginBottom: 32,
  },
});

export default AgentInfoText;
