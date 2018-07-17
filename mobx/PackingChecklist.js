import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";
import apiCall from "../Services/networkRequests/apiCall";
import _ from "lodash";
import store from "./Store";

class PackingChecklist {
  @observable
  _checkListItems = {
    paperwork: {
      "1": {
        name: "passport",
        deleted: false
      },
      "2": {
        name: "localId",
        deleted: false
      },
      "3": {
        name: "boardingPass",
        deleted: false
      }
    },
    electronics: {
      "1": {
        name: "smartPhone",
        deleted: false
      },
      "2": {
        name: "phoneCharger",
        deleted: false
      }
    }
  };
  @observable _packingCheckList = {};
  @observable _isLoading = false;
  @observable _hasError = false;

  @action
  getPackingChecklist = itinerary_id => {
    const requestBody = {
      itinerary_id
    };
    this._isLoading = true;
    apiCall(constants.getPackingChecklist, requestBody)
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._packingCheckList = response.data.checkListCategoryUser;
        } else {
          this._hasError = true;
        }
      })
      .catch(() => {
        this._isLoading = false;
        this._hasError = true;
      });
  };

  @action
  toggleCheckList = (section, key) => {
    this._packingCheckList[section][key] === 0
      ? (this._packingCheckList[section][key] = 1)
      : (this._packingCheckList[section][key] = 0);
    const requestBody = {
      itineraryId: store.itineraries.selectedItineraryId,
      checked: [],
      removed: [],
      unchecked: [],
      myList: {
        checked: [],
        removed: [],
        unchecked: []
      }
    };
    const checkedObject = {};
    checkedObject[section] = [isNaN(key) ? key : parseInt(key)];
    if (this._packingCheckList[section][key] === 1) {
      requestBody.checked.push(checkedObject);
    } else {
      requestBody.unchecked.push(checkedObject);
    }
    const requestFailed = () => {
      this._packingCheckList[section][key] === 0
        ? (this._packingCheckList[section][key] = 1)
        : (this._packingCheckList[section][key] = 0);
    };
    apiCall(constants.updatePackingChecklist, requestBody)
      .then(response => {
        if (response.status === "SUCCESS") {
          // no action needed
        } else {
          requestFailed();
        }
      })
      .catch(() => {
        requestFailed();
      });
  };

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  @computed
  get checkListItems() {
    if (
      !_.isEmpty(toJS(this._packingCheckList)) &&
      !_.isEmpty(toJS(this._checkListItems))
    ) {
      const sections = Object.keys(this._checkListItems);
      return sections.map((section, sectionIndex) => {
        const details = this._checkListItems[section];
        const status = this._packingCheckList[section];
        return {
          title: section,
          data: Object.keys(details).map((key, keyIndex) => {
            return {
              id: keyIndex,
              item: details[key].name,
              isComplete: !!status[key],
              type: section,
              key
            };
          })
        };
      });
    } else {
      return [
        {
          title: "Your List",
          data: []
        }
      ];
    }
  }
}

export default PackingChecklist;
