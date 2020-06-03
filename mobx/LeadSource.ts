import { observable, action, computed, toJS } from "mobx";

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

export type leadSourceType = IDeepLinkClick;

class LeadSource {
  @observable
  _source: leadSourceType[] = [];

  @observable
  _activeDeeplink: IDeepLinkClick | null = null;

  @computed
  get activeDeeplink() {
    return toJS(this._activeDeeplink);
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
  clear = () => {
    this._source = [];
  };

  @action
  record = () => {
    this.clear();
  };
}

export default LeadSource;
