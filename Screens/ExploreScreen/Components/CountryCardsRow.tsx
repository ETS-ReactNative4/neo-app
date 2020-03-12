import React from "react";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { ICountriesSection, IExploreFeedLinks } from "../ExploreFeedType";
import FeaturedCardTypeOne from "../../../CommonComponents/FeaturedCard/FeaturedCardTypeOne";
import getPriceWithoutSymbol from "../services/getPriceWithoutSymbol";
import deepLink from "../../../Services/deepLink/deepLink";
import { StyleSheet } from "react-native";

export interface ICountryCard {
  countryId: number;
  slug: string;
  apiUrl: string;
  deepLinking: IExploreFeedLinks;
  startingPrice: number;
  image: string;
}

export interface ICountryDeepLink {
  link: string;
  screenData?: {
    slug?: string;
  };
}

export interface ICountryCardData {
  data?: ICountryCard[];
  isLoading: boolean;
}

const CountryCardsRow = (props: ICountriesSection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading }: ICountryCardData) => {
        return isLoading
          ? null
          : data &&
              data.map((country, countryIndex) => {
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
                    image={{ uri: country.image }}
                    price={getPriceWithoutSymbol(country.startingPrice)}
                    action={action}
                    containerStyle={styles.featuredCardTypeOneWrapper}
                  />
                );
              });
      }}
    </HorizontalCardsRow>
  );
};

const styles = StyleSheet.create({
  featuredCardTypeOneWrapper: {
    width: responsiveWidth(80),
    marginLeft: 16
  }
});

export default CountryCardsRow;
