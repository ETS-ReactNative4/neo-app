import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class EmergencyContacts {
  @observable _isLoading = false;
  @observable _hasError = false;
  @persist("object")
  @observable
  _emergencyContacts = {};

  @action
  reset = () => {
    this._isLoading = false;
    this._hasError = false;
    this._emergencyContacts = {};
  };

  @computed
  get loading() {
    return this._isLoading;
  }

  @computed
  get hasError() {
    return this._hasError;
  }

  getEmergencyContactsByCity = createTransformer(cities =>
    cities.map(city => toJS(this._emergencyContacts[city.cityObject.cityId]))
  );

  @action
  getEmergencyContacts = cities => {
    const unavailableCities = cities.filter(
      city => !this._emergencyContacts[city.cityObject.cityId]
    );
    if (unavailableCities.length)
      this.getEmergencyContactsFromAPI(unavailableCities);
  };

  @action
  getEmergencyContactsFromAPI = cities => {
    this._isLoading = true;
    apiCall(
      constants.getEmergencyContacts,
      cities.map(city => city.cityObject.cityId)
    )
      .then(response => {
        this._isLoading = false;
        if (response.status === "SUCCESS") {
          this._hasError = false;
          for (const cityId in response.data) {
            if (response.data.hasOwnProperty(cityId)) {
              const requiredCity = cities.find(
                city => city.cityObject.cityId === parseInt(cityId)
              );
              response.data[cityId].name = requiredCity.city;
              const emergencyContacts = toJS(this._emergencyContacts);
              emergencyContacts[cityId] = response.data[cityId];
              this._emergencyContacts = emergencyContacts;
            }
          }
          console.log(this._emergencyContacts);
        } else {
          this._hasError = true;
        }
      })
      .catch(err => {
        this._isLoading = false;
        this._hasError = false;
        console.error(err);
      });
  };
}

export default EmergencyContacts;
