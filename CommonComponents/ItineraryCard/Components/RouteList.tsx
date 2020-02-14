import React from "react";

import { StyleSheet, View, Text } from "react-native";
import Icon from "../../Icon/Icon";

import {
  CONSTANT_shade1,
  CONSTANT_shade2
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import {
  CONSTANT_documentIcon,
  CONSTANT_arrowRight
} from "../../../constants/imageAssets";

export interface ICitiesDetails {
  cityName: string;
}

interface RouteListProps {
  cities: ICitiesDetails[];
}

const RouteList = ({ cities = [] }: RouteListProps) => {
  const cityDataSlice = cities.slice(0, 3);
  const moreCity = cities.length - 3;
  const length = cityDataSlice.length;
  const getListOfCity = cityDataSlice.map((city, cityIndex) => (
    <View key={cityIndex} style={styles.routeList}>
      <Text style={styles.routeListText}>{city.cityName}</Text>

      {cityIndex !== length - 1 ? (
        <View style={styles.routeListIcon}>
          <Icon name={CONSTANT_arrowRight} size={12} color={CONSTANT_shade1} />
        </View>
      ) : null}
    </View>
  ));

  return (
    <View style={styles.routeListWrapper}>
      <Icon
        name={CONSTANT_documentIcon}
        size={16}
        color={CONSTANT_shade2}
        style={styles.routeIconStyle}
      />

      {getListOfCity}

      {moreCity > 0 ? (
        <View style={styles.routeList}>
          <Text style={[styles.routeListText, styles.routeCityText]}>
            +{moreCity} {moreCity > 1 ? "cities" : "city"}
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  routeListWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16
  },
  routeList: {
    flexDirection: "row",
    alignItems: "center"
  },
  routeIconStyle: {
    marginRight: 6
  },
  routeListText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 15)
  },
  routeListIcon: {
    marginHorizontal: 8
  },
  routeCityText: {
    color: CONSTANT_shade2,
    marginLeft: 8
  }
});

export default RouteList;
