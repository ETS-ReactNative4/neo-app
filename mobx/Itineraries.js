import { observable, computed, action } from "mobx";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Itineraries {
  @persist("list")
  @observable
  _itineraries = [];

  @persist("object")
  @observable
  _selectedItinerary = {};
}

export default Itineraries;
