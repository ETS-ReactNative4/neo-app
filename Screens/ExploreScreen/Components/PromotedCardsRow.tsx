import React from "react";
import { StyleSheet } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";

import HorizontalCardsRow from "./HorizontalCardsRow";
import { IPromotedSection } from "../ExploreFeedType";
import PromoCard from "../../../CommonComponents/PromoCard/PromoCard";
import getPriceWithoutSymbol from "../services/getPriceWithoutSymbol";
import deepLink from "../../../Services/deepLink/deepLink";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";

export interface IPromoDeepLink {
  link: string;
  screenData?: object;
}

export interface IPromotedCardsRowData {
  data?: IPromotedSection["items"];
  isLoading: boolean;
}

const PromotedCardsRow = (props: IPromotedSection) => {
  return (
    <HorizontalCardsRow items={props.items}>
      {({ data }: IPromotedCardsRowData) => {
        return data
          ? data.map((promo, promoIndex) => {
              const action = () => {
                const deepLinkingObject: IPromoDeepLink = promo.deepLinking;
                deepLink(deepLinkingObject);
              };
              return (
                <PromoCard
                  key={promoIndex}
                  action={action}
                  image={{ uri: getImgIXUrl({ src: promo.imageUrl }) }}
                  price={getPriceWithoutSymbol(promo.cost)}
                  text={promo.text}
                  containerStyle={styles.promoCardWrapper}
                  promoCardImageStyle={styles.promoCardImage}
                />
              );
            })
          : null;
      }}
    </HorizontalCardsRow>
  );
};

const styles = StyleSheet.create({
  promoCardWrapper: {
    width: responsiveWidth(80)
  },
  promoCardImage: {
    width: responsiveWidth(80)
  }
});

export default PromotedCardsRow;
