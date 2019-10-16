import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { storiesOf } from "@storybook/react-native";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import constants from "../../constants/constants";
import PropTypes from "prop-types";

const imageSources = {
  localFile: constants.flightVoucherBanner,
  networkFile: {
    uri:
      "https://images.unsplash.com/photo-1540946485063-a40da27545f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  },
  brokenFile: {
    uri:
      "https://images.unsplash.com/photo-1540946485063?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80"
  },
  invalidUrl: {
    uri: "invalid image url"
  }
};

const MultipleScenarios = ({ useFastImage = false }) => {
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
      <SmartImageV2
        useFastImage={useFastImage}
        style={[styles.imageContainer, styles.imageContainerBackground]}
        source={images[index]}
      />
    </View>
  );
};

const MultipleResizeModes = ({ useFastImage = false }) => {
  const resizeModes = ["center", "stretch", "cover", "contain"];
  const [index, setIndex] = useState(0);
  let _interval;
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    _interval = setInterval(() => {
      if (index < resizeModes.length - 1) {
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
      <SmartImageV2
        useFastImage={useFastImage}
        style={[styles.imageContainer, styles.imageContainerBackground]}
        source={imageSources.networkFile}
        resizeMode={resizeModes[index]}
      />
    </View>
  );
};

MultipleScenarios.propTypes = {
  useFastImage: PropTypes.bool
};

storiesOf("Smart Image", module)
  .add("Smart image - local image file", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.localFile}
        />
      </View>
    );
  })
  .add("Smart image - network image file", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.networkFile}
        />
      </View>
    );
  })
  .add("Smart image - broken image file", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.brokenFile}
        />
      </View>
    );
  })
  .add("Smart image - all three scenarios", () => {
    return <MultipleScenarios />;
  })
  .add("Smart image - with child text element", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.networkFile}
        >
          <Text>{"This is some Text"}</Text>
        </SmartImageV2>
      </View>
    );
  })
  .add("Smart image - all resize modes", () => {
    return <MultipleResizeModes />;
  })
  .add("Smart + Fast image - local image file", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.localFile}
          useFastImage={true}
        />
      </View>
    );
  })
  .add("Smart + Fast image - network image file", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.networkFile}
          useFastImage={true}
        />
      </View>
    );
  })
  .add("Smart + Fast image - broken image file", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.brokenFile}
          useFastImage={true}
        />
      </View>
    );
  })
  .add("Smart + Fast image - with child text element", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.networkFile}
          useFastImage={true}
        >
          <Text>{"This is some Text"}</Text>
        </SmartImageV2>
      </View>
    );
  })
  .add("Smart + Fast image - all three scenarios", () => {
    return <MultipleScenarios useFastImage={true} />;
  })
  .add("Smart + Fast image - all resize modes", () => {
    return <MultipleResizeModes useFastImage={true} />;
  })
  .add("Smart + Fast image - all priority modes", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.networkFile}
          useFastImage={true}
          priority={"high"}
        >
          <Text>{"High"}</Text>
        </SmartImageV2>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.networkFile}
          useFastImage={true}
          priority={"normal"}
        >
          <Text>{"Normal"}</Text>
        </SmartImageV2>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.networkFile}
          useFastImage={true}
          priority={"low"}
        >
          <Text>{"Low"}</Text>
        </SmartImageV2>
      </View>
    );
  })
  .add("Smart + Fast image - Android crash scenario", () => {
    return (
      <View style={styles.container}>
        <SmartImageV2
          style={styles.imageContainer}
          source={imageSources.invalidUrl}
          useFastImage={true}
        />
      </View>
    );
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
  },
  imageContainerBackground: {
    backgroundColor: constants.shade1
  }
});
