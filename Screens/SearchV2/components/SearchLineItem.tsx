import React, {ReactNode} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../constants/fonts';
import {CONSTANT_dealsFlare} from '../../../constants/imageAssets';
import {Tag} from './Tag';
import {ThemeCard} from './ThemeCard';
import LottieView from 'lottie-react-native';

type SearchLineItemPropsType = {
  text: string | ReactNode;
  tagText?: string;
  image?: string;
  action: () => unknown;
  icon?: string;
  noBorder?: boolean;
  isDeals?: boolean;
};
export const SearchLineItem = ({
  text,
  tagText,
  image,
  action,
  icon,
  noBorder,
  isDeals,
}: SearchLineItemPropsType) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={styles.container}>
      <ThemeCard
        boxContainerStyle={styles.themeCard}
        image={image}
        icon={icon}
      />
      <View style={[styles.content, noBorder ? styles.noBorder : {}]}>
        <View style={styles.textWrapper}>
          <Text style={styles.text}>{text}</Text>
        </View>
        {isDeals ? (
          <View style={styles.deals}>
            <LottieView source={CONSTANT_dealsFlare()} autoPlay loop />
          </View>
        ) : null}
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
    marginHorizontal: 20,
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
  noBorder: {
    borderBottomWidth: 0,
  },
  deals: {
    marginVertical: 6,
    width: 12,
    height: 25,
  },
  themeCard: {
    width: 44,
    height: 44,
  },
});
