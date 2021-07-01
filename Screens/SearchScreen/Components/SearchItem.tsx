import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import {
  CONSTANT_shade1,
  CONSTANT_black1
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";

export interface SearchItemProps {
  emoji: string;
  title: string;
  action: () => any;
}

const SearchItem = ({ emoji, title, action }: SearchItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.2}
      onPress={action}
      style={styles.searchItineraryWrapper}
    >
      <View>
        <Text>{emoji}</Text>
      </View>

      <View style={styles.searchItineraryTextWrapper}>
        <Text style={styles.searchItineraryText}>{title}</Text>
        <View style={styles.arrowRightStyle}>
          <Icon name={CONSTANT_arrowRight} size={14} color={CONSTANT_shade1} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchItineraryWrapper: {
    flexDirection: "row",
    paddingTop: 16,
    marginHorizontal: 16
  },
  searchItineraryTextWrapper: {
    flex: 1,
    flexDirection: "row",
    paddingBottom: 16,
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(242, 242, 242, 1)"
  },
  searchItineraryText: {
    flex: 1,
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15, 20),
    paddingRight: 48
  },
  arrowRightStyle: {
    marginTop: 6
  }
});

export default SearchItem;
