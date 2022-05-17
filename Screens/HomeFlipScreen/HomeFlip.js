import React, { Component } from "react";
import { Easing } from "react-native";
import HomeHeader from "../../CommonComponents/HomeHeader/HomeHeader";
import FlipView from "react-native-flip-view-next";
import { inject, observer } from "mobx-react";
import Home from "../HomeScreen/Home";
// import BookingsHome from "../BookingsHomeScreen/BookingsHome";

@inject("appState")
@observer
class HomeFlip extends Component {
  static navigationOptions = HomeHeader;

  _renderFront = () => {
    return <Home />;
  };

  // _renderBack = () => {
  //   return <BookingsHome />;
  // };

  render() {
    const { isTripModeOn } = this.props.appState;
    return (
      <FlipView
        style={{ flex: 1, backgroundColor: "black" }}
        front={this._renderFront()}
        back={this._renderBack()}
        isFlipped={isTripModeOn}
        onFlipped={val => {
          console.log("Flipped: " + val);
        }}
        flipAxis="y"
        flipEasing={Easing.inOut(Easing.ease)}
        flipDuration={500}
        perspective={1000}
      />
    );
  }
}

export default HomeFlip;
