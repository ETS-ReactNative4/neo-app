import { observable, computed, action } from "mobx";
import { persist } from "mobx-persist";

class AppState {
  @persist("object")
  @observable
  _tripMode = {
    status: false
  };

  @computed
  get isTripModeOn() {
    return this._tripMode.status;
  }

  @action
  setTripMode = status => {
    this._tripMode.status = status;
  };
}

export default AppState;
