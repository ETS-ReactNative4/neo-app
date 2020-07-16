import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../../constants/fonts";
import {
  CONSTANT_black1,
  CONSTANT_shade2
} from "../../../../constants/colorPallete";
import PrimaryButton from "../../../../CommonComponents/PrimaryButton/PrimaryButton";
import { getLocaleStringGlobal } from "../../../../Services/getLocaleString/getLocaleString";

export interface ItineraryDetailProps {
  departureDate: string;
  departingFrom: string;
  costedDate: string;
  costedTime: string;
  totalCost: number | string;
  numOfRooms: number;
  adults: number;
  children: number;
  travellingAs: string;
  staleCost: boolean;
  updateCost: () => any;
  displayCurrency: string;
}

const ItineraryDetail = ({
  departureDate,
  departingFrom,
  costedDate,
  costedTime,
  totalCost,
  numOfRooms,
  adults,
  children,
  travellingAs,
  staleCost,
  updateCost,
  displayCurrency
}: ItineraryDetailProps) => {
  return (
    <View style={styles.itineraryDetailContainer}>
      <Text style={styles.headingTextStyle}>Trip details</Text>

      <View style={styles.detailList}>
        <Text style={styles.titleTextStyle}>DEPARTING ON</Text>
        <Text style={styles.textStyle}>{departureDate}</Text>
      </View>

      <View style={styles.detailList}>
        <Text style={styles.titleTextStyle}>DEPARTING FROM</Text>
        <Text style={styles.textStyle}>{departingFrom}</Text>
      </View>

      {travellingAs ? (
        <View style={styles.detailList}>
          <Text style={styles.titleTextStyle}>TRIP TYPE</Text>
          <Text style={styles.textStyle}>{travellingAs}</Text>
        </View>
      ) : null}

      <View style={styles.detailList}>
        <Text style={styles.titleTextStyle}>ROOM DETAILS</Text>
        <Text style={styles.textStyle}>{`${
          numOfRooms ? numOfRooms + " rooms - " : ""
        } ${adults ? adults + ` adult${adults > 1 ? "s" : ""}` : ""} ${
          children ? ", " + children + ` child${children > 1 ? "ren" : ""}` : ""
        }`}</Text>
      </View>

      <View style={[styles.detailList, styles.mbottomSmall]}>
        <Text style={styles.titleTextStyle}>
          {`PRICE AS ON ${costedDate || ""} | ${costedTime || ""}`}
        </Text>
        <Text style={styles.textStyle}>
          {totalCost
            ? getLocaleStringGlobal({
                amount: totalCost,
                currency: displayCurrency
              })
            : "NA"}
        </Text>
      </View>

      {/**
       * PT TODO: Costing function needed here...
       */}
      {staleCost ? (
        <PrimaryButton
          text={"Get latest cost"}
          clickAction={updateCost}
          buttonStyle={styles.buttonStyle}
          buttonTextStyle={styles.buttonTextStyle}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  itineraryDetailContainer: {
    marginBottom: 24
  },
  headingTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    color: CONSTANT_black1,
    marginBottom: 16
  },
  detailList: {
    marginBottom: 24
  },
  mbottomSmall: {
    marginBottom: 8
  },
  titleTextStyle: {
    textTransform: "uppercase",
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 12),
    color: CONSTANT_shade2,
    marginBottom: 6
  },
  textStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15),
    color: CONSTANT_black1,
    textTransform: "capitalize"
  },
  buttonStyle: {
    width: 136,
    height: 32
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14)
  }
});

export default ItineraryDetail;
