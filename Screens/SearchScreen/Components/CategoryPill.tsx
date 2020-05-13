import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import {
  CONSTANT_firstColor,
  CONSTANT_white
} from "../../../constants/colorPallete";

export interface CategoryPillProps {
  emoji?: string;
  text: string;
  action: () => any;
  isSelected: boolean;
}

const CategoryPill = ({
  emoji = "",
  text = "",
  action = () => null,
  isSelected
}: CategoryPillProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={[styles.searchTabPills, isSelected ? styles.selectedPill : null]}
    >
      <Text style={[styles.tabText, isSelected ? styles.selectedText : null]}>
        {emoji ? emoji + " " : ""}
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  searchTabPills: {
    alignItems: "center",
    padding: 8,
    borderWidth: 1,
    borderColor: "rgba(212, 212, 212, 1)",
    borderRadius: 8,
    minWidth: 50,
    marginRight: 8
  },
  selectedPill: {
    backgroundColor: CONSTANT_firstColor,
    borderColor: CONSTANT_firstColor
  },
  tabText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    color: "rgba(119, 119, 119, 1)"
  },
  selectedText: {
    color: CONSTANT_white
  }
});

export default CategoryPill;
