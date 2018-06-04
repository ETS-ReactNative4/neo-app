import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";

class AppState {
  /**
   * Trip Toggle Button
   */
  @action
  reset = () => {
    this._tripMode = {
      status: false
    };
  };

  @persist("object")
  @observable
  _tripMode = {
    status: false
  };

  @action
  setTripMode = status => {
    this._tripMode.status = status;
  };

  @computed
  get isTripModeOn() {
    return this._tripMode.status;
  }

  /**
   * Itinerary Selection Menu
   */
  @observable _isItinerarySelectionMenuVisible = false;

  @action
  toggleItinerarySelection = status => {
    this._isItinerarySelectionMenuVisible = status;
  };

  @computed
  get isItinerarySelectionMenuVisible() {
    return this._isItinerarySelectionMenuVisible;
  }

  /**
   * Active Scenes in the navigation stack
   */
  @observable _activeScenes = [];

  @action
  setActiveScenes = activeScenes => {
    this._activeScenes = activeScenes;
  };

  @computed
  get activeScenes() {
    return toJS(this._activeScenes);
  }
}

export default AppState;
