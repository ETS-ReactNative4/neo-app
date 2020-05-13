import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_getIndianCities } from "../../../constants/apiUrls";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";
import { IIndianCity } from "../../GCMScreen/hooks/useGCMForm";

export interface ICitiesListSuccessResponse extends IMobileServerResponse {
  data: IIndianCity[];
}

export interface ICitiesResponseHookData extends IApiCallHookData {
  successResponseData: ICitiesListSuccessResponse | undefined;
}

const useGetIndianCities = (): [
  ICitiesResponseHookData,
  () => Promise<boolean>
] => {
  const [apiCallDetails, makeApiCall] = useApiCall();

  const getIndianCities = (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_getIndianCities
        });
        resolve(result);
      } catch (e) {
        reject(e);
      }
    });
  };

  return [apiCallDetails as ICitiesResponseHookData, getIndianCities];
};

export default useGetIndianCities;
