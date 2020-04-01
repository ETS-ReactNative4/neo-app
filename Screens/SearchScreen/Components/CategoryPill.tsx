import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";

export interface CategoryPillProps {
  emoji?: string;
  text: string;
  action: () => any;
}

const CategoryPill = ({
  emoji = "",
  text = "",
  action = () => null
}: CategoryPillProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={action}
      style={styles.searchTabPills}
    >
      <Text style={styles.tabText}>
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
  tabText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    color: "rgba(119, 119, 119, 1)"
  }
});

export default CategoryPill;
