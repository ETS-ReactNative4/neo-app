import { NetworkRequestMethodTypes } from "../../Services/networkRequests/hooks/useApiCall";

export interface IExploreFeedLinks {
  link: string;
  screenData?: object;
}

export interface ICardDataRequestBody {
  key: string;
  budgets?: string[];
  testimonials?: string;
  limit?: number;
  journalTestimonials?: boolean;
}

export interface ILoadCardRequest {
  apiUrl: string;
  requestPayload?: object;
  requestMethod: NetworkRequestMethodTypes;
}

export interface IExploreSectionTitle {
  title: string;
  color: string;
  subTitle: string;
}

export interface IHeroBanner extends IExploreFeedLinks {
  type: string;
  imageUrl: string;
}

export interface IHeroBannerSection {
  type: "HERO_BANNER";
  items: IHeroBanner[];
}

export interface IHandPickedItinerarySection
  extends ILoadCardRequest,
    IExploreSectionTitle {
  type: "HANDPICKED_ITINERARIES";
}

export type ExploreFeedItemType = IHeroBannerSection;

export type ExploreFeedType = ExploreFeedItemType[];
