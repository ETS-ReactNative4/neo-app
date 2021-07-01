import React from "react";
import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

import HorizontalCardsRow from "./HorizontalCardsRow";
import { IPromotedSection } from "../ExploreFeedType";
import PromoCard, {
  PROMO_CARD_IMAGE_HEIGHT,
  PROMO_CARD_IMAGE_WIDTH
} from "../../../CommonComponents/PromoCard/PromoCard";
import deepLink from "../../../Services/deepLink/deepLink";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { CONSTANT_explore } from "../../../constants/appEvents";

export interface IPromoDeepLink {
  link: string;
  screenData?: object;
}

export interface IPromotedCardsRowData {
  data?: IPromotedSection["items"];
  isLoading: boolean;
  displayCurrency: string;
}

const PromotedCardsRow = (props: IPromotedSection) => {
  return (
    <HorizontalCardsRow items={props.items}>
      {({ data, displayCurrency }: IPromotedCardsRowData) => {
        return data
          ? data.map((promo, promoIndex) => {
              const action = () => {
                const deepLinkingObject: IPromoDeepLink = promo.deepLinking;
                deepLink(deepLinkingObject);
                recordEvent(CONSTANT_explore.event, {
                  click: CONSTANT_explore.click.dealsFromOurPartnersCard
                });
              };
              return (
                <PromoCard
                  key={promoIndex}
                  action={action}
                  thumbnail={{
                    uri: getImgIXUrl({
                      src: promo.imageUrl,
                      DPR: 0.02,
                      imgFactor: `h=${PROMO_CARD_IMAGE_HEIGHT}&w=${PROMO_CARD_IMAGE_WIDTH}&crop=fit`
                    })
                  }}
                  image={{
                    uri: getImgIXUrl({
                      src: promo.imageUrl,
                      imgFactor: `h=${PROMO_CARD_IMAGE_HEIGHT}&w=${PROMO_CARD_IMAGE_WIDTH}&crop=fit`
                    })
                  }}
                  price={promo.cost}
                  text={promo.text}
                  containerStyle={styles.promoCardWrapper}
                  promoCardImageStyle={styles.promoCardImage}
                  displayCurrency={displayCurrency}
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
