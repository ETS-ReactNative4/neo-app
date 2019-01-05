import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";
import moment from "moment";
import _ from "lodash";

class TripFeed {
  @persist("list")
  @observable
  _widgets = [];

  @observable _isLoading = false;

  @observable _hasError = false;

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get widgets() {
    try {
      return toJS(
        _.sortBy(
          this._widgets.filter(
            widget => widget.expiry === -1 || moment().valueOf() < widget.expiry
          ),
          "pos"
        )
      );
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @action
  generateTripFeed = () => {
    this._isLoading = true;
    apiCall(
      `${constants.getTripFeed}?itineraryId=${
        storeService.itineraries.selectedItineraryId
      }`,
      {}
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._widgets = response.data;
          this._hasError = false;
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._isLoading = false;
        this._hasError = true;
        logError(err);
      });
  };
}

export default TripFeed;
