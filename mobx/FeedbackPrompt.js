import React from "react";
import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import _ from "lodash";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { logError } from "../Services/errorLogger/errorLogger";

class FeedbackPrompt {
  static hydrator = storeInstance => {
    hydrate("_feedbackData", storeInstance)
      .then(() => {})
      .catch(err => logError(err));
  };

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

  @persist("object")
  @observable
  _feedbackData = [];

  @computed
  get feedbackData() {
    return toJS(this._feedbackData);
  }

  @action
  fetchFeedBackData = callback => {
    this._feedbackData = [
      {
        title: "How was your day ?",
        items: [
          {
            title: "Yeah",
            options: [
              {
                identifier: "ACTIVITY_658_03_May_2019",
                text:
                  "White Water Rafting in Ayung River for a thrilling aquatic adventure"
              }
            ]
          }
        ]
      }
    ];
    this._isFeedbackFooterVisible = true;
    callback();
  };
}

export default FeedbackPrompt;
