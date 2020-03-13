import React from "react";
import { StyleSheet } from "react-native";

import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { ICountriesSection, IExploreFeedLinks } from "../ExploreFeedType";
import FeaturedCardTypeOne from "../../../CommonComponents/FeaturedCard/FeaturedCardTypeOne";
import getPriceWithoutSymbol from "../services/getPriceWithoutSymbol";
import deepLink from "../../../Services/deepLink/deepLink";
import ExploreCardLodingIndicator from "./ExploreCardLodingIndicator";
import ratioCalculator from "../../../Services/ratioCalculator/ratioCalculator";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";

export interface ICountryCard {
  countryId: number;
  slug: string;
  apiUrl: string;
  deepLinking: IExploreFeedLinks;
  startingPrice: number;
  image: string;
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
  };
}

export interface ICountryCardData {
  data?: {
    countries: ICountryCard[];
    testimonials: ITestimonialsCard[];
  };
  isLoading: boolean;
}

const LODING_INDICATOR_WIDTH = responsiveWidth(80);
const LODING_INDICATOR_HEIGHT = ratioCalculator(
  72,
  109,
  LODING_INDICATOR_WIDTH
);
const CountryCardsRow = (props: ICountriesSection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading }: ICountryCardData) => {
        return isLoading ? (
          <ExploreCardLodingIndicator height={LODING_INDICATOR_HEIGHT} />
        ) : (
          data &&
            data?.countries.map((country, countryIndex) => {
              const action = () => {
                const deepLinkingObject: ICountryDeepLink = {
                  link: country.deepLinking.link,
                  screenData: {
                    ...(country.deepLinking.screenData || {}),
                    slug: country.slug
                  }
                };
                deepLink(deepLinkingObject);
              };
              return (
                <FeaturedCardTypeOne
                  key={countryIndex}
                  image={{ uri: getImgIXUrl({ src: country.image }) }}
                  price={getPriceWithoutSymbol(country.startingPrice)}
                  action={action}
                  containerStyle={styles.featuredCardTypeOneWrapper}
                />
              );
            })
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
  },
  test: {
    flex: 1
  }
});

export default CountryCardsRow;
