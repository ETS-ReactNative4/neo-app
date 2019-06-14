import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";
import { hydrate } from "./Store";
import { persist } from "mobx-persist";
import { logError } from "../Services/errorLogger/errorLogger";
import apiCall from "../Services/networkRequests/apiCall";
import storeService from "../Services/storeService/storeService";
import _ from "lodash";

const journalLevels = {
  page: "PAGE",
  story: "STORY",
  journal: "JOURNAL"
};

class Journal {
  static hydrator = storeInstance => {
    hydrate("_homeScreenDetails", storeInstance)
      .then(() => null)
      .catch(err => logError(err));
    hydrate("_journalDetails", storeInstance)
      .then(() => null)
      .catch(err => logError(err));
  };

  /**
   * Journal Home Screen API
   * --------------------------------------------------------------
   */

  @persist("object")
  @observable
  _homeScreenDetails = {};

  @observable _isHomeScreenLoading = false;

  @observable _homeScreenError = false;

  @computed
  get homeScreenDetails() {
    return toJS(this._homeScreenDetails);
  }

  @computed
  get isHomeScreenLoading() {
    return this._isHomeScreenLoading;
  }

  @computed
  get homeScreenError() {
    return this._homeScreenError;
  }

  /**
   *
   */
  @action
  getHomeScreenDetails = () => {
    const itineraryId = storeService.itineraries.selectedItineraryId;
    this._isHomeScreenLoading = true;
    apiCall(
      `${constants.getJournalScreenDetails}?itineraryId=${itineraryId}`,
      {},
      "GET"
    )
      .then(response => {
        this._isHomeScreenLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._homeScreenDetails = response.data;
          this._homeScreenError = false;
        } else {
          this._homeScreenError = true;
        }
      })
      .catch(() => {
        this._isHomeScreenLoading = false;
        this._homeScreenError = true;
      });
  };

  /**
   * Journal Start - Initialization API
   * --------------------------------------------------------------
   */
  @persist("object")
  @observable
  _journalDetails = {};

  @action refreshJournalDetails = () => {};

  @observable _isJournalDetailsLoading = false;

  @observable _journalDetailsError = false;

  @computed
  get journalId() {
    if (_.isEmpty(this.journalDetails)) {
      return "";
    }
    return this.journalDetails.journalId;
  }

  @computed
  get journalDetails() {
    return toJS(this._journalDetails);
  }

  @computed
  get journalStartData() {
    if (_.isEmpty(this.journalDetails)) {
      return {};
    }
    return {
      title: this._journalDetails.sugTitle,
      titleLength: this._journalDetails.sugTitleLength,
      desc: this._journalDetails.sugDesc,
      descLength: this._journalDetails.sugDescLength
    };
  }

  @computed
  get isJournalDetailsLoading() {
    return this._isJournalDetailsLoading;
  }

  @computed
  get journalDetailsError() {
    return this._journalDetailsError;
  }

  @action
  initializeJournalDetails = () => {
    this._isJournalDetailsLoading = true;
    const itineraryId = storeService.itineraries.selectedItineraryId;
    apiCall(`${constants.initializeJournal}?itineraryId=${itineraryId}`)
      .then(response => {
        this._isJournalDetailsLoading = false;
        if (response.status === constants.responseSuccessStatus) {
          this._journalDetailsError = false;
          this._journalDetails = response.data;
        } else {
          this._journalDetailsError = true;
        }
      })
      .catch(() => {
        this._isJournalDetailsLoading = false;
        this._journalDetailsError = true;
      });
  };

  @action
  updateJournalTitle = ({ title, desc }, callback = () => null) => {
    const journalId = this.journalId;
    const itineraryId = storeService.itineraries.selectedItineraryId;
    const requestObject = {
      data: [
        {
          key: "sugTitle",
          value: title
        },
        {
          key: "sugDesc",
          value: desc
        }
      ],
      id: journalId,
      itineraryId,
      type: journalLevels.journal
    };
    apiCall(constants.st);
  };

  /**
   *
   */
}

export default Journal;
