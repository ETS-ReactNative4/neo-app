import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";
import Box from "./Components/Box";

const Carousel = ({
  containerStyle,
  data,
  firstMargin,
  children,
  onScroll
}) => {
  let scrollProps = {};
  if (onScroll) scrollProps["onScroll"] = () => onScroll();
  return (
    <View style={[styles.scrollContainer, containerStyle]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center" }}
        {...scrollProps}
      >
        {firstMargin ? <View style={{ width: firstMargin }} /> : null}
        {children
          ? children
          : data.map((item, index) => {
              return <Box key={index} index={index} data={item} />;
            })}
      </ScrollView>
    </View>
  );
};

Carousel.propTypes = {
  containerStyle: PropTypes.object,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
        .isRequired,
      action: PropTypes.func.isRequired
    })
  ),
  firstMargin: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element),
  onScroll: PropTypes.func
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: 160
  },
  scrollView: {}
});

export default Carousel;
