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
  apiUrl?: string;
  requestPayload?: object;
  httpMethod?: NetworkRequestMethodTypes;
}

export interface IExploreSectionTitle {
  title: string;
  color: string;
  subTitle: string;
}

export interface IHeroBanner extends ILoadCardRequest {
  type: string;
  imageUrl: string;
  deepLinking: IExploreFeedLinks;
}

export interface IHeroBannerSection extends IExploreSectionTitle {
  type: "HERO_BANNER";
  items: IHeroBanner[];
}

export interface IItinerarySection
  extends ILoadCardRequest,
    IExploreSectionTitle {
  type: "ITINERARY_CARDS";
}

export interface ICountriesSection
  extends ILoadCardRequest,
    IExploreSectionTitle {
  type: "COUNTRY_CARDS";
}

export interface IPromotedItem {
  type: string;
  imageUrl: string;
  text: string;
  cost: string;
  deepLinking: IExploreFeedLinks;
}

export interface IPromotedSection
  extends IExploreSectionTitle,
    ILoadCardRequest {
  type: "PROMOTED_CARDS";
  items: IPromotedItem[];
}

export interface IBlogCard {
  blogText: string;
  bgColor: string;
  deepLinking: IExploreFeedLinks;
}

export interface IBlogSection extends IExploreSectionTitle {
  type: "BLOG_CARDS";
  items: IBlogCard[];
}

export type ExploreFeedItemType =
  | IHeroBannerSection
  | IItinerarySection
  | ICountriesSection
  | IPromotedSection
  | IBlogSection;

export type ExploreFeedType = ExploreFeedItemType[];
