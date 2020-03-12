import React from "react";

// @ts-ignore
import Dash from "react-native-dash";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  StyleProp,
  ImageStyle
} from "react-native";

import {
  CONSTANT_white,
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_shade2,
  CONSTANT_shade3
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../constants/fonts";

import PrimaryButton from "../PrimaryButton/PrimaryButton";

import RouteList, {
  IRouteCitiesDetails
} from "../../CommonComponents/RouteList/RouteList";
import ItineraryCardImage from "./Components/ItineraryCardImage";
import InclusionList from "./Components/InclusionList";
import { IInclusion } from "../../Screens/ExploreScreen/services/generateInclusions";

export interface ItineraryCardProps {
  containerStyle?: ViewStyle;
  imageStyle?: StyleProp<ImageStyle>;
  images: string[];
  tripType: string;
  action: () => any;
  title: string;
  inclusionList: IInclusion[];
  itineraryCost: string;
  cities: IRouteCitiesDetails[];
}

const ItineraryCard = ({
  containerStyle,
  imageStyle,
  images = [],
  tripType = "",
  title = "",
  inclusionList,
  itineraryCost,
  cities = [],
  action = () => null
}: ItineraryCardProps) => {
  return (
    <View style={[styles.itineraryCardContainer, containerStyle]}>
      <ItineraryCardImage
        images={images}
        tripType={tripType}
        imageStyle={[styles.itineraryImageStyle, imageStyle]}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.titleTextWrapper}>
          <Text
            style={styles.titleTextStyle}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            {title}
          </Text>
        </View>

        <RouteList cities={cities} />

        <InclusionList inclusionList={inclusionList} />

        <Dash dashColor={CONSTANT_shade2} dashGap={2} dashLength={1} />

        <View style={styles.bottomWrapper}>
          <View style={styles.priceSection}>
            <Text style={styles.rupeeText}>₹</Text>
            <Text style={styles.priceText}>{itineraryCost}</Text>
            <Text style={styles.personText}>/person</Text>
          </View>

          <PrimaryButton
            text={"View"}
            buttonStyle={styles.buttonStyle}
            buttonTextStyle={styles.buttonTextStyle}
            clickAction={action}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryCardContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 16,
    marginVertical: 16,
    overflow: "hidden",
    backgroundColor: CONSTANT_white,
    width: responsiveWidth(100) - 32
  },

  itineraryImageStyle: {
    width: responsiveWidth(100) - 32
  },

  contentWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: CONSTANT_white,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: CONSTANT_shade3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  titleTextWrapper: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    marginBottom: 8
  },
  titleTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20)
  },

  bottomWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16
  },
  priceSection: {
    flexDirection: "row",
    alignItems: "flex-start"
  },
  rupeeText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 22),
    marginRight: 4
  },
  priceText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 25)
  },
  personText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 28),
    marginLeft: 2
  },
  buttonStyle: {
    width: 120,
    height: 40,
    borderRadius: 8
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 18)
  }
});

export default ItineraryCard;
