import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist/lib/index";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class User {
  @persist("object")
  @observable
  _user = {};
  @observable _isLoading = false;
  @observable _hasError = false;

  @action
  reset = () => {
    this._user = {};
    this._isLoading = false;
    this._hasError = false;
  };

  @computed
  get userDetails() {
    return toJS(this._user);
  }

  @action
  getUserDetails = () => {
    this._isLoading = true;
    const requestBody = {};
    apiCall(constants.getUserDetails, requestBody)
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._user = response.data;
        } else {
          this._hasError = true;
        }
      })
      .catch(error => {
        this._isLoading = false;
        this._hasError = true;
      });
  };
}

export default User;
