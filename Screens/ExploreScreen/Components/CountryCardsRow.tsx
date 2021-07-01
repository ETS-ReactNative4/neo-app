import React from "react";
import { StyleSheet } from "react-native";

import { responsiveWidth } from "react-native-responsive-dimensions";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { ICountriesSection, IExploreFeedLinks } from "../ExploreFeedType";
import FeaturedCardTypeOne, {
  FEATURED_CARD_IMAGE_WIDTH,
  FEATURED_CARD_IMAGE_HEIGHT
} from "../../../CommonComponents/FeaturedCard/FeaturedCardTypeOne";
import deepLink from "../../../Services/deepLink/deepLink";
import ExploreCardLodingIndicator from "./ExploreCardLodingIndicator";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { observer, inject } from "mobx-react";

import { CONSTANT_explore } from "../../../constants/appEvents";
import { CONSTANT_preLoaderAnimation2 } from "../../../constants/imageAssets";
import DeviceLocale from "../../../mobx/DeviceLocale";

export interface ICountryCard {
  countryId: number;
  slug: string;
  apiUrl: string;
  deepLinking: IExploreFeedLinks;
  startingPrice: number;
  imageUrl: string;
}

export interface IRegionCard {
  slug: string;
  apiUrl: string;
  deepLinking: IExploreFeedLinks;
  flow: string;
  imageUrl: string;
  regionName: string;
  startingPrice: number;
  stateIds: number[];
}

export interface ITestimonialsCard {
  timeOfReview: number;
  star: number;
  region: string;
  fName: string;
  mName: string;
  lName: string;
  cityOfDeparture: string;
  dateOfDeparture: number;
  destination: string;
  ttype: string;
  review: string;
  fbLink: string;
  profileImage: string;
  coverImage: string;
  itineraryId: string;
  journalLinks: string[];
  testimonialId: number;
  shortReview: string;
  shortestReview: string;
  numberOfNights: number;
  type: string;
  deepLinking: IExploreFeedLinks;
}

export interface ICountryDeepLink {
  link: string;
  screenData?: {
    slug?: string;
    apiUrl?: string;
  };
}

export interface ICountryCardData {
  data?: {
    countries: ICountryCard[];
    testimonials: ITestimonialsCard[];
    domesticRegions: IRegionCard[];
  };
  isLoading: boolean;
  displayCurrency: string;
}

const LODING_INDICATOR_WIDTH = responsiveWidth(80);
const LODING_INDICATOR_HEIGHT = ratioCalculator(
  72,
  109,
  LODING_INDICATOR_WIDTH
);

export interface CountryCardsRowProps extends ICountriesSection {
  deviceLocaleStore: DeviceLocale;
}

const CountryCardsRow = (props: CountryCardsRowProps) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, displayCurrency, isLoading }: ICountryCardData) => {
        return isLoading ? (
          <ExploreCardLodingIndicator
            animation={CONSTANT_preLoaderAnimation2()}
            height={LODING_INDICATOR_HEIGHT}
          />
        ) : (
          data && [
            ...(props.deviceLocaleStore.deviceLocale === "in"
              ? data?.domesticRegions?.map?.((region, regionIndex) => {
                  const action = () => {
                    const deepLinkingObject: ICountryDeepLink = {
                      link: region.deepLinking.link,
                      screenData: {
                        ...(region.deepLinking.screenData || {}),
                        slug: region.slug,
                        apiUrl: region.apiUrl
                      }
                    };
                    deepLink(deepLinkingObject);
                    recordEvent(CONSTANT_explore.event, {
                      click: CONSTANT_explore.click.recommendedForYouCard
                    });
                  };
                  return (
                    <FeaturedCardTypeOne
                      key={regionIndex}
                      image={{
                        uri: getImgIXUrl({
                          src: region.imageUrl,
                          imgFactor: `h=${FEATURED_CARD_IMAGE_HEIGHT}&w=${FEATURED_CARD_IMAGE_WIDTH}&crop=fit`
                        })
                      }}
                      thumbnail={{
                        uri: getImgIXUrl({
                          src: region.imageUrl,
                          DPR: 0.02,
                          imgFactor: `h=${FEATURED_CARD_IMAGE_HEIGHT}&w=${FEATURED_CARD_IMAGE_WIDTH}&crop=fit`
                        })
                      }}
                      price={region.startingPrice}
                      action={action}
                      containerStyle={styles.featuredCardTypeOneWrapper}
                      displayCurrency={displayCurrency}
                    />
                  );
                }) ?? []
              : []),
            ...(data?.countries?.map?.((country, countryIndex) => {
              const action = () => {
                const deepLinkingObject: ICountryDeepLink = {
                  link: country.deepLinking.link,
                  screenData: {
                    ...(country.deepLinking.screenData || {}),
                    slug: country.slug,
                    apiUrl: country.apiUrl
                  }
                };
                deepLink(deepLinkingObject);
                recordEvent(CONSTANT_explore.event, {
                  click: CONSTANT_explore.click.recommendedForYouCard
                });
              };
              return (
                <FeaturedCardTypeOne
                  key={countryIndex}
                  image={{
                    uri: getImgIXUrl({
                      src: country.imageUrl,
                      imgFactor: `h=${FEATURED_CARD_IMAGE_HEIGHT}&w=${FEATURED_CARD_IMAGE_WIDTH}&crop=fit`
                    })
                  }}
                  thumbnail={{
                    uri: getImgIXUrl({
                      src: country.imageUrl,
                      DPR: 0.02,
                      imgFactor: `h=${FEATURED_CARD_IMAGE_HEIGHT}&w=${FEATURED_CARD_IMAGE_WIDTH}&crop=fit`
                    })
                  }}
                  price={country.startingPrice}
                  action={action}
                  containerStyle={styles.featuredCardTypeOneWrapper}
                  displayCurrency={displayCurrency}
                />
              );
            }) ?? [])
          ]
        );
      }}
    </HorizontalCardsRow>
  );
};

const styles = StyleSheet.create({
  featuredCardTypeOneWrapper: {
    width: responsiveWidth(80),
    marginRight: 16
  },
  loadingAnimation: {
    width: responsiveWidth(100)
  }
});

export default inject("deviceLocaleStore")(observer(CountryCardsRow));
