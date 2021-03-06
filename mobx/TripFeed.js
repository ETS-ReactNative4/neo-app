import { LayoutAnimation, Platform } from "react-native";
import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";
import moment from "moment";
import _ from "lodash";
import { getDeviceToken } from "../Services/fcmService/fcm";

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
      return toJS(this._widgets);
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
    const generateWidgets = ({ isPushNotifEnabled = false }) => {
      const { selectedItineraryId } = storeService.itineraries;
      if (selectedItineraryId) {
        apiCall(
          `${constants.getTripFeed}?itineraryId=${selectedItineraryId}`,
          {},
          "POST",
          false,
          null,
          {
            pn:
              Platform.OS === constants.platformIos ? isPushNotifEnabled : true // TODO: Detect if push notifications is enabled on android
          }
        )
          .then(response => {
            this._isLoading = false;
            if (response.status === "SUCCESS") {
              const feedBackWidgets = [];
              const widgets = response.data;
              for (let i = 0; i <= widgets.length; i++) {
                const widget = widgets[i];
                if (widget && widget.type === "FEEDBACK_SWIPER") {
                  feedBackWidgets.push({
                    index: i,
                    widgetData: widget
                  });
                }
              }
              /**
               * Layout animation causes screen to break in Android
               */
              if (Platform.OS === constants.platformIos) {
                LayoutAnimation.configureNext(
                  LayoutAnimation.Presets.easeInEaseOut
                );
              }
              this._widgets = widgets;
              feedBackWidgets.forEach(feedBackWidget => {
                this._widgets.splice(feedBackWidget.index, 1);
                if (Platform.OS === constants.platformIos) {
                  LayoutAnimation.configureNext(
                    LayoutAnimation.Presets.easeInEaseOut
                  );
                }
                this._widgets.splice(
                  feedBackWidget.index,
                  0,
                  feedBackWidget.widgetData
                );
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
    /**
     * This will check if Push notifications are enabled on device
     * TODO: Only works for iOS
     */
    getDeviceToken(
      token => {
        // Will resolve to success only if push notifications are enabled in iOS
        generateWidgets({ isPushNotifEnabled: true });
      },
      () => {
        generateWidgets({});
      },
      () => {
        generateWidgets({});
      }
    );
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
