import React from "react";
// @ts-ignore
import Dash from "react-native-dash";

import {
  StyleSheet,
  ImageSourcePropType,
  View,
  Text,
  TouchableOpacity
} from "react-native";
import Icon from "../Icon/Icon";
import SmartImageV2 from "../SmartImage/SmartImageV2";

import {
  CONSTANT_white1,
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_shade2,
  CONSTANT_shade3,
  CONSTANT_firstColor
} from "../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../constants/fonts";
import {
  CONSTANT_checkIcon,
  CONSTANT_documentIcon,
  CONSTANT_arrowRight
} from "../../constants/imageAssets";
import PrimaryButton from "../PrimaryButton/PrimaryButton";

interface ItineraryCardProps {
  image: ImageSourcePropType;
  fallbackImage: ImageSourcePropType;
  action: () => any;
}

const ItineraryCard = ({
  image = { uri: "" },
  fallbackImage = { uri: "" },
  action = () => null
}: ItineraryCardProps) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={action}>
      <View style={styles.itineraryCardContainer}>
        <SmartImageV2
          source={image}
          fallbackSource={fallbackImage}
          resizeMode="cover"
          style={styles.itineraryImage}
        />

        <View style={styles.contentWrapper}>
          <Text
            style={styles.descriptionStyle}
            numberOfLines={2}
            ellipsizeMode={"tail"}
          >
            An epic 16 night Europe itinerary to rekindle the wonder in your
            eyes.
          </Text>

          <View style={styles.routeListWrapper}>
            <Icon
              name={CONSTANT_documentIcon}
              size={16}
              color={CONSTANT_shade2}
              style={styles.routeIconStyle}
            />

            <View style={styles.routeList}>
              <Text style={styles.routeListText}>Interlaken</Text>

              <Icon
                name={CONSTANT_arrowRight}
                size={12}
                color={CONSTANT_shade1}
              />
            </View>

            <View style={styles.routeList}>
              <Text style={styles.routeListText}>Zerma</Text>

              <Icon
                name={CONSTANT_arrowRight}
                size={12}
                color={CONSTANT_shade1}
              />
            </View>

            <View style={styles.routeList}>
              <Text style={styles.routeListText}>Lucerne</Text>
              <Text style={[styles.routeListText, styles.routeCityText]}>
                +2 cities
              </Text>
            </View>
          </View>

          <View style={styles.listWrapper}>
            <View style={styles.listInner}>
              <View>
                <Icon
                  name={CONSTANT_checkIcon}
                  size={14}
                  color={CONSTANT_firstColor}
                />
              </View>
              <Text style={styles.listText}>3 star accomodations</Text>
            </View>
            <View style={styles.listInner}>
              <View>
                <Icon
                  name={CONSTANT_checkIcon}
                  size={14}
                  color={CONSTANT_firstColor}
                />
              </View>
              <Text style={styles.listText}>Airport Transfers</Text>
            </View>
            <View style={styles.listInner}>
              <View>
                <Icon
                  name={CONSTANT_checkIcon}
                  size={14}
                  color={CONSTANT_firstColor}
                />
              </View>
              <Text style={styles.listText}>5 activities</Text>
            </View>
          </View>

          <Dash dashColor={CONSTANT_shade2} dashGap={2} dashLength={1} />

          <View style={styles.bottomWrapper}>
            <View style={styles.priceSection}>
              <Text style={styles.rupeeText}>₹</Text>
              <Text style={styles.priceText}>10,02,214</Text>
              <Text style={styles.personText}>/person</Text>
            </View>

            <PrimaryButton
              text={"Customise"}
              buttonStyle={styles.buttonStyle}
              buttonTextStyle={styles.buttonTextStyle}
              clickAction={action}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itineraryCardContainer: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginHorizontal: 16
  },
  itineraryImage: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    height: 200
  },

  contentWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: CONSTANT_white1,
    borderWidth: 1,
    borderColor: CONSTANT_shade3,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  descriptionStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20),
    marginBottom: 8
  },

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
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 15),
    marginRight: 8
  },
  routeCityText: {
    color: CONSTANT_shade2
  },

  listWrapper: {
    marginBottom: 8
  },
  listInner: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8
  },
  listText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    marginLeft: 8
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
