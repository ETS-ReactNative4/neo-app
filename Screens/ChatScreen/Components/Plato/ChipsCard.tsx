import React, {useEffect} from 'react';
import {
  ViewStyle,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  Keyboard,
} from 'react-native';
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
} from '../../../../constants/fonts';
import {CONSTANT_white, theme} from '../../../../constants/colorPallete';
import {ChatMessageType} from '../../Context/Plato';

interface ChipsCardProps {
  id: string;
  containerStyle?: StyleProp<ViewStyle>;
  item: ChatMessageType;
  bgColor?: string;
  animationDone: boolean;
}

const ChipsCard = ({id, item, animationDone}: ChipsCardProps) => {
  useEffect(() => {
    Keyboard.dismiss();
  }, []);
  return (
    <View style={styles.chipCardContainer}>
      {item?.options &&
        item.options.map((chip, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                item.action && item.action(chip.title, chip.id, id);
              }}
              style={[
                styles.chipContainer,
                animationDone ? styles.shadow : {},
              ]}>
              <Text style={styles.titleStyle}>
                {decodeURIComponent(chip.title)}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  chipCardContainer: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipContainer: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: theme.colors.primary005,
  },
  shadow: {
    shadowColor: 'rgba(0, 119, 79, 0.45)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 10,
  },
  imageContainerStyle: {
    width: 15,
    height: 15,
    marginRight: 3,
  },
  titleStyle: {
    color: CONSTANT_white,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    lineHeight: 20,
  },
});
export default ChipsCard;
