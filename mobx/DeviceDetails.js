import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import _ from "lodash";
import apiCall from "../Services/networkRequests/apiCall";
import { readDeviceInfo } from "../Services/deviceInfo/deviceInfo";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { logError } from "../Services/errorLogger/errorLogger";

class DeviceDetails {
  static hydrator = storeInstance => {
    hydrate("_deviceDetails", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
  };

  reset = () => {
    this._deviceDetails = {};
  };

  @persist("object")
  @observable
  _deviceDetails = {};

  @computed
  get deviceDetails() {
    return toJS(this._deviceDetails);
  }

  @action
  setDeviceDetails = () => {
    readDeviceInfo(deviceInfo => {
      if (!_.isEqual(this.deviceDetails, deviceInfo)) {
        if (deviceInfo.deviceId) {
          apiCall(constants.setDeviceInfo, deviceInfo).then(response => {
            if (response.status === constants.responseSuccessStatus) {
              this._deviceDetails = deviceInfo;
            }
          });
        }
      }
    });
  };
}

export default DeviceDetails;
