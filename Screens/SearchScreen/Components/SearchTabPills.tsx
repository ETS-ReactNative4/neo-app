import React from "react";
import { View, ViewStyle, StyleSheet, ScrollView } from "react-native";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import CategoryPill from "./CategoryPill";
import { ISearchCategory } from "../Search";
import createReadableText from "../../../Services/createReadableText/createReadableText";

export interface SearchTabPillsProps {
  containerStyle?: ViewStyle;
  categories: ISearchCategory[];
  selectedCategory: ISearchCategory;
  selectCategory: (param: ISearchCategory) => any;
}

const SearchTabPills = ({
  containerStyle,
  categories,
  selectCategory,
  selectedCategory
}: SearchTabPillsProps) => {
  return (
    <View style={[styles.searchTabPillsContainer, containerStyle]}>
      <BlankSpacer height={16} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category, categoryIndex) => {
          const onClick = () => selectCategory(category);

          return (
            <CategoryPill
              key={categoryIndex}
              text={createReadableText(category.text)}
              emoji={category.emoji}
              action={onClick}
              isSelected={category.text === selectedCategory.text}
            />
          );
        })}
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
