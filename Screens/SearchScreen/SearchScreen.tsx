import React from "react";
import { View, ViewStyle, StyleSheet, Text } from "react-native";
import SearchTabPills from "./Components/SearchTabPills";
import BlankSpacer from "../../CommonComponents/BlankSpacer/BlankSpacer";
import {
  CONSTANT_shade1,
  CONSTANT_shade3,
  CONSTANT_black1
} from "../../constants/colorPallete";
import Icon from "../../CommonComponents/Icon/Icon";
import { CONSTANT_arrowRight } from "../../constants/imageAssets";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";

export interface SearchScreenProps {
  containerStyle?: ViewStyle;
}

const SearchScreen = ({ containerStyle }: SearchScreenProps) => {
  return (
    <View style={[styles.searchScreenContainerStyle, containerStyle]}>
      <SearchTabPills />
      <BlankSpacer height={1} containerStyle={styles.blankSpacerStyle} />

      <BlankSpacer height={8} />

      <View style={styles.searchItineraryWrapper}>
        <View>
          <Text>❤️</Text>
        </View>

        <View style={styles.searchItineraryTextWrapper}>
          <Text style={styles.searchItineraryText}>
            An epic 16 night Europe itinerary to rekindle the wonder in your
            eyes
          </Text>
          <View style={styles.arrowRightStyle}>
            <Icon
              name={CONSTANT_arrowRight}
              size={14}
              color={CONSTANT_shade1}
            />
          </View>
        </View>
      </View>

      <View style={styles.searchItineraryWrapper}>
        <View>
          <Text>❤️</Text>
        </View>

        <View style={styles.searchItineraryTextWrapper}>
          <Text style={styles.searchItineraryText}>
            An epic 16 night Europe itinerary to rekindle the wonder in your
            eyes
          </Text>
          <View style={styles.arrowRightStyle}>
            <Icon
              name={CONSTANT_arrowRight}
              size={14}
              color={CONSTANT_shade1}
            />
          </View>
        </View>
      </View>

      <View style={styles.searchItineraryWrapper}>
        <View>
          <Text>❤️</Text>
        </View>

        <View style={styles.searchItineraryTextWrapper}>
          <Text style={styles.searchItineraryText}>
            An epic 16 night Europe itinerary to rekindle the wonder in your
            eyes
          </Text>
          <View style={styles.arrowRightStyle}>
            <Icon
              name={CONSTANT_arrowRight}
              size={14}
              color={CONSTANT_shade1}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchScreenContainerStyle: {
    flex: 1
  },
  blankSpacerStyle: {
    backgroundColor: CONSTANT_shade3
  },

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

export default SearchScreen;
