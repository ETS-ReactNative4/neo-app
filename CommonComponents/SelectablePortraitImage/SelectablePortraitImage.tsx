import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ViewStyle,
  StyleProp,
  ImageStyle
} from "react-native";

import PortraitImage from "../PortraitImage/PortraitImage";
import { TouchableOpacity } from "react-native-gesture-handler";
import SmartImageV2 from "../SmartImage/SmartImageV2";
import { CONSTANT_darkOverlayAlpha } from "../../constants/colorPallete";
import * as Animatable from "react-native-animatable";
import {
  CONSTANT_defaultPlaceImage,
  CONSTANT_pytHappyInsignia
} from "../../constants/imageAssets";

interface SelectablePortraitImageProps {
  containerStyle?: StyleProp<ViewStyle>;
  onPress: () => any;
  isSelected: boolean;
  imageSource: string;
  portraitImageContainerStyle?: StyleProp<ViewStyle>;
  portraitImageStyle?: StyleProp<ImageStyle>;
  portraitImageHeight: number;
}

const { createAnimatableComponent } = Animatable;

const AnimatableView = createAnimatableComponent(View);

const SelectablePortraitImage = ({
  containerStyle,
  onPress = () => null,
  isSelected,
  imageSource,
  portraitImageContainerStyle,
  portraitImageStyle,
  portraitImageHeight
}: SelectablePortraitImageProps) => {
  const [firstInteraction, setFirstInteraction] = useState<boolean>(false);

  const selectedAction = () => {
    onPress();
    setFirstInteraction(true);
  };

  const imageHeight = {
    height: portraitImageHeight
  };

  return (
    <View style={containerStyle}>
      <TouchableOpacity activeOpacity={1} onPress={selectedAction}>
        <PortraitImage
          imageSource={imageSource}
          containerStyle={portraitImageContainerStyle}
          portraitImageStyle={[
            styles.imageStyle,
            imageHeight,
            portraitImageStyle
          ]}
        />

        {firstInteraction ? (
          <AnimatableView
            animation={isSelected ? "fadeIn" : "fadeOut"}
            style={styles.selectedCardStyle}
            useNativeDriver={true}
            duration={300}
          >
            <SmartImageV2
              resizeMode={"contain"}
              source={CONSTANT_pytHappyInsignia()}
              fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
              style={styles.happyImageStyle}
            />
          </AnimatableView>
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
  imageStyle: {
    borderRadius: 4
  },
  happyImageStyle: {
    width: 36,
    height: 60
  }
});

export default SelectablePortraitImage;
