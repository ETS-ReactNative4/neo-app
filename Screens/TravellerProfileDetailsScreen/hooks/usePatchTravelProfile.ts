import useApiCall, {
  IApiCallHookData
} from "../../../Services/networkRequests/hooks/useApiCall";
import { hotelCategoriesType } from "./useRetrieveTravelProfile";
import { CONSTANT_travelProfile } from "../../../constants/apiUrls";

export interface ITraveProfilePatchParams {
  hotelCategories?: hotelCategoriesType[];
  medicalConditions?: string;
  physicalDisabilities?: boolean;
}

const usePatchTravelProfile = (): [
  IApiCallHookData,
  (requestBody: ITraveProfilePatchParams) => Promise<boolean>
] => {
  const [apiResponse, makeApiCall] = useApiCall();

  const patchTravelProfile = (
    requestBody: ITraveProfilePatchParams
  ): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: CONSTANT_travelProfile,
          method: "PATCH",
          requestBody
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [apiResponse, patchTravelProfile];
};

export default usePatchTravelProfile;
