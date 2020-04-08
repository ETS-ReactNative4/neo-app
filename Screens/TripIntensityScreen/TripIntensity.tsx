import React from "react";
import {
  View,
  ViewStyle,
  StyleSheet,
  Text,
  TouchableOpacity
} from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import {
  CONSTANT_white,
  CONSTANT_black1,
  CONSTANT_twentyOneColor,
  CONSTANT_twentyTwoColor,
  CONSTANT_shade6,
  CONSTANT_shade1
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import { CONSTANT_defaultPlaceImage } from "../../constants/imageAssets";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import TravelProfileHeader from "../TravelProfileWelcomeScreen/Components/TravelProfileHeader";

export interface TripIntensityProps {
  containerStyle?: ViewStyle;
}

const TripIntensity = ({ containerStyle }: TripIntensityProps) => {
  return (
    <View style={[styles.tripIntensityContainerStyle, containerStyle]}>
      <TravelProfileHeader
        enableLeftLink
        leftLinkText={"PART 3 OF 4"}
        clickLeftLink={() => {}}
        rightLinkText={"skip"}
        containerStyle={styles.headerContainerStyle}
      />

      <View style={styles.tripIntensityContent}>
        <SectionTitle
          containerStyle={styles.sectionTitleContainer}
          title={"How do you like your holidays?"}
          description={
            "This will help us customize our suggestions to suit your travel style."
          }
        />
        <SmartImageV2
          source={{
            uri: "https://i.imgur.com/ZGgrOSt.png"
          }}
          fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
          style={styles.imageStyle}
          resizeMode="cover"
        />

        <View style={styles.tripIntensityButtonWrapper}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={[
              styles.tripIntensityButton,
              styles.activeTripIntensityButton
            ]}
          >
            <Text
              style={[
                styles.tripIntensityButtonText,
                styles.activeTripIntensityButtonText
              ]}
            >
              Laid back
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={styles.tripIntensityButton}
          >
            <Text style={styles.tripIntensityButtonText}>Moderate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {}}
            style={[styles.tripIntensityButton, styles.noMarginRight]}
          >
            <Text style={styles.tripIntensityButtonText}>Packed</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.emiParteners}>
          <Text style={styles.emiPartenersText}>
            Easy EMIs with our partners
          </Text>
          <SmartImageV2
            source={{ uri: "https://i.imgur.com/M20FIDf.png" }}
            fallbackSource={{ uri: CONSTANT_defaultPlaceImage }}
            style={styles.emiPartenersImage}
            resizeMode="cover"
          />
        </View>
      </View>

      <PrimaryButton
        text={"Up Next - Budget Preferences"}
        clickAction={() => {}}
        buttonStyle={styles.buttonStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainerStyle: {
    backgroundColor: CONSTANT_shade6
  },

  tripIntensityContainerStyle: {
    flex: 1,
    backgroundColor: CONSTANT_shade6
  },
  tripIntensityContent: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: 56
  },

  sectionTitleContainer: {
    marginHorizontal: 32,
    marginBottom: 16
  },

  imageStyle: {
    width: responsiveWidth(100),
    height: 288,
    marginBottom: 32
  },

  tripIntensityButtonWrapper: {
    flexDirection: "row",
    marginHorizontal: 32,
    marginBottom: 24
  },
  tripIntensityButton: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    padding: 20,
    borderRadius: 25,
    marginRight: 8
  },
  tripIntensityButtonText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 13),
    textAlign: "center"
  },
  activeTripIntensityButton: {
    backgroundColor: CONSTANT_twentyOneColor
  },
  activeTripIntensityButtonText: {
    color: CONSTANT_twentyTwoColor
  },
  noMarginRight: {
    marginRight: 0
  },

  buttonStyle: {
    marginTop: 16,
    marginHorizontal: 32,
    marginBottom: 24 + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  },

  emiParteners: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 32,
    marginBottom: 8
  },
  emiPartenersText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 15),
    marginRight: 6
  },
  emiPartenersImage: {
    width: 68,
    height: 22
  }
});

export default TripIntensity;
