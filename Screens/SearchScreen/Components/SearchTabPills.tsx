import React from "react";
import { View, ViewStyle, StyleSheet, ScrollView } from "react-native";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import CategoryPill from "./CategoryPill";

export interface SearchTabPillsProps {
  containerStyle?: ViewStyle;
}

const SearchTabPills = ({ containerStyle }: SearchTabPillsProps) => {
  return (
    <View style={[styles.searchTabPillsContainer, containerStyle]}>
      <BlankSpacer height={16} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <CategoryPill text={"All"} action={() => null} />
        <CategoryPill emoji={"❤️"} text={"Honeymoon"} action={() => null} />
      </ScrollView>
      <BlankSpacer height={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchTabPillsContainer: {
    flexDirection: "column",
    marginLeft: 16
  }
});

export default SearchTabPills;
