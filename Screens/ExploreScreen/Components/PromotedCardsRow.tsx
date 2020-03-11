import React from "react";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { IPromotedSection } from "../ExploreFeedType";
import PromoCard from "../../../CommonComponents/PromoCard/PromoCard";
import getPriceWithoutSymbol from "../services/getPriceWithoutSymbol";
import deepLink from "../../../Services/deepLink/deepLink";

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
                  image={{ uri: promo.imageUrl }}
                  price={getPriceWithoutSymbol(promo.cost)}
                  text={promo.text}
                />
              );
            })
          : null;
      }}
    </HorizontalCardsRow>
  );
};

export default PromotedCardsRow;
