import {
  observable
  //computed, action, toJS
} from "mobx";

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

class LeadSource {
  @observable
  _source = [];
}

export default LeadSource;
