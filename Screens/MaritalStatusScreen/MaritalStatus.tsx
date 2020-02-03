import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";
import SectionTitle from "../../CommonComponents/SectionTitle/SectionTitle";
import MaritalStatusCard from "./Components/MaritalStatusCard";
import PrimaryButton from "../../CommonComponents/PrimaryButton/PrimaryButton";
import { isIphoneX } from "react-native-iphone-x-helper";
import { CONSTANT_xSensorAreaHeight } from "../../constants/styles";
import MasonryView from "../../CommonComponents/MasonryView/MasonryView";

import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

export interface IMaritalStatusData {
  text: string;
  image: string;
}

interface MaritalStatusProps {
  maritalStatusData: IMaritalStatusData[];
}

interface ISuggestedCity {
  index: number;
  imageUrl: string;
  text: string;
  isSelected: boolean;
}

const MaritalStatus = ({ maritalStatusData }: MaritalStatusProps) => {
  const [suggestedMaritalStatusData, setSuggestedMaritalStatusData] = useState<
    ISuggestedCity[]
  >([]);

  useEffect(() => {
    setSuggestedMaritalStatusData(
      maritalStatusData.map((maritalStatus, index) => {
        return {
          index: index,
          imageUrl: maritalStatus.image,
          text: maritalStatus.text,
          isSelected: false
        };
      })
    );
  }, [maritalStatusData]);

  const selectSuggestedMaritalStatusData = (statusIndex: number) => {
    const statusList = [...suggestedMaritalStatusData];
    statusList[statusIndex].isSelected = !statusList[statusIndex].isSelected;
    setSuggestedMaritalStatusData(statusList);
  };

  return (
    <View style={styles.maritalStatusContainer}>
      <View style={styles.headerContainer}>
        <SectionTitle
          title={"What’s your marital status?"}
          description={
            "Soul searching, honeymoons, anniversary trips or full family vacations, we’ll plan them all for you :)"
          }
          containerStyle={styles.sectionTitleStyle}
        />
      </View>

      <View style={styles.bodyContainer}>
        <MasonryView
          columns={2}
          columnStyle={styles.scrollColumn}
          oddColumnStyle={styles.oddColumnStyle}
          evenColumnStyle={styles.evenColumnStyle}
        >
          {suggestedMaritalStatusData.map((suggestedMaritalData, index) => {
            const onSelect = () => {
              selectSuggestedMaritalStatusData(suggestedMaritalData.index);
            };

            return (
              <MaritalStatusCard
                key={index}
                onPress={onSelect}
                imageSource={suggestedMaritalData.imageUrl}
                text={suggestedMaritalData.text}
              />
            );
          })}
        </MasonryView>
      </View>

      <View style={styles.footerContainer}>
        <PrimaryButton
          text={"Up Next - Holiday Style"}
          clickAction={() => Alert.alert("Click Button")}
        />
      </View>
    </View>
  );
};

/* SPACER */
const SPACING = 24;

const BOTTOM_SPACING = SPACING;

const styles = StyleSheet.create({
  maritalStatusContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: SPACING + 8
  },
  headerContainer: {},
  bodyContainer: {
    flex: 1
  },
  sectionTitleStyle: {
    marginBottom: BOTTOM_SPACING
  },
  footerContainer: {
    marginTop: 16,
    paddingBottom:
      BOTTOM_SPACING + (isIphoneX() ? CONSTANT_xSensorAreaHeight : 0)
  },
  scrollColumn: {
    width: responsiveWidth(50) - 40
  },
  oddColumnStyle: {
    paddingLeft: 4
  },
  evenColumnStyle: {
    paddingRight: 4
  }
});

export default MaritalStatus;
