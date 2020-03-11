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
