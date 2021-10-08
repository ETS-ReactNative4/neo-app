import React, {useCallback, useContext, useRef} from 'react';
import {Box} from '@pyt/micros';
import {FlatList, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {PlatoContext, ChatMessageType} from '../../Context/Plato';
import ChatItem from './ChatItem';

const Content = () => {
  const {messages} = useContext(PlatoContext);
  const flatListRef = useRef<FlatList<ChatMessageType>>(null);

  const scrollMessageEnd = useCallback(() => {
    if (flatListRef.current !== null) {
      flatListRef.current.scrollToEnd({
        animated: true,
      });
    }
  }, [flatListRef]);

  const renderItem = ({item}: {item: ChatMessageType}) => {
    return <ChatItem item={item} scrollToEnd={scrollMessageEnd} />;
  };
  return (
    <KeyboardAvoidingView style={styles.flex}>
      <Box flex={1}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={messages}
          ref={flatListRef}
          renderItem={renderItem}
          keyExtractor={item => `chat_item_${item.id}`}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToEnd({animated: true})
          }
          onLayout={() => flatListRef.current?.scrollToEnd({animated: true})}
          onScrollToIndexFailed={() => {
            flatListRef.current?.scrollToEnd({
              animated: true,
            });
          }}
        />
      </Box>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: {flex: 1},
});

export default Content;
