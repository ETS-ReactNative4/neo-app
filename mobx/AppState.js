import { observable, computed, action } from "mobx";
import { persist } from "mobx-persist";

class AppState {
  @persist("object")
  @observable
  _tripMode = {
    status: false
  };

  @action
  reset = () => {
    this._tripMode = {
      status: false
    };
  };

  @action
  setTripMode = status => {
    this._tripMode.status = status;
  };

  @computed
  get isTripModeOn() {
    return this._tripMode.status;
  }
}

export default AppState;
