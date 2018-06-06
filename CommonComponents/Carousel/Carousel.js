import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  Text
} from "react-native";
import constants from "../../constants/constants";
import PropTypes from "prop-types";
import LinearGradient from "react-native-linear-gradient";

const Box = ({ data, firstMargin, index }) => {
  const gradients = [
    constants.secondGradientAlpha,
    constants.thirdGradientAlpha,
    constants.fourthGradientAlpha,
    constants.fifthGradientAlpha,
    constants.sixthGradientAlpha,
    constants.seventhGradientAlpha
  ];

  let gradientColor;
  if (index < 6) {
    gradientColor = gradients[index];
  } else {
    gradientColor = gradients[index % 6];
  }

  return (
    <View style={[styles.box, { marginLeft: index === 0 ? firstMargin : 0 }]}>
      <TouchableHighlight
        onPress={data.action}
        underlayColor={"transparent"}
        style={styles.touchable}
      >
        <ImageBackground style={styles.imageBackground} source={data.image}>
          <LinearGradient
            locations={[0.25, 0.5, 0.7, 1]}
            colors={[
              "rgba(0,0,0,0.1)",
              gradientColor(0.1),
              gradientColor(0.5),
              gradientColor(0.89)
            ]}
            style={styles.gradientView}
          >
            <Text style={styles.boxTitle}>{data.title}</Text>
          </LinearGradient>
        </ImageBackground>
      </TouchableHighlight>
    </View>
  );
};

Box.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    action: PropTypes.func.isRequired
  }).isRequired,
  firstMargin: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired
};

const Carousel = ({ containerStyle, data, firstMargin }) => {
  return (
    <View style={[styles.scrollContainer, containerStyle]}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        style={styles.scrollView}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {data.map((item, index) => {
          return (
            <Box
              key={index}
              index={index}
              firstMargin={firstMargin}
              data={item}
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
      action: PropTypes.func.isRequired
    })
  ).isRequired,
  firstMargin: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: 160
  },
  scrollView: {},
  box: {
    height: 160,
    width: 160,
    overflow: "hidden",
    borderRadius: 5,
    marginRight: 8
  },
  touchable: {
    flex: 1
  },
  imageBackground: {
    flex: 1
  },
  gradientView: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-end"
  },
  boxTitle: {
    margin: 8,
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
    lineHeight: 24
  }
});

export default Carousel;
