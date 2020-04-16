export interface ICampaignSeoDetails {
  _id: string;
  seoId: string;
  metaTitle: string;
  metaDescription: string;
  h1Title: string;
  seoContent: string;
  pageUrl: string;
  addMetaNoFollow: boolean;
  h1TitleDisplay: string;
  seoShortDescription: string;
}

export interface ICampaignDetails {
  key: string;
  region: string;
  regionCode: string;
  avgCHRating: number;
  totalNumberOfCHRatings: number;
  name: string;
  bannerText: string;
  headerSubText: string;
  image: string;
  mobileImage: string;
  logoUrl: string;
  seoDetails: ICampaignSeoDetails;
  faqDetails: string[];
  paid: boolean;
  noRegionThemeFilter: boolean;
  idealDuration: string;
  bestTimeToVisit: string;
  visaProcessingDays: string;
  template: string;
}

export interface ICampaignMetaData {
  title: string;
  description: string;
}
