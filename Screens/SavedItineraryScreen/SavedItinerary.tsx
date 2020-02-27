import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TouchableOpacity
} from "react-native";
import SmartImageV2 from "../../CommonComponents/SmartImage/SmartImageV2";
import RouteList, {
  IRouteCitiesDetails
} from "../../CommonComponents/RouteList/RouteList";
import {
  CONSTANT_shade5,
  CONSTANT_shade1,
  CONSTANT_black1,
  CONSTANT_white
} from "../../constants/colorPallete";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
interface SavedItineraryProps {
  containerStyle?: ViewStyle;
  image: string;
  lastEdited: string;
  title: string;
  cities: IRouteCitiesDetails[];
  action: () => any;
}

const SavedItinerary = ({
  containerStyle,
  image = "",
  lastEdited,
  title = "",
  cities = [],
  action = () => {}
}: SavedItineraryProps) => {
  return (
    <TouchableOpacity
      style={[styles.savedItineraryCard, containerStyle]}
      activeOpacity={0.8}
      onPress={action}
    >
      <SmartImageV2
        source={{
          uri: image
        }}
        fallbackSource={{
          uri: "https://pyt-images.imgix.net/images/city/2400xh/rome.jpg"
        }}
        style={[styles.savedItineraryImage]}
        resizeMode="cover"
      />

      <View style={styles.rightColumn}>
        <Text style={styles.createdText}>{lastEdited}</Text>
        <Text style={styles.titleText}>{title}</Text>

        <RouteList
          containerStyle={styles.routeListContainerStyle}
          routeListTextStyle={styles.routeListTextStyle}
          cities={cities}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  savedItineraryCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5,
    backgroundColor: CONSTANT_white
  },
  savedItineraryImage: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  rightColumn: {
    paddingLeft: 16
  },
  createdText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 11, 14),
    textTransform: "uppercase",
    marginBottom: 4
  },
  titleText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20),
    marginBottom: 8
  },
  routeListContainerStyle: {
    marginBottom: 0
  },
  routeListTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 15),
    marginHorizontal: 6
  }
});

export default SavedItinerary;
