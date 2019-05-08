import React from "react";
import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import _ from "lodash";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { logError } from "../Services/errorLogger/errorLogger";
import storeService from "../Services/storeService/storeService";

class FeedbackPrompt {
  static hydrator = storeInstance => {};

  @action
  reset = () => {
    this._isFeedbackDataLoading = false;
    this._feedbackDataError = false;

    this._isSubmitFeedbackLoading = false;
    this._submitFeedbackError = false;

    this._isPositiveFeedbackMode = false;

    this._feedbackData = [];
  };

  @observable _isFeedbackDataLoading = false;
  @observable _feedbackDataError = false;

  @observable _isSubmitFeedbackLoading = false;
  @observable _submitFeedbackError = false;

  @observable _isPositiveFeedbackMode = false;

  @observable _isFeedbackFooterVisible = false;

  _componentRefs = {
    feedbackFooterBar: React.createRef()
  };

  @observable _feedbackData = [];

  @computed
  get feedbackOptions() {
    if (!this._feedbackData.length) return {};
    return toJS(this._feedbackData[0]);
  }

  @action
  fetchFeedBackData = (callback = () => null) => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    this._isFeedbackDataLoading = true;
    apiCall(
      `${constants.getDaywiseFeedbackOptions}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        this._isFeedbackDataLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._feedbackDataError = false;
          this._feedbackData = response.data;
          this._isFeedbackFooterVisible = true;
          callback();
        } else {
          this._feedbackDataError = true;
        }
      })
      .catch(() => {
        this._feedbackDataError = true;
        this._isFeedbackDataLoading = false;
      });
  };
}

export default FeedbackPrompt;
