import { IItinerary } from "./IItinerary";
import {
  ICampaignSeoDetails,
  ICampaignMetaData,
  ICampaignDetails
} from "./ICampaignDetails";

export interface ICampaignItinerary {
  campaignItinerary: IItinerary;
  seoMapping: ICampaignSeoDetails;
  metaData: ICampaignMetaData;
  campaignDetail: ICampaignDetails;
  campaignItineraryId: string;
  slug: boolean;
}
