import React from "react";

import { StyleSheet, View, Text, ViewStyle, TextStyle } from "react-native";
import Icon from "../Icon/Icon";

import { CONSTANT_shade1, CONSTANT_shade2 } from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import {
  CONSTANT_documentIcon,
  CONSTANT_arrowRight
} from "../../constants/imageAssets";

export interface IRouteCitiesDetails {
  cityName: string;
}

interface RouteListProps {
  containerStyle?: ViewStyle;
  routeListTextStyle?: TextStyle;
  cities: IRouteCitiesDetails[];
}

const RouteList = ({
  containerStyle,
  routeListTextStyle,
  cities = []
}: RouteListProps) => {
  const cityDataSlice = cities.slice(0, 3);
  const moreCity = cities.length - 3;
  const length = cityDataSlice.length;
  const getListOfCity = cityDataSlice.map((city, cityIndex) => (
    <View key={cityIndex} style={styles.routeList}>
      <Text style={[styles.routeListText, routeListTextStyle]}>
        {city.cityName}
      </Text>

      {cityIndex !== length - 1 ? (
        <View>
          <Icon name={CONSTANT_arrowRight} size={12} color={CONSTANT_shade1} />
        </View>
      ) : null}
    </View>
  ));

  return (
    <View style={[styles.routeListWrapper, containerStyle]}>
      <Icon name={CONSTANT_documentIcon} size={16} color={CONSTANT_shade2} />

      {getListOfCity}

      {moreCity > 0 ? (
        <View style={styles.routeList}>
          <Text
            style={[
              styles.routeListText,
              styles.routeCityText,
              routeListTextStyle
            ]}
          >
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
  routeListText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 15),
    marginHorizontal: 8
  },
  routeCityText: {
    color: CONSTANT_shade2,
    marginHorizontal: 0
  }
});

export default RouteList;
