import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import SmartImage from "../../CommonComponents/SmartImage/SmarterImage";
import constants from "../../constants/constants";

const imageSources = {
  localFile: constants.flightVoucherBanner,
  networkFile: {
    uri:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  },
  brokenFile: {
    uri:
      "https://images.unsplash.com/photo-1540946485063?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  }
};

const MultipleScenarios = () => {
  const images = [
    imageSources.localFile,
    imageSources.networkFile,
    imageSources.brokenFile
  ];
  const [index, setIndex] = useState(0);
  let _interval;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _interval = setInterval(() => {
      if (index < images.length - 1) {
        setIndex(index + 1);
      } else {
        setIndex(0);
      }
    }, 2500);
    return () => {
      clearInterval(_interval);
    };
  });
  return (
    <View style={styles.container}>
      <SmartImage style={styles.imageContainer} source={images[index]} />
    </View>
  );
};

storiesOf("Smart Image", module)
  .add("Smart image - local image file", () => {
    return (
      <View style={styles.container}>
        <SmartImage
          style={styles.imageContainer}
          source={imageSources.localFile}
        />
      </View>
    );
  })
  .add("Smart image - network image file", () => {
    return (
      <View style={styles.container}>
        <SmartImage
          style={styles.imageContainer}
          source={imageSources.networkFile}
        />
      </View>
    );
  })
  .add("Smart image - broken image file", () => {
    return (
      <View style={styles.container}>
        <SmartImage
          style={styles.imageContainer}
          source={imageSources.brokenFile}
        />
      </View>
    );
  })
  .add("Smart image - all three scenarios", () => {
    return <MultipleScenarios />;
  });

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  imageContainer: {
    height: 150,
    width: 150
  }
});
