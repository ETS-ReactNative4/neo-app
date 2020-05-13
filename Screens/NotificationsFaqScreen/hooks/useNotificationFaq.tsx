import { useLocalStore } from "mobx-react";
import { toJS } from "mobx";
import { CONSTANT_retrieveJson } from "../../../constants/apiUrls";
import apiCall from "../../../Services/networkRequests/apiCall";
import { createTransformer } from "mobx-utils";
import { logError } from "../../../Services/errorLogger/errorLogger";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";

export interface IFaqResponse extends IMobileServerResponse {
  data: {
    [section: string]: IFaqSet;
  };
}

export interface IFaqSet {
  questions: IFaq[];
  category: string;
  categoryDisplayStr: string;
  categoryId: string;
}

export interface IFaq {
  q: string;
  a: string;
  id: string;
}

export interface IFaqBlock {
  answer: string;
  question: string;
}

export interface IFaqDetails {
  [category: string]: {
    [id: string]: IFaqBlock;
  };
}

const useNotificationFaq = () => {
  const store = useLocalStore(() => {
    return {
      _faqDetails: {} as IFaqDetails,
      get faqDetails() {
        return toJS(store._faqDetails);
      },
      getFaqByType: createTransformer((faqSection: string) => {
        try {
          const faqObject: any = toJS(store._faqDetails[faqSection]);
          return Object.values(faqObject) as IFaqBlock[];
        } catch (e) {
          logError(e);
          return [];
        }
      }),
      loadFaqDetails: () => {
        apiCall(`${CONSTANT_retrieveJson}?jsonFile=faq.json`, {}, "GET")
          .then((response: IFaqResponse) => {
            if (response.status === "SUCCESS") {
              const faqData = response.data;
              const faqDetails: IFaqDetails = {};
              for (let key in faqData) {
                if (faqData.hasOwnProperty(key)) {
                  const categoryDisplayStr = faqData[key].categoryDisplayStr;
                  faqDetails[categoryDisplayStr] = (
                    faqData[key].questions || []
                  ).reduce((qaMap: any, qa) => {
                    qaMap[qa.id] = {
                      question: qa.q,
                      answer: qa.a
                    };
                    return qaMap;
                  }, {});
                }
              }
              store._faqDetails = faqDetails;
            }
          })
          .catch(() => {});
      }
    };
  });
  return store;
};

export default useNotificationFaq;
