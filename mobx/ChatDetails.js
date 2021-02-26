import {observable, computed, action, toJS} from 'mobx';
import {persist} from 'mobx-persist';
import constants from '../constants/constants';
import {hydrate} from './Store';
import apiCall from '../Services/networkRequests/apiCall';
import storeService from '../Services/storeService/storeService';
import {logError} from '../Services/errorLogger/errorLogger';
import _ from 'lodash';
import {isStaycation} from '../Services/isStaycation/isStaycation';

class ChatDetails {
  static hydrator = storeInstance => {
    hydrate('_chatDetails', storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate('_chatActivationTime', storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate('_chatActivationMessage', storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate('_offlineContact', storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate('_unreadMessageCount', storeInstance)
      .then(() => {})
      .catch(err => logError(err));
    hydrate('_isChatActive', storeInstance)
      .then(() => {})
      .catch(err => logError(err));
  };

  @action
  reset = () => {
    this._chatDetails = {};
    this._chatActivationTime = 0;
    this._chatActivationMessage = constants.preTripChatText;
    this._offlineContact = '';
  };

  @persist('object')
  @observable
  _chatDetails = {};

  @persist
  @observable
  _offlineContact = '';

  @observable _isLoading = false;

  @observable _initializationError = false;

  @observable _metaDataError = false;

  @persist
  @observable
  _isChatActive = false;

  @persist
  @observable
  _chatActivationTime = 0;

  @persist
  @observable
  _unreadMessageCount = 0;

  @persist
  @observable
  _chatActivationMessage = constants.preTripChatText;

  @computed
  get unreadMessageCount() {
    return this._unreadMessageCount;
  }

  @computed
  get chatActivationMessage() {
    return this._chatActivationMessage;
  }

  @computed
  get offlineContact() {
    return this._offlineContact;
  }

  @computed
  get chatDetails() {
    return toJS(this._chatDetails);
  }

  @computed
  get initializationError() {
    return this._initializationError;
  }

  @computed
  get metaDataError() {
    return this._metaDataError;
  }

  @computed
  get isChatActive() {
    return this._isChatActive;
  }

  @computed
  get chatActivationTime() {
    return this._chatActivationTime;
  }

  @computed
  get currentTime() {
    if (_.isEmpty(this._chatDetails)) {
      return '';
    } else {
      return this._chatDetails.currentTime;
    }
  }

  @computed
  get isOffHours() {
    if (_.isEmpty(this._chatDetails)) {
      return false;
    } else {
      return this._chatDetails.isOffHours;
    }
  }

  /**
   * Retrieves the details needed for initializing chat.
   * This also includes the chat token and the host urls.
   *
   * The promise returned by this method will resolve only if the chat is
   * initialized for the user. All other scenarios will lead to promise rejection.
   */
  @action
  getUserDetails = () => {
    return new Promise((resolve, reject) => {
      this._isLoading = true;
      const initializationUrl = `${constants.initiateChat}?itineraryId=${storeService.itineraries.selectedItineraryId}`;
      const staycation = isStaycation(
        storeService.itineraries.selectedItinerary,
      );
      apiCall(initializationUrl)
        .then(response => {
          this._isLoading = false;
          if (
            response.status === constants.responseSuccessStatus &&
            !staycation
          ) {
            this._isChatActive = true;
            this._chatDetails = response.data;
            this._initializationError = false;
            this._offlineContact = response.data.offlineContact;
            resolve(response.data);
          } else if (response.status === 'NOT_INITIATED' || staycation) {
            this._isChatActive = false;
            this._initializationError = false; // Chat not initiated but initialization call is success
            this._chatActivationTime = response.data.departureDateMillis;
            this._chatActivationMessage =
              response.data.displayMsg || constants.preTripChatText;
            this._offlineContact = response.data.offlineContact;
            reject();
          } else {
            logError('Chat failed to Initialize', {
              response,
              initializationUrl,
            });
            this._initializationError = true;
            reject();
          }
        })
        .catch(() => {
          this._initializationError = true;
          this._isLoading = false;
          reject();
        });
    });
  };

  /**
   * Set meta data - `restoreId` needed to get the chat history
   * Also sends meta data such as `actorId` for use in Plato to send push notifications
   */
  @action
  setChatMetaInfo = (requestBody, successCallback = () => null) => {
    this._isLoading = true;
    apiCall(`${constants.setChatRestoreId}`, requestBody, 'PUT')
      .then(response => {
        this._isLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._metaDataError = false;
          this._chatDetails = {
            ...this.chatDetails,
            frid: requestBody.restoreId,
          };
          successCallback();
        } else {
          logError('Chat failed to register restore ID', {
            requestBody,
            response,
          });
          this._metaDataError = true;
        }
      })
      .catch(err => {
        logError('Chat failed to register restore ID', {requestBody, err});
        this._metaDataError = true;
        this._isLoading = false;
      });
  };

  @action
  setUnreadMessageCount = count => {
    if (typeof count === 'number') {
      this._unreadMessageCount = count;
    } else {
      logError('Invalid message count', {
        count,
      });
    }
  };
}

export default ChatDetails;
