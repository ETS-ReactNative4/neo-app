import {Box} from '@pyt/micros';
import React, {useEffect} from 'react';
import {CONSTANT_PlatoChatBubbleAnimation} from '../../../../constants/imageAssets';
import {ChatMessageType} from '../../Context/Plato';
import LottieView from 'lottie-react-native';

type Props = {
  item: ChatMessageType;
  scrollToEnd?: () => void;
};

const Bubble = ({item, scrollToEnd}: Props) => {
  useEffect(() => {
    if (scrollToEnd) {
      scrollToEnd();
    }
  });
  return (
    <Box
      height={75}
      width={75}
      alignSelf={item.bot ? 'flex-start' : 'flex-end'}
      marginVertical={item.bot ? 5 : 15}
      paddingHorizontal={20}
      marginHorizontal={20}>
      <LottieView source={CONSTANT_PlatoChatBubbleAnimation} autoPlay loop />
    </Box>
  );
};

export default Bubble;
