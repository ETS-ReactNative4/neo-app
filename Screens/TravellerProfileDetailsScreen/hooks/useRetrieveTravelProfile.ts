import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { CONSTANT_travelProfile } from "../../../constants/apiUrls";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";

export type hotelCategoriesType = "2 Star" | "3 Star" | "4 Star" | "5 Star";

export interface ITravelProfileData {
  hotelCategories: hotelCategoriesType[];
  medicalConditions: string;
  physicalDisabilities: boolean;
}

export interface ITravelProfileResponseData extends IMobileServerResponse {
  data: ITravelProfileData;
}

export interface ITravelProfileHookData extends IApiCallHookData {
  successResponseData: ITravelProfileResponseData | undefined;
}

const useRetrieveTravelProfile = (): [
  ITravelProfileHookData,
  () => Promise<boolean>
] => {
  const [apiResponse, makeApiCall] = useApiCall();

  const getTravelProfile = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_travelProfile
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiResponse as ITravelProfileHookData, getTravelProfile];
};

export default useRetrieveTravelProfile;
