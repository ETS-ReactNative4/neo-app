import { observable, computed, action, toJS } from "mobx";
import { persist } from "mobx-persist";

class TripFeed {
  @persist("list")
  @observable
  _tripFeed = [
    {
      type: "",
      title: "City Guides",
      data: [
        {
          name: "",
          deepLink: "",
          image: "",
          url: "",
          backdropColor: "rgba(0,0,0,0.5)"
        }
      ]
    }
  ];

  constructor() {
    this.generateTripFeed();
  }

  @action generateTripFeed = () => {};
}

export default TripFeed;
