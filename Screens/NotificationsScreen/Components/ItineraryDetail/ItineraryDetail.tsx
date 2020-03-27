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
import getLocaleString from "../../../../Services/getLocaleString/getLocaleString";

export interface ItineraryDetailProps {
  departureDate: string;
  departingFrom: string;
  costedDate: string;
  costedTime: string;
  totalCost: number;
  numOfRooms: number;
  adults: number;
  children: number;
  travellingAs: string;
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
  travellingAs
}: ItineraryDetailProps) => {
  return (
    <View style={styles.itineraryDetailContainer}>
      <Text style={styles.headingTextStyle}>Trip Details</Text>

      <View style={styles.detailList}>
        <Text style={styles.titleTextStyle}>DEPARTING ON</Text>
        <Text style={styles.textStyle}>{departureDate}</Text>
      </View>

      <View style={styles.detailList}>
        <Text style={styles.titleTextStyle}>DEPARTING FROM</Text>
        <Text style={styles.textStyle}>{departingFrom}</Text>
      </View>

      <View style={styles.detailList}>
        <Text style={styles.titleTextStyle}>TRAVELLING AS</Text>
        <Text style={styles.textStyle}>{travellingAs}</Text>
      </View>

      <View style={styles.detailList}>
        <Text style={styles.titleTextStyle}>ROOM DETAILS</Text>
        <Text style={styles.textStyle}>{`${
          numOfRooms ? numOfRooms + " rooms - " : ""
        } ${adults ? adults + " adults" : ""} ${
          children ? ", " + children + " children" : ""
        }`}</Text>
      </View>

      <View style={[styles.detailList, styles.mbottomSmall]}>
        <Text style={styles.titleTextStyle}>
          {`PRICE AS ON ${costedDate || ""} | ${costedTime || ""} HRS`}
        </Text>
        <Text style={styles.textStyle}>
          {totalCost ? getLocaleString(totalCost) : "NA"}
        </Text>
      </View>

      {/**
       * PT TODO: Costing function needed here...
       */}
      <PrimaryButton
        text={"Get latest cost"}
        clickAction={() => {}}
        buttonStyle={styles.buttonStyle}
        buttonTextStyle={styles.buttonTextStyle}
      />
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
    color: CONSTANT_black1
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
