// @ts-ignore
import branch from "react-native-branch";
import { logError } from "../../errorLogger/errorLogger";
import deepLink from "../../deepLink/deepLink";

export interface IBranchSubscribeParams {
  error: any;
  params: any;
  uri: any;
}

const enableDeepLinking = () => {
  branch.subscribe(({ error, params, uri }: IBranchSubscribeParams) => {
    if (uri) {
      if (error) {
        logError(error, {
          type: "Unable to Deeplink with Branch"
        });
        return;
      }

      try {
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
