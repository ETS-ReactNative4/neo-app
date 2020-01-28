import React, { useState } from "react";
import { StyleSheet, View, ViewStyle, StyleProp } from "react-native";

import PortraitImage from "../PortraitImage/PortraitImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import SmartImageV2 from "../SmartImage/SmartImageV2";
import { CONSTANT_darkOverlayAlpha } from "../../constants/colorPallete";
import * as Animatable from "react-native-animatable";

interface SelectablePortraitImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => any;
  isSelected: boolean;
}

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);

const SelectablePortraitImage = ({
  containerStyle,
  onPress = () => null,
  isSelected
}: SelectablePortraitImageProps) => {
  const [firstInteraction, setFirstInteraction] = useState<boolean>(false);

  const selectedAction = () => {
    onPress();
    setFirstInteraction(true);
  };

  return (
    <View style={[styles.selectablePortraitImageContainer, containerStyle]}>
      <TouchableOpacity
        style={styles.selectPortraitImageStyle}
        activeOpacity={0.8}
        onPress={selectedAction}
      >
        <PortraitImage
          imageSource={"https://d3lf10b5gahyby.cloudfront.net/city/paris.jpg"}
        />

        {firstInteraction ? (
          <AnimatableView
            animation={isSelected ? "fadeIn" : "fadeOut"}
            style={styles.selectedCardStyle}
            duration={300}
          >
            <SmartImageV2
              resizeMode={"contain"}
              source={{ uri: "https://i.imgur.com/LSAZAuU.png" }}
              fallbackSource={{ uri: "https://i.imgur.com/LSAZAuU.png" }}
              style={styles.happyImageStyle}
            />
          </AnimatableView>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  selectablePortraitImageContainer: {
    flex: 1,
    marginBottom: 16
  },

  selectPortraitImageStyle: {},

  selectedCardStyle: {
    backgroundColor: CONSTANT_darkOverlayAlpha(0.7),
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  happyImageStyle: {
    width: 36,
    height: 60
  }
});

export default SelectablePortraitImage;
