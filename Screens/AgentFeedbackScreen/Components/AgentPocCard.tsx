import React from "react";
import { StyleSheet, View, StyleProp, ViewStyle, Text } from "react-native";

import Icon from "../../../CommonComponents/Icon/Icon";

import {
  CONSTANT_black1,
  CONSTANT_black2,
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

export interface IPocCardPropsData {
  title: string;
  description: string;
  iconName: string;
}

interface AgentPocCardProps {
  containerStyle?: StyleProp<ViewStyle>;
  pocCardData: IPocCardPropsData[];
}

const AgentPocCard = ({ containerStyle, pocCardData }: AgentPocCardProps) => {
  return (
    <View style={containerStyle}>
      {pocCardData.map((data, index) => {
        return (
          <View style={styles.pocCard} key={index}>
            <View style={styles.passIconStyle}>
              <Icon name={data.iconName} size={14} color={CONSTANT_black1} />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{data.title}</Text>
              <Text style={styles.description}>{data.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  pocCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: CONSTANT_shade5,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8
  },

  passIconStyle: {
    marginRight: 8
  },

  contentContainer: {
    flex: 1
  },

  title: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    marginBottom: 6,
    marginTop: 2
  },
  description: {
    color: CONSTANT_black2,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 13)
  }
});

export default AgentPocCard;
