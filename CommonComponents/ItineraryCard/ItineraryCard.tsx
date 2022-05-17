import React from 'react';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {
  StyleSheet,
  View,
  Text,
  ViewStyle,
  StyleProp,
  ImageStyle,
  TouchableOpacity,
} from 'react-native';
import {
  CONSTANT_white,
  CONSTANT_black1,
  CONSTANT_shade1,
  CONSTANT_shade2,
  CONSTANT_shade3,
} from '../../constants/colorPallete';
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular,
} from '../../constants/fonts';
import PrimaryButton from '../PrimaryButton/PrimaryButton';
import RouteList, {
  IRouteCitiesDetails,
} from '../../CommonComponents/RouteList/RouteList';
// import ItineraryCardImage from './Components/ItineraryCardImage';
import InclusionList from './Components/InclusionList';
import {IInclusion} from '../../Screens/ExploreScreen/services/generateInclusions';
// @ts-ignore
import getSymbolFromCurrency from 'currency-symbol-map';
import {getGlobalPriceWithoutSymbol} from '../../Screens/ExploreScreen/services/getPriceWithoutSymbol';

export interface ItineraryCardProps {
  containerStyle?: ViewStyle;
  imageStyle?: StyleProp<ImageStyle>;
  images: string[];
  thumbnailImages: string[];
  tripType: string;
  action: () => any;
  title: string;
  inclusionList: IInclusion[];
  itineraryCost: string | number;
  cities: IRouteCitiesDetails[];
  displayCurrency: string;
}

const ItineraryCard = ({
  containerStyle,
  imageStyle,
  thumbnailImages = [],
  images = [],
  tripType = '',
  title = '',
  inclusionList,
  itineraryCost,
  cities = [],
  action = () => null,
  displayCurrency,
}: ItineraryCardProps) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.2}
      style={[styles.itineraryCardContainer, containerStyle]}>
      {/* <ItineraryCardImage
        thumbnailImages={thumbnailImages}
        images={images}
        tripType={tripType}
        imageStyle={[styles.itineraryImageStyle, imageStyle]}
      /> */}

      <View style={styles.contentWrapper}>
        <View style={styles.titleTextWrapper}>
          <Text
            style={styles.titleTextStyle}
            numberOfLines={2}
            ellipsizeMode={'tail'}>
            {title}
          </Text>
        </View>

        <RouteList cities={cities} />

        <InclusionList inclusionList={inclusionList} />

        <View>
          <View style={styles.lineSeparator} />

          <View style={styles.bottomWrapper}>
            <View style={styles.priceSection}>
              <Text style={styles.rupeeText}>
                {getSymbolFromCurrency(displayCurrency)}
              </Text>
              <Text style={styles.priceText}>
                {getGlobalPriceWithoutSymbol({
                  amount: parseInt((itineraryCost as unknown) as string, 10),
                  currency: displayCurrency,
                })}
              </Text>
              <Text style={styles.personText}>/person</Text>
            </View>

            <PrimaryButton
              text={'View'}
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
    borderWidth: 1,
    borderColor: CONSTANT_shade3,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: CONSTANT_white,
    width: responsiveWidth(100) - 32,
  },

  itineraryImageStyle: {
    width: responsiveWidth(100) - 32,
  },

  contentWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: CONSTANT_white,
    justifyContent: 'space-between',
    flex: 1,
  },
  titleTextWrapper: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    marginBottom: 8,
  },
  titleTextStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16, 20),
  },

  lineSeparator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: CONSTANT_shade2,
  },

  bottomWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  rupeeText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 20, 25),
    marginRight: 2,
  },
  priceText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 20, 25),
  },
  personText: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 12, 28),
    marginLeft: 2,
  },
  buttonStyle: {
    width: 120,
    height: 40,
    borderRadius: 8,
  },
  buttonTextStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14, 18),
  },
});

export default ItineraryCard;
