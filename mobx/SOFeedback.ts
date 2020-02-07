import { action, computed, observable } from "mobx";
import { persist } from "mobx-persist";
import hydrate from "../Services/hydrate/hydrate";
import apiCall from "../Services/networkRequests/apiCall";
import { CONSTANT_feedbackInfo } from "../constants/apiUrls";
import { IMobileServerResponse } from "../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";
import { logError } from "../Services/errorLogger/errorLogger";

export interface ISODetailAPIResponse extends IMobileServerResponse {
  data: ISODetails;
}

export interface ISODetails {
  itineraryId: string;
  ownerName: string;
  ownerId: string;
  imageUrl: string;
  ownerDescription: string;
  ownerQualities: ISOQualities;
}

export interface ISOQualities {
  "1star": IQuality[];
  "2star": IQuality[];
  "3star": IQuality[];
  "4star": IQuality[];
  "5star": IQuality[];
}

export interface IQuality {
  qualityText: string;
  qualityImage: string;
}

export interface ISOFeedbackInfo {
  ownerId: string;
  ownerQuality: string;
  ownerNotes: string;
  ownerRating: number;
  ownerType: "SALES_OWNER" | "ACCOUNT_OWNER";
}

class SOFeedback {
  static hydrator = (storeInstance: SOFeedback) => {
    hydrate("_ownerId", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_ownerName", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_ownerName", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_ownerQualities", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_ownerDescription", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
  };

  reset = () => {
    this._ownerId = "";
    this._ownerName = "";
    this._ownerName = "";
    this._ownerQualities = null;
  };

  @persist
  @observable
  _ownerName: string = "";

  @persist
  @observable
  _ownerId: string = "";

  @persist
  @observable
  _ownerImage: string = "";

  @persist
  @observable
  _ownerDescription: string = "";

  @persist("object")
  @observable
  _ownerQualities: ISOQualities | null = null;

  @computed get ownerName() {
    return this._ownerName;
  }

  @computed get ownerId() {
    return this._ownerId;
  }

  @computed get ownerImage() {
    return this._ownerImage;
  }

  @computed get ownerQualities() {
    return this._ownerQualities;
  }

  @computed get ownerDescription() {
    return this._ownerDescription;
  }

  @action loadSODetails = (itineraryId: string) => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(
        `${CONSTANT_feedbackInfo}?itineraryId=${itineraryId}&type=SALES_OWNER`,
        {},
        "GET"
      )
        .then((response: ISODetailAPIResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            const {
              imageUrl,
              ownerId,
              ownerName,
              ownerQualities,
              ownerDescription
            } = response.data;
            this._ownerId = ownerId;
            this._ownerImage = imageUrl;
            this._ownerImage = ownerName;
            this._ownerQualities =
              {
                "1star": [],
                "2star": [],
                "3star": [
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  },
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  },
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  }
                ],
                "4star": [
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  },
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  },
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  }
                ],
                "5star": [
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  },
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  },
                  {
                    qualityImage: "",
                    qualityText: "Text"
                  }
                ]
              } || ownerQualities;
            this._ownerDescription = ownerDescription;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  };

  static saveSODetail = (itineraryId: string, requestBody: ISOFeedbackInfo) => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(
        `${CONSTANT_feedbackInfo}?itineraryId=${itineraryId}`,
        requestBody
      )
        .then(response => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(reject);
    });
  };
}

export default SOFeedback;
