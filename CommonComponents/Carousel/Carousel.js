import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import PropTypes from "prop-types";
import Box from "../Box/Box";
import constants from "../../constants/constants";

const Carousel = ({
  containerStyle,
  data,
  firstMargin,
  children,
  onScroll
}) => {
  let scrollProps = {};
  const gradients = [
    constants.secondGradientAlpha,
    constants.thirdGradientAlpha,
    constants.fourthGradientAlpha,
    constants.fifthGradientAlpha,
    constants.sixthGradientAlpha,
    constants.seventhGradientAlpha
  ];

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
              const len = gradients.length;
              let gradientColor;
              if (index < len) {
                gradientColor = gradients[index];
              } else {
                gradientColor = gradients[index % len];
              }
              return (
                <Box
                  key={index}
                  index={index}
                  data={item}
                  gradientColor={item.gradientColor || gradientColor}
                />
              );
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
      action: PropTypes.func.isRequired,
      gradientColor: PropTypes.oneOfType([PropTypes.string, PropTypes.func])
    })
  ),
  firstMargin: PropTypes.number,
  children: PropTypes.arrayOf(PropTypes.element),
  onScroll: PropTypes.func
};

const styles = StyleSheet.create({
  scrollContainer: {},
  scrollView: {}
});

export default Carousel;
