import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Packages {
  @persist("object")
  @observable
  _packages = {};

  reset = () => {
    this._packages = {};
  };

  @observable _isLoading = false;

  @observable _hasError = false;

  @computed
  get packages() {
    return toJS(this._packages);
  }

  @computed
  get isLoading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  /**
   * Uses Product API to fetch the packages that are being displayed in product homepage
   */
  @action
  getPackages = () => {
    this._isLoading = true;
    const requestBody = {
      limit: 6,
      tags: [
        "visa-on-arrival-packages",
        "family-packages",
        "honeymoon-packages",
        "adventure-packages",
        "beach-packages"
      ]
    };
    apiCall(
      `${constants.getPackagesListFromProduct}`,
      requestBody,
      "POST",
      constants.productUrl
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._packages = response.data;
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

export default Packages;
