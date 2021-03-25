import React, {ReactNode} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../constants/fonts';
import {Tag} from './Tag';
import {ThemeCard} from './ThemeCard';

type SearchLineItemPropsType = {
  text: string | ReactNode;
  tagText?: string;
  image?: string;
  action: () => unknown;
  icon?: string;
};
export const SearchLineItem = ({
  text,
  tagText,
  image,
  action,
  icon,
}: SearchLineItemPropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={styles.container}>
      <ThemeCard
        boxContainerStyle={{width: 44, height: 44}}
        image={image}
        icon={icon}
      />
      <View style={styles.content}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{text}</Text>
        </View>
        {tagText ? (
          <View>
            <Tag text={tagText} />
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
  },
  content: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textWrapper: {
    marginRight: 4,
    flexShrink: 1,
  },
  text: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15, 22),
    color: '#333333',
  },
});
