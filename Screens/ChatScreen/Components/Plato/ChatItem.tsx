import React, {useContext, useEffect, useRef, useState} from 'react';
import {StyleSheet, Animated} from 'react-native';
import MessageCard from './MessageCard';
import Bubble from './Bubble';
import {PlatoContext, ChatMessageType} from '../../Context/Plato';
import ChipsCard from './ChipsCard';
import {Text} from '@pyt/micros';
import moment from 'moment';

export type ChatItemProps = {
  item: ChatMessageType;
  scrollToEnd: () => void;
};

const ChatItem = ({item, scrollToEnd}: ChatItemProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [animationDone, setAnimationDone] = useState<boolean>(false);
  const {hiddenMessages} = useContext(PlatoContext);

  useEffect(() => {
    if (item.type !== 'bubble' && item.source !== 'list') {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
        delay: item.animationDelay,
      }).start(() => {
        setAnimationDone(true);
      });
    } else {
      fadeAnim.setValue(1);
    }
  }, [fadeAnim, item, setAnimationDone]);

  if (hiddenMessages.includes(`chat_item_${item.id}`)) {
    return null;
  }

  return item.type === 'bubble' ? (
    <Bubble item={item} scrollToEnd={scrollToEnd} />
  ) : (
    <Animated.View
      style={[
        styles.row,
        {
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [35, 0],
              }),
            },
          ],
          opacity: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ]}>
      {item.type === 'text' && (
        <>
          {item.date && (
            <Text
              marginHorizontal={20}
              alignSelf={item.bot ? 'flex-start' : 'flex-end'}
              fontSize={8}>
              {moment(item.date).format('DD/MM/YYYY h:mm A')}
            </Text>
          )}
          <MessageCard item={item} animationDone={animationDone} />
        </>
      )}
      {item.type === 'chips' && (
        <ChipsCard
          item={item}
          animationDone={animationDone}
          id={`chat_item_${item.id}`}
        />
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 10,
  },
});

export default ChatItem;
