import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import { setUserDetails } from "../Services/analytics/analyticsService";
import { setUserContext } from "../Services/errorLogger/errorLogger";
import {
  CONSTANT_getUserDetails,
  CONSTANT_retrieveUserProfile
} from "../constants/apiUrls";
import { IMobileServerResponse } from "../TypeInterfaces/INetworkResponse";
import { CONSTANT_responseSuccessStatus } from "../constants/stringConstants";

export interface IUser {
  ccode?: string;
  mob_num?: string;
  name?: string;
  crisp_token?: string;
  analyticsDisabled?: boolean;
  email?: string;
}

export interface IUserDisplayDetails {
  loggedIn?: boolean;
  userType?: "USER" | "ADMIN";
  email?: string;
  countryPhoneCode?: string;
  mobileNumber?: string;
  name?: string;
  uniqueHash?: string;
  blocked?: boolean;
  cityOfDeparture?: string;
  dateOfBirth?: string;
}

export interface IUserDisplayDataNetworkResponse extends IMobileServerResponse {
  data: IUserDisplayDetails;
}

class User {
  @persist("object")
  @observable
  _userDisplayDetails: IUserDisplayDetails = {};

  @persist("object")
  @observable
  _user: IUser = {};
  @observable _isLoading = false;
  @observable _hasError = false;

  @action
  reset = () => {
    this._userDisplayDetails = {};
    this._user = {};
    this._isLoading = false;
    this._hasError = false;
  };

  @computed
  get userDetails() {
    return toJS(this._user);
  }

  @computed
  get userDisplayDetails() {
    return toJS(this._userDisplayDetails);
  }

  @action
  getUserDisplayDetails = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      apiCall(CONSTANT_retrieveUserProfile, {}, "GET")
        .then((response: IUserDisplayDataNetworkResponse) => {
          if (response.status === CONSTANT_responseSuccessStatus) {
            this._userDisplayDetails = response.data;
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(() => {
          reject();
        });
    });
  };

  @action
  getUserDetails = () => {
    this._isLoading = true;
    const requestBody = {};
    apiCall(CONSTANT_getUserDetails, requestBody)
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          this._user = response.data;
          const { mob_num, name, email } = response.data;
          setUserDetails({
            id: mob_num,
            name,
            email,
            phoneNumber: mob_num
          });
          setUserContext({ email, id: mob_num, name });
        } else {
          this._hasError = true;
        }
      })
      .catch(() => {
        this._isLoading = false;
        this._hasError = true;
      });
  };
}

export default User;
