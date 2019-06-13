import { observable, computed, action, toJS } from "mobx";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import getActiveRouteName from "../Services/getActiveRouteName/getActiveRouteName";
import { toastBottom } from "../Services/toast/toast";
import { LayoutAnimation } from "react-native";
import _ from "lodash";
import { logError } from "../Services/errorLogger/errorLogger";

class FeedbackPrompt {
  static hydrator = storeInstance => null;

  @action
  reset = () => {
    this._isFeedbackDataLoading = false;
    this._feedbackDataError = false;

    this._isFeedbackPositive = true;
    this._isFeedbackPanelVisible = false;

    this._isSubmitFeedbackLoading = false;
    this._submitFeedbackError = false;

    this._isFeedbackFooterVisible = false;
    this._isFeedbackFooterDisabled = false;
    this._isFeedbackFooterActive = true;

    this._feedbackData = [];
    this._animatedFeedbackOptions = {};
  };

  @observable _isFeedbackDataLoading = false;
  @observable _feedbackDataError = false;

  @observable _isFeedbackPositive = true;

  /**
   * This flag is used to let other screens know if the feedback panel is visible
   * - Used in the tripfeed screen to show an overlay that helps with background for the
   * panel dragging animation
   */
  @observable _isFeedbackPanelVisible = false;

  @observable _isSubmitFeedbackLoading = false;
  @observable _submitFeedbackError = false;

  /**
   * Will hide the feedback footer from view
   * used for hiding it in unnecessary pages
   * @type {boolean}
   * @private
   */
  @observable _isFeedbackFooterVisible = false;

  /**
   * Used to hide it completely even in the required pages
   * @type {boolean}
   * @private
   */
  @observable _isFeedbackFooterDisabled = false;

  /**
   * Used to completely kill (unmount) the footer
   * this will reset all the internal states of the component.
   * @type {boolean}
   * @private
   */
  @observable _isFeedbackFooterActive = true;

  @observable _feedbackData = [];

  @observable _animatedFeedbackOptions = {};

  @computed
  get isFeedbackFooterVisible() {
    return this._isFeedbackFooterVisible;
  }

  @computed
  get isFeedbackFooterActive() {
    return this._isFeedbackFooterActive;
  }

  @computed
  get isFeedbackPositive() {
    return this._isFeedbackPositive;
  }

  @computed
  get isFeedbackPanelVisible() {
    return this._isFeedbackPanelVisible;
  }

  @action
  feedbackPanelOpened = () => {
    this._isFeedbackPanelVisible = true;
  };

  @action
  feedbackPanelClosed = () => {
    this._isFeedbackPanelVisible = false;
  };

  @action
  setPositiveFeedbackMode = () => {
    this._isFeedbackPositive = true;
  };

  @action
  setNegativeFeedbackMode = () => {
    this._isFeedbackPositive = false;
  };

  @action
  setFooterVisibility = visibility =>
    (this._isFeedbackFooterVisible = visibility);

  /**
   * Check if the feedback footer should be displayed in the current screen
   */
  @action
  trackScreen = (prevState, currentState) => {
    const currentScreen = getActiveRouteName(currentState);
    const prevScreen = getActiveRouteName(prevState);
    if (prevScreen !== currentScreen) {
      if (
        [
          "TripFeedHome"
          // "Bookings",
          // "Tools",
          // "Journal"
        ].indexOf(currentScreen) > -1
      ) {
        this.setFooterVisibility(true);
      } else {
        this.setFooterVisibility(false);
      }
    }
  };

  @computed
  get feedbackOptions() {
    if (!this._feedbackData.length) return {};
    return toJS(this._feedbackData[0]);
  }

  @computed
  get animatedFeedbackOptions() {
    if (_.isEmpty(this._animatedFeedbackOptions)) return {};
    return toJS(this._animatedFeedbackOptions);
  }

  /**
   * Resets the animation for the feedback options
   */
  @action
  resetAnimationFeedback = () => {
    this._animatedFeedbackOptions = {};
  };

