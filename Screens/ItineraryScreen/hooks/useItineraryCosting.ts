import { IGCMRequestBody } from "../../GCMScreen/hooks/useGCMForm";
import {
  CONSTANT_calculateCost,
  CONSTANT_checkCostingStatus
} from "../../../constants/apiUrls";
import apiCall from "../../../Services/networkRequests/apiCall";
import { CONSTANT_responseSuccessStatus } from "../../../constants/stringConstants";
import { useState } from "react";

export const updateCost = (
  itineraryId: string,
  costingConfig: IGCMRequestBody
): Promise<boolean> => {
  return new Promise<boolean>(async (resolve, reject) => {
    try {
      const costingCallStartResponse = await apiCall(
        CONSTANT_calculateCost.replace(":itineraryId", itineraryId),
        costingConfig,
        "POST"
      );
      if (costingCallStartResponse.status === CONSTANT_responseSuccessStatus) {
        const checkCostingStatus = () => {
          setTimeout(async () => {
            const checkCostingResponse = await apiCall(
              CONSTANT_checkCostingStatus.replace(":itineraryId", itineraryId),
              {},
              "GET"
            );
            if (
              checkCostingResponse.status === CONSTANT_responseSuccessStatus
            ) {
              if (checkCostingResponse.data !== "COMPLETE") {
                checkCostingStatus();
              } else if (checkCostingResponse.data === "ERROR") {
                reject();
              } else {
                resolve(true);
              }
            } else {
              reject();
            }
          }, 1500);
        };
        checkCostingStatus();
      } else {
        reject();
      }
    } catch (e) {
      reject();
    }
  });
};

const useItineraryCosting = () => {
  const [isCosting, setIsCosting] = useState<boolean>(false);

  const updateItineraryCost = (
    itineraryId: string,
    costingConfig: IGCMRequestBody
  ): Promise<boolean> => {
    setIsCosting(true);
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        await updateCost(itineraryId, costingConfig);
        setIsCosting(false);
        resolve(true);
      } catch (e) {
        setIsCosting(false);
        reject();
      }
    });
  };

  return { isCosting, updateItineraryCost };
};

export default useItineraryCosting;
