import React from 'react';
import {
  ViewStyle,
  StyleProp,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../../constants/fonts';
import {theme} from '../../../../constants/colorPallete';

import {ChatMessageType} from '../../Context/Plato';

interface MessageCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  item: ChatMessageType;
  animationDone: boolean;
  loading?: boolean;
}

const MessageCard = ({containerStyle, item, loading}: MessageCardProps) => {
  return (
    <View
      style={[
        styles.chatItem,
        containerStyle,
        {
          alignSelf: item.bot ? 'flex-start' : 'flex-end',
          backgroundColor: item.bot ? '#EBEBEB' : '#B2EEDA',
          borderTopLeftRadius: item.bot ? 4 : 24,
          borderTopRightRadius: item.bot ? 24 : 4,
        },
      ]}>
      <Text style={styles.message}>
        {decodeURIComponent(item.message as string)}
      </Text>
      {loading && <ActivityIndicator color={theme.colors.primary001} />}
    </View>
  );
};

const styles = StyleSheet.create({
  chatItem: {
    maxWidth: '85%',
    borderRadius: 24,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    flexDirection: 'row',
    marginVertical: 5,
  },
  message: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15),
    lineHeight: 23,
    color: theme.colors.neutral007,
  },
});
export default MessageCard;
