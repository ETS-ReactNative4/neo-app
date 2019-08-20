import { observable, computed, action, set, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";
import storeService from "../Services/storeService/storeService";
import { logError } from "../Services/errorLogger/errorLogger";
import _ from "lodash";
import { hydrate } from "./Store";

class SupportStore {
  static hydrator = storeInstance => {
    hydrate("_faqDetails", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_conversations", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_messages", storeInstance)
      .then(() => {})
      .catch(err => {
        logError(err);
      });
    hydrate("_faqData", storeInstance)
      .then(() => null)
      .catch(logError);
  };

  @observable _isLoading = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _faqDetails = {};
  @persist("object")
  @observable
  _conversations = {};
  @persist("object")
  @observable
  _messages = {};
  @persist("object")
  @observable
  _faqData = {};
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
    this._conversations = {};
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

  get faqData() {
    return toJS(this._faqData);
  }

  getFaqDetailsByName = createTransformer(faqSectionName => {
    try {
      for (let key in this.faqData) {
        if (this.faqData.hasOwnProperty(key)) {
          if (this.faqData[key].categoryDisplayStr === faqSectionName) {
            return this.faqData[key];
          }
        }
      }
      return {};
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getFaqDetailsByCategory = createTransformer(faqCategoryName => {
    try {
      for (let key in this.faqData) {
        if (this.faqData.hasOwnProperty(key)) {
          if (this.faqData[key].category === faqCategoryName) {
            return this.faqData[key];
          }
        }
      }
      return {};
    } catch (e) {
      logError(e);
      return {};
    }
  });

  getConversationsByItineraryId = createTransformer(itineraryId => {
    try {
      const conversations = toJS(this._conversations[itineraryId]);
      if (conversations) {
        return conversations;
      } else {
        return [];
      }
    } catch (e) {
      logError(e);
      return [];
    }
  });

  @action
  loadConversation = () => {
    this._isConversationLoading = true;
    const itineraryId = storeService.itineraries.selectedItineraryId;
    apiCall(
      `${constants.retrieveTickets}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        setTimeout(() => {
          this._isConversationLoading = false;
        }, 1000);
        if (response.status === "SUCCESS") {
          this._hasError = false;
          const conversations = toJS(this._conversations);
          conversations[itineraryId] = response.data;
          this._conversations = conversations;
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
          this.loadConversation();
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
        return _.orderBy(messages, "msgId", "desc");
      } else {
        return [];
      }
    } catch (e) {
      logError(e);
      return [];
    }
  });

  getLastMessageByTicket = createTransformer(ticketId => {
    try {
      if (this._messages[ticketId]) {
        return toJS(_.maxBy(this._messages[ticketId], "msgId"));
      } else {
        return {};
      }
    } catch (e) {
      logError(e);
      return {};
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
          this._faqData = response.data;
          const faqData = response.data;
          const faqDetails = {};
          for (let key in faqData) {
            if (faqData.hasOwnProperty(key)) {
              const categoryDisplayStr = faqData[key].categoryDisplayStr;
              faqDetails[categoryDisplayStr] = (
                faqData[key].questions || []
              ).reduce((qaMap, qa) => {
                qaMap[qa.id] = {
                  question: qa.q,
                  answer: qa.a
                };
                return qaMap;
              }, {});
            }
          }
          this._faqDetails = faqDetails;
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._isLoading = false;
        this._hasError = true;
      });
  };
}

export default SupportStore;
