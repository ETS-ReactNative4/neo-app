import { observable, computed, action, toJS } from "mobx";
import { createTransformer } from "mobx-utils";
import { persist } from "mobx-persist";
import apiCall from "../Services/networkRequests/apiCall";
import constants from "../constants/constants";

class Places {
  @observable _selectedCity = "";
  @observable _availableCities = [];
}

export default Places;
