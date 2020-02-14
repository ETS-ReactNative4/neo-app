import React from "react";

// @ts-ignore
import Dash from "react-native-dash";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";

import {
  CONSTANT_white,
  CONSTANT_white1,
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

import getLocaleString from "../../Services/getLocaleString/getLocaleString";
import RouteList, { ICitiesDetails } from "./Components/RouteList";
import ActivityList from "./Components/ActivityList";
import ItineraryCardImage from "./Components/ItineraryCardImage";

interface ItineraryCardProps {
  images: string[];
  tripType: string;
  action: () => any;
  title: string;
  activities: string[];
  itineraryCost: number;
  cities: ICitiesDetails[];
}

const ItineraryCard = ({
  images = [],
  tripType = "",
  title = "",
  activities,
  itineraryCost,
  cities = [],
  action = () => null
}: ItineraryCardProps) => {
  return (
    <View style={styles.itineraryCardContainer}>
      <ItineraryCardImage
        images={images}
        tripType={tripType}
        imageStyle={styles.imageStyle}
      />

      <TouchableOpacity activeOpacity={0.8} onPress={action}>
        <View style={styles.contentWrapper}>
          <Text
            style={styles.descriptionStyle}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            {title}
          </Text>

          <RouteList cities={cities} />

          <ActivityList activities={activities} />

          <Dash dashColor={CONSTANT_shade2} dashGap={2} dashLength={1} />

          <View style={styles.bottomWrapper}>
            <View style={styles.priceSection}>
              <Text style={styles.rupeeText}>₹</Text>
              <Text style={styles.priceText}>
                {getLocaleString(itineraryCost)}
              </Text>
              <Text style={styles.personText}>/person</Text>
            </View>

            <PrimaryButton
              text={"Customize"}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
              clickAction={action}
            />
          </View>
        </View>
      </TouchableOpacity>
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

  imageStyle: {
    width: responsiveWidth(100) - 32
  },

  contentWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: CONSTANT_white1,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: CONSTANT_shade3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  descriptionStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20),
    marginBottom: 8
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
    height: 40
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 18)
  }
});

export default ItineraryCard;
