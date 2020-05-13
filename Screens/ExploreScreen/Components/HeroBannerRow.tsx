import React from "react";
import PromoCarousal from "../../../CommonComponents/PromoCarousal/PromoCarousal";
import { IHeroBannerSection } from "../ExploreFeedType";
import deepLink from "../../../Services/deepLink/deepLink";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";

const HeroBannerRow = (props: IHeroBannerSection) => {
  return (
    <PromoCarousal
      images={props.items.map(item => {
        return {
          url: getImgIXUrl({ src: item.imageUrl }),
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
