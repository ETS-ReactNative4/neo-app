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
  CONSTANT_white,
  CONSTANT_eighteenthColor
} from "../../constants/colorPallete";
import {
  CONSTANT_moreOptionsHorizIcon,
  CONSTANT_defaultPlaceImage
} from "../../constants/imageAssets";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import Icon from "../../CommonComponents/Icon/Icon";

interface SavedItineraryCardProps {
  containerStyle?: ViewStyle;
  image: string;
  lastEdited: string;
  title: string;
  cities: IRouteCitiesDetails[];
  action: () => any;
  isUnread?: boolean;
  moreOptions?: boolean;
  moreOptionsAction?: () => any;
}

const SavedItineraryCard = ({
  containerStyle,
  image = "",
  lastEdited,
  title = "",
  cities = [],
  action = () => {},
  moreOptions = false,
  isUnread = false,
  moreOptionsAction = () => {}
}: SavedItineraryCardProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.savedItineraryCard,
        isUnread ? styles.unread : null,
        containerStyle
      ]}
      activeOpacity={0.8}
      onPress={action}
    >
      <SmartImageV2
        source={{
          uri: image
        }}
        fallbackSource={{
          uri: CONSTANT_defaultPlaceImage
        }}
        style={[styles.savedItineraryImage]}
        resizeMode="cover"
      />

      <View style={styles.rightColumn}>
        <View style={styles.lastEditedTextWrapper}>
          <Text
            style={styles.lastEditedText}
            numberOfLines={1}
            ellipsizeMode={"tail"}
          >
            {lastEdited}
          </Text>

          {moreOptions ? (
            <TouchableOpacity activeOpacity={0.8} onPress={moreOptionsAction}>
              <Icon
                name={CONSTANT_moreOptionsHorizIcon}
                size={20}
                color={CONSTANT_shade1}
              />
            </TouchableOpacity>
          ) : null}
        </View>
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
  unread: {
    backgroundColor: CONSTANT_eighteenthColor
  },
  savedItineraryImage: {
    width: 70,
    height: 70,
    borderRadius: 50
  },
  rightColumn: {
    flex: 1,
    paddingLeft: 16
  },
  lastEditedTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  lastEditedText: {
    flex: 1,
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 11, 14),
    textTransform: "uppercase",
    marginRight: 8,
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

export default SavedItineraryCard;
