import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity
} from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";

export interface SearchTabPillsProps {
  containerStyle?: ViewStyle;
}

const SearchTabPills = ({ containerStyle }: SearchTabPillsProps) => {
  return (
    <View style={[styles.searchTabPillsContainer, containerStyle]}>
      <BlankSpacer height={16} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity activeOpacity={0.8} style={styles.searchTabPills}>
          <Text style={styles.tabText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchTabPills}>
          <Text style={styles.tabText}>❤️ Honeymoon</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchTabPills}>
          <Text style={styles.tabText}>🏂 Adventure</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchTabPills}>
          <Text style={styles.tabText}>👨‍👩‍👦 Family</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchTabPills}>
          <Text style={styles.tabText}>😎 Solo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchTabPills}>
          <Text style={styles.tabText}>✈️ Visa-on-arrival</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.searchTabPills}>
          <Text style={styles.tabText}>🏖 Beaches</Text>
        </TouchableOpacity>
      </ScrollView>
      <BlankSpacer height={16} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchTabPillsContainer: {
    flexDirection: "column",
    marginLeft: 16
  },
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

export default SearchTabPills;