  /**
   * Used for animating the feedback options when the user opens the feedback panel
   * - Will load the feedback options in intervals of 300ms
   * - Will also set the layout animations for the options
   * - Requires the animation to be reset to be used again
   */
  @action
  animateFeedbackOptions = () => {
    if (this.feedbackOptions.items && this.feedbackOptions.items.length) {
      const totalPositiveOptions =
        this.feedbackOptions.items[0].options.length - 1;
      const totalNegativeOptions =
        this.feedbackOptions.items[1].options.length - 1;
      /**
       * Creates an empty feedback options array. Data will be added for
       * positive and negative feedback in the interval functions
       */
      this._animatedFeedbackOptions = {
        ...this.feedbackOptions,
        items: [
          {
            options: this.feedbackOptions.items[0].options.map(option => {
              option.isVisible = false;
              return option;
            }),
            title: this.feedbackOptions.items[0].title,
            desc: this.feedbackOptions.items[0].desc
          },
          {
            options: this.feedbackOptions.items[1].options.map(option => {
              option.isVisible = false;
              return option;
            }),
            title: this.feedbackOptions.items[1].title,
            desc: this.feedbackOptions.items[1].desc
          }
        ]
      };

      let positiveCounter = 0;
      let negativeCounter = 0;

      /**
       * This will add the positive feedback options
       */
      const increasePositiveFeedbackOptions = index => {
        try {
          const item = this.feedbackOptions.items[0].options[index];
          item.isVisible = true;
          const newFeedBackOptions = { ...this.animatedFeedbackOptions };
          newFeedBackOptions.items[0].options[index] = item;
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this._animatedFeedbackOptions = newFeedBackOptions;
          if (positiveCounter >= totalPositiveOptions)
            clearInterval(positiveAnimationInterval);
          else positiveCounter++;
        } catch (e) {
          logError("Failed to animate feedback options", { e });
        }
      };

      /**
       * This will add the negative feedback options
       */
      const increaseNegativeFeedbackOptions = index => {
        try {
          const item = this.feedbackOptions.items[1].options[index];
          item.isVisible = true;
          const newFeedBackOptions = { ...this.animatedFeedbackOptions };
          newFeedBackOptions.items[1].options[index] = item;
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this._animatedFeedbackOptions = newFeedBackOptions;
          if (negativeCounter >= totalNegativeOptions)
            clearInterval(negativeAnimationInterval);
          else negativeCounter++;
        } catch (e) {
          logError("Failed to animate feedback options", { e });
        }
      };

      const positiveAnimationInterval = setInterval(() => {
        increasePositiveFeedbackOptions(positiveCounter);
      }, 300);
      const negativeAnimationInterval = setInterval(() => {
        increaseNegativeFeedbackOptions(negativeCounter);
      }, 300);
    }
  };

  /**
   * Will fetch the data necessary to display the feedback footer
   * has a callback used to reset footer after submitting data
   */
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

  @action
  submitFeedback = (feedbackData, submitApiURL) => {
    this._isFeedbackFooterDisabled = true;
    this._isSubmitFeedbackLoading = true;
    apiCall(submitApiURL, feedbackData)
      .then(response => {
        this._isSubmitFeedbackLoading = false;
        this._isFeedbackFooterDisabled = false;

        if (response.status === constants.responseSuccessStatus) {
          this._submitFeedbackError = false;
          this._isFeedbackFooterActive = false;

          toastBottom(constants.feedbackFooterText.submitSuccessful);

          this.fetchFeedBackData(() => {
            /**
             * Wait for Two seconds for the toast message to clear up
             * Then re-activate the footer to collect feedback of previous day
             */
            setTimeout(() => {
              this._isFeedbackFooterActive = true;
            }, 2000);
          });
        } else {
          toastBottom(constants.feedbackFooterText.submitFailed);
          this._submitFeedbackError = true;
        }
      })
      .catch(() => {
        this._isSubmitFeedbackLoading = false;
        this._isFeedbackFooterDisabled = false;
        this._submitFeedbackError = true;
        toastBottom(constants.feedbackFooterText.submitFailed);
      });
  };
}

export default FeedbackPrompt;
