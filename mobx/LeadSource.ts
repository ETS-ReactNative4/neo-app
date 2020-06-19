import { observable, action, computed, toJS } from "mobx";
import {
  CONSTANT_itineraryCostedEvent,
  CONSTANT_requestCallbackEvent
} from "../constants/appEvents";
import { recordEvent } from "../Services/analytics/analyticsService";

export interface IBranchDeepLinkClickEvent {
  $canonical_url: string;
  $custom_meta_tags: string;
  $ios_passive_deepview: string;
  $marketing_title: string;
  $og_description: string;
  $og_title: string;
  $one_time_use: boolean;
  "+click_timestamp": number;
  "+clicked_branch_link": boolean;
  "+is_first_session": boolean;
  "+match_guaranteed": boolean;
  screen: string;
  "~campaign": string;
  "~creation_source": number;
  "~feature": string;
  "~id": string;
  "~marketing": boolean;
  "~referring_link": string;
  "~tags"?: string[];
  "~channel": string;
}

export interface LeadSourceEvent {
  type: string;
}

export interface IDeepLinkClick
  extends IBranchDeepLinkClickEvent,
    LeadSourceEvent {
  type: "DeepLinkClick";
  uri: string;
}

export interface IListingPageClick extends LeadSourceEvent {
  type: "ViewListingPage";
  slug: string;
}

export interface IItineraryPageClick extends LeadSourceEvent {
  type: "ViewItineraryPage";
  slug?: string;
  itineraryId?: string;
}

export type leadSourceType =
  | IDeepLinkClick
  | IListingPageClick
  | IItineraryPageClick;

export type ConversionEventsType =
  | typeof CONSTANT_itineraryCostedEvent.event
  | typeof CONSTANT_requestCallbackEvent.event;

class LeadSource {
  @observable
  _source: leadSourceType[] = [];

  @observable
  _activeDeeplink: IDeepLinkClick | null = null;

  @computed
  get activeDeeplink() {
    return toJS(this._activeDeeplink);
  }

  @computed
  get source() {
    return toJS(this._source);
  }

  @action
  setActiveDeeplink(deeplink: IDeepLinkClick) {
    this._activeDeeplink = deeplink;
  }

  @action
  logAction = (userAction: leadSourceType) => {
    this._source.push(userAction);
  };

  @action
  clearLastAction = () => {
    this._source.pop();
  };

  @action
  clear = () => {
    this._activeDeeplink = null;
    this._source = [];
  };

  @action
  record = (event: ConversionEventsType) => {
    recordEvent(event, {
      actions: this.source
    });
    this.clear();
  };
}

export default LeadSource;
