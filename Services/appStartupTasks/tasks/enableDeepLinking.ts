// @ts-ignore
import branch from "react-native-branch";
import { logError } from "../../errorLogger/errorLogger";
import deepLink from "../../deepLink/deepLink";
import { IBranchDeepLinkClickEvent } from "../../../mobx/LeadSource";
import storeService from "../../storeService/storeService";

export interface IBranchSubscribeParams {
  error: any;
  params: IBranchDeepLinkClickEvent;
  uri: string;
}

const enableDeepLinking = () => {
  branch.subscribe(({ error, params, uri }: IBranchSubscribeParams) => {
    if (error) {
      logError(error, {
        type: "Unable to Deeplink with Branch"
      });
      return;
    }

    storeService.leadSourceStore.clear();
    // User clicked a branch deep link
    if (uri) {
      try {
        storeService.leadSourceStore.setActiveDeeplink({
          uri,
          type: "DeepLinkClick",
          ...params
        });
        storeService.leadSourceStore.logAction({
          uri,
          type: "DeepLinkClick",
          ...params
        });
        const meta = params.$custom_meta_tags
          ? JSON.parse(params.$custom_meta_tags)
          : "";

        const screen = params.screen;

        if (screen) {
          deepLink({
            link: screen,
            screenData: meta
          });
        }
      } catch (e) {
        logError(e, {
          type: "Unable to parse deeplink url"
        });
      }
    }
  });
};

export default enableDeepLinking;
