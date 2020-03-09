import React from "react";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { IPromotedSection } from "../ExploreFeedType";
import PromoCard from "../../../CommonComponents/PromoCard/PromoCard";
import getPriceWithoutSymbol from "../services/getPriceWithoutSymbol";

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
              return (
                <PromoCard
                  key={promoIndex}
                  action={() => null}
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
