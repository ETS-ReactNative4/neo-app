import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {CONSTANT_retrieveGlobalData} from '../../../constants/apiUrls';
import {IMobileServerResponse} from '../../../TypeInterfaces/INetworkResponse';

export type VacationThemeType = {
  title: string;
  data: {
    image: string;
    searchQuery: string;
    title: string;
  }[];
};

export type TopResortType = {
  title: string;
  data: {
    image: string;
    searchQuery: string;
    title: string;
    isDeal: boolean;
  }[];
};

export interface ISearchScreenDataResponseType extends IMobileServerResponse {
  data: [
    {
      _id: string;
      locale: string;
      page: string;
      key: string;
      value: {
        vacationTheme: VacationThemeType;
        topResort: TopResortType;
      };
    },
  ];
}

export interface ISearchScreenDataHookType extends IApiCallHookData {
  successResponseData: ISearchScreenDataResponseType | undefined;
}

export type useSearchScreenDataApi = [
  ISearchScreenDataHookType,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useSearchScreenDataRequest = (): [
  ISearchScreenDataHookType,
  () => Promise<boolean>,
] => {
  const [apiResponse, makeApiCall] = useApiCall() as useSearchScreenDataApi;

  const loadSearchScreenData = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: `${CONSTANT_retrieveGlobalData}?pageName=mobile_search`,
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiResponse, loadSearchScreenData];
};

export default useSearchScreenDataRequest;
