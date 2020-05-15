import React from "react";
import PromoCarousal from "../../../CommonComponents/PromoCarousal/PromoCarousal";
import { IHeroBannerSection } from "../ExploreFeedType";
import deepLink from "../../../Services/deepLink/deepLink";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import {
  CAROUSEL_IMAGE_HEIGHT,
  CAROUSEL_IMAGE_WIDTH
} from "../../../CommonComponents/PromoCarousal/Components/PromoCarousalImage";

const HeroBannerRow = (props: IHeroBannerSection) => {
  return (
    <PromoCarousal
      images={props.items.map(item => {
        return {
          url: getImgIXUrl({
            src: item.imageUrl,
            imgFactor: `h=${CAROUSEL_IMAGE_HEIGHT}&w=${CAROUSEL_IMAGE_WIDTH}&crop=fit`
          }),
          thumbnail: getImgIXUrl({
            src: item.imageUrl,
            DPR: 0.02,
            imgFactor: `h=${CAROUSEL_IMAGE_HEIGHT}&w=${CAROUSEL_IMAGE_WIDTH}&crop=fit`
          }),
          action: () =>
            deepLink({
              link: item.deepLinking?.link,
              screenData: item.deepLinking?.screenData || {}
            })
        };
      })}
    />
  );
};

export default HeroBannerRow;
