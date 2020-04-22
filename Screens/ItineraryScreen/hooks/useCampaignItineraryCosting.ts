import {
  CONSTANT_assignUser,
  CONSTANT_calculateCost,
  CONSTANT_checkCostingStatus
} from "../../../constants/apiUrls";
import apiCall from "../../../Services/networkRequests/apiCall";
import { CONSTANT_responseSuccessStatus } from "../../../constants/stringConstants";
import { IGCMRequestBody } from "../../GCMScreen/hooks/useGCMForm";
import { useState } from "react";
import { toastBottom } from "../../../Services/toast/toast";

export const costItinerary = (
  campaignItineraryId: string,
  costingConfig: IGCMRequestBody
): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    try {
      const assignUserResponse = await apiCall(
        CONSTANT_assignUser.replace(
          ":campaignItineraryId",
          campaignItineraryId
        ),
        {},
        "POST"
      );
      if (assignUserResponse.status === CONSTANT_responseSuccessStatus) {
        const itineraryId = assignUserResponse.data;
        costingConfig.itineraryId = itineraryId;
        const costingCallStartResponse = await apiCall(
          CONSTANT_calculateCost.replace(":itineraryId", itineraryId),
          costingConfig,
          "POST"
        );
        if (
          costingCallStartResponse.status === CONSTANT_responseSuccessStatus
        ) {
          const checkCostingStatus = () => {
            setTimeout(async () => {
              const checkCostingResponse = await apiCall(
                CONSTANT_checkCostingStatus.replace(
                  ":itineraryId",
                  itineraryId
                ),
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
                  resolve(itineraryId);
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
      } else {
        reject();
      }
    } catch (e) {
      reject();
    }
  });
};

const useCampaignItineraryCosting = () => {
  const [itineraryId, setItineraryId] = useState<string>("");
  const [isCosting, setIsCosting] = useState<boolean>(false);

  const costCampaignItinerary = async (
    campaignItineraryId: string,
    costingConfig: IGCMRequestBody
  ) => {
    setIsCosting(true);
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const newItineraryId = await costItinerary(
          campaignItineraryId,
          costingConfig
        );
        setItineraryId(newItineraryId);
        setIsCosting(false);
        resolve(true);
      } catch (e) {
        toastBottom("Unable to update latest cost");
        setIsCosting(false);
        reject();
      }
    });
  };

  return { itineraryId, isCosting, costCampaignItinerary };
};

export default useCampaignItineraryCosting;
