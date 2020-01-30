import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  ViewStyle,
  StyleProp
} from "react-native";

export interface MasonryViewProps {
  children: React.ReactNode[];
  columns?: number;
  oddColumnStyle?: StyleProp<ViewStyle>;
  evenColumnStyle?: StyleProp<ViewStyle>;
  columnStyle?: StyleProp<ViewStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

/**
 * Accepts an array of children and splits them into array
 * of n - number of items
 * based on the column property
 *
 * Used To display a masonry list of given columns
 */
const MasonryView = ({
  children,
  columns = 2,
  oddColumnStyle,
  evenColumnStyle,
  columnStyle,
  containerStyle
}: MasonryViewProps) => {
  const masonryChildren = children.reduce(
    (collection: React.ReactNode[][], child, childIndex) => {
      const item = childIndex % columns;
      if (collection[item]) {
        collection[item].push(child);
      } else {
        collection[item] = [];
        collection[item].push(child);
      }
      return collection;
    },
    []
  );

  return (
    <View style={[styles.masonryContainer, containerStyle]}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        style={styles.scrollContainer}
      >
        {masonryChildren.map((masonryColumn, masonryColumnIndex) => {
          return (
            <View
              style={[
                columnStyle,
                masonryColumnIndex % 2 === 0 ? evenColumnStyle : oddColumnStyle
              ]}
            >
              {masonryColumn.map((masonryColumnItem: React.ReactNode) => {
                return masonryColumnItem;
              })}
            </View>
          );
        })}
        <View />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  masonryContainer: {
    flex: 1
  },
  scrollContentContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  scrollContainer: {}
});

export default MasonryView;
