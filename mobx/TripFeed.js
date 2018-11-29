import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";

class TripFeed {
  @persist("object")
  @observable
  _tripFeed = [];

  constructor() {
    this.generateTripFeed();
  }

  @action generateTripFeed = () => {};
}

export default TripFeed;
