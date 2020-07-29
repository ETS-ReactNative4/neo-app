import { CONSTANT_itineraryMagicLink } from "../../constants/apiUrls";
import apiCall from "../networkRequests/apiCall";
import { IMobileServerResponse } from "../../TypeInterfaces/INetworkResponse";
import { toastBottom } from "../toast/toast";
import { CONSTANT_responseSuccessStatus } from "../../constants/stringConstants";
import deepLink from "../deepLink/deepLink";

export interface IMagicLinkResponse extends IMobileServerResponse {
  data: { itineraryId: string; email: string; hash: string; magicUrl: string };
}

const openItineraryOnWeb = (itinearyId: string) => {
  apiCall(CONSTANT_itineraryMagicLink, {
    itinearyId
  })
    .then((response: IMagicLinkResponse) => {
      if (response.status === CONSTANT_responseSuccessStatus) {
        deepLink({
          link: response.data.magicUrl
        });
      } else {
        toastBottom("Unable to open Itineary");
      }
    })
    .catch(() => {
      toastBottom("Unable to open Itineary");
    });
};

export default openItineraryOnWeb;
