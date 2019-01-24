import { LayoutAnimation } from "react-native";
import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";
import moment from "moment";
import _ from "lodash";

class TripFeed {
  @action
  reset = () => {
    this._widgets = [];
    this._isLoading = false;
    this._hasError = false;
    this._infoCardModal = {
      isVisible: false,
      modalData: {}
    };
  };

  @persist("list")
  @observable
  _widgets = [];

  @observable
  _infoCardModal = {
    isVisible: false,
    modalData: {}
  };
  _infoCardClearTimeout;

  @observable _isLoading = false;

  @observable _hasError = false;

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get widgets() {
    try {
      return toJS(this._widgets).filter(
        widget => widget.expiry === -1 || moment().valueOf() < widget.expiry
      );
    } catch (e) {
      logError(e);
      return [];
    }
  }

  @computed
  get infoCardModal() {
    return toJS(this._infoCardModal);
  }

  @action
  generateTripFeed = () => {
    this._isLoading = true;
    const { selectedItineraryId } = storeService.itineraries;
    if (selectedItineraryId) {
      apiCall(`${constants.getTripFeed}?itineraryId=${selectedItineraryId}`, {})
        .then(response => {
          this._isLoading = false;
          if (response.status === "SUCCESS") {
            const feedBackIndexes = [];
            const feedBackWidgets = [];
            const widgets = response.data;
            for (let i = 0; i <= widgets.length; i++) {
              const widget = widgets[i];
              if (widget && widget.type === "FEEDBACK_SWIPER") {
                feedBackIndexes.push(i);
                feedBackWidgets.push(widget);
              }
            }
            LayoutAnimation.configureNext(
              LayoutAnimation.Presets.easeInEaseOut
            );
            this._widgets = widgets;
            feedBackIndexes.forEach((indexOfFeedback, index) => {
              this._widgets.splice(indexOfFeedback, 1);
              LayoutAnimation.configureNext(
                LayoutAnimation.Presets.easeInEaseOut
              );
              this._widgets.splice(indexOfFeedback, 0, feedBackWidgets[index]);
            });
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
    }
  };

  @action
  openInfoCardModal = modalData => {
    clearTimeout(this._infoCardClearTimeout);
    this._infoCardModal = {
      isVisible: true,
      modalData
    };
  };

  @action
  closeInfoCardModal = () => {
    this._infoCardModal.isVisible = false;
    this._infoCardClearTimeout = setTimeout(() => {
      this._infoCardModal = {
        isVisible: false,
        modalData: {}
      };
    }, 150);
  };
}

export default TripFeed;
