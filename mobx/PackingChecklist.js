import { observable, computed, action, toJS } from "mobx";
import constants from "../constants/constants";
import apiCall from "../Services/networkRequests/apiCall";
import _ from "lodash";
import store from "./Store";

class PackingChecklist {
  @observable _checkListItems = {};
  @observable _packingCheckList = {};
  @observable _yourList = {};
  @observable _isLoading = false;
  @observable _hasError = false;

  @action
  getPackingChecklist = itinerary_id => {
    this.loadChecklistItems();
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
          this._yourList = response.data.myList;
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
  loadChecklistItems = () => {
    this._isLoading = true;
    apiCall(constants.getCheckList, {}, "GET")
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._checkListItems = response.data.categories;
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
    if (section === constants.customCheckListName) {
      this._yourList[key] === 0
        ? (this._yourList[key] = 1)
        : (this._yourList[key] = 0);
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
      if (this._yourList[key] === 1) {
        requestBody.myList.checked.push(key);
      } else {
        requestBody.myList.unchecked.push(key);
      }
      const requestFailed = () => {
        this._yourList[key] === 0
          ? (this._yourList[key] = 1)
          : (this._yourList[key] = 0);
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
    } else {
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
    }
  };

  @action
  addListItem = item => {
    if (this._yourList) {
      const myList = toJS(this._yourList);
      myList[item] = 0;
      this._yourList = myList;
    } else {
      const myList = {};
      myList[item] = 0;
      this._yourList = myList;
    }
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
    requestBody.myList.unchecked.push(item);
    const addFailed = () => {
      delete this._yourList[item];
    };
    apiCall(constants.updatePackingChecklist, requestBody)
      .then(response => {
        if (response.status === "SUCCESS") {
          // no action
        } else {
          addFailed();
        }
      })
      .catch(error => {
        addFailed();
      });
  };

  @action
  deleteListItem = item => {
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
    requestBody.myList.removed.push(item);
    const itemStatus = this._yourList[item];
    const newList = toJS(this._yourList);
    delete newList[item];
    this._yourList = newList;
    const deleteFailed = () => {
      this._yourList[item] = itemStatus;
    };
    apiCall(constants.updatePackingChecklist, requestBody)
      .then(response => {
        if (response.status === "SUCCESS") {
          // no action
        } else {
          deleteFailed();
        }
      })
      .catch(error => {
        deleteFailed();
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
      const checkList = sections.map((section, sectionIndex) => {
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

      const myList = !this._yourList
        ? []
        : Object.keys(this._yourList).map((item, itemIndex) => {
            return {
              id: itemIndex,
              item,
              isComplete: !!this._yourList[item],
              type: constants.customCheckListName,
              key: item
            };
          });
      myList.push({
        id: myList.length,
        type: "user-input",
        item: "Input Field",
        isComplete: false,
        key: `${myList.length}`
      });

      checkList.push({
        title: constants.customCheckListName,
        data: myList
      });
      return checkList;
    } else {
      return [
        {
          title: constants.customCheckListName,
          data: []
        }
      ];
    }
  }
}

export default PackingChecklist;
