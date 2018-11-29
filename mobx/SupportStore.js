import { observable, computed, action, set, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";
import _ from "lodash";

class SupportStore {
  @observable _isLoading = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _faqDetails = {};
  @persist("object")
  @observable
  _conversations = [];
  @persist("object")
  @observable
  _messages = {};
  @observable _isConversationLoading = false;
  @observable _isMessagesLoading = false;

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._isConversationLoading = false;
    this._isMessagesLoading = false;
    this._faqDetails = {};
    this._messages = {};
    this._conversations = [];
  };

  @computed
  get faqDetails() {
    return toJS(this._faqDetails);
  }

  @computed
  get isConversationLoading() {
    return this._isConversationLoading;
  }

  @computed
  get isMessagesLoading() {
    return this._isMessagesLoading;
  }

  @computed
  get conversations() {
    return toJS(this._conversations);
  }

  @action
  loadConversation = () => {
    this._isConversationLoading = true;
    apiCall(constants.retrieveTickets, {}, "GET")
      .then(response => {
        setTimeout(() => {
          this._isConversationLoading = false;
        }, 1000);
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._conversations = response.data;
        } else {
          this._hasError = true;
        }
      })
      .catch(error => {
        this._isConversationLoading = false;
        this._hasError = true;
      });
  };

  @action
  loadTickets = ticketId => {
    this._isMessagesLoading = true;
    apiCall(
      `${constants.retrieveTicketMessages}?ticketId=${ticketId}&from=-1&to=-1`,
      {},
      "GET"
    )
      .then(response => {
        setTimeout(() => {
          this._isMessagesLoading = false;
        }, 1000);
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const messages = toJS(this._messages);
          messages[ticketId] = response.data;
          this._messages = messages;
        } else {
          this._hasError = true;
        }
      })
      .catch(error => {
        this._isMessagesLoading = false;
        this._hasError = true;
      });
  };

  @action
  addMessageToConversation = (ticketId, messageObject) => {
    const messages = toJS(this._messages);
    messages[ticketId].push(messageObject);
    this._messages = messages;
  };

  getMessagesByTicket = createTransformer(ticketId => {
    try {
      if (this._messages[ticketId]) {
        const messages = toJS(this._messages[ticketId]);
        return _.orderBy(messages, "msgTime", "desc");
      } else {
        return [];
      }
    } catch (e) {
      logError(e);
      return [];
    }
  });

  getFaqByType = createTransformer(faqSection => {
    try {
      const faqObject = toJS(this._faqDetails[faqSection]);
      return Object.values(faqObject);
    } catch (e) {
      logError(e);
      return [];
    }
  });

  @action
  loadFaqDetails = () => {
    this._isLoading = true;
    apiCall(constants.getFaq, {}, "GET")
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._faqDetails = response.data.faqs;
        } else {
          storeService.infoStore.setError(
            "Unable to Load FAQ!",
            "Please try again after sometime..."
          );
          this._hasError = true;
        }
      })
      .catch(err => {
        storeService.infoStore.setError(
          "Unable to Load FAQ!",
          "Please try again after sometime..."
        );
        this._isLoading = false;
        this._hasError = true;
      });
  };
}

export default SupportStore;
