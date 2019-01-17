import React, { Component, Fragment } from "react";
import { StyleSheet, TouchableHighlight, Platform } from "react-native";
import CommonHeader from "../../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import { isIphoneX } from "react-native-iphone-x-helper";
import ErrorBoundary from "../../../CommonComponents/ErrorBoundary/ErrorBoundary";
import EmptyScreenPlaceholder from "../../../CommonComponents/EmptyScreenPlaceholder/EmptyScreenPlaceholder";

const xHeight = isIphoneX()
  ? constants.xNotchHeight
  : Platform.OS === "ios"
    ? 20
    : 0;

@ErrorBoundary()
class LeisureVoucher extends Component {
  static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: 214 + xHeight
    }
  };

  render() {
    const { navigation } = this.props;
    const city = navigation.getParam("city", {});
    const action = () => {
      navigation.navigate("BookedPlaces", {
        city,
        target: "BookedNearBy"
      });
    };

    return (
      <Fragment>
        <CommonHeader
          LeftButton={
            <TouchableHighlight
              style={styles.leftButtonContainer}
              onPress={() => {
                navigation.goBack();
              }}
              underlayColor={"transparent"}
            >
              <Icon
                name={constants.closeIcon}
                size={24}
                color={constants.shade1}
              />
            </TouchableHighlight>
          }
          title={""}
          navigation={navigation}
        />
        <EmptyScreenPlaceholder
          title={constants.leisureText}
          image={constants.leisureIllus}
          buttonText={constants.explorePlacesText}
          buttonAction={action}
          buttonContainerStyle={{
            width: 140,
            height: 35,
            marginTop: 0
          }}
          buttonTextStyle={{
            fontSize: 15
          }}
        />
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  leftButtonContainer: {
    height: constants.headerHeight,
    justifyContent: "center",
    paddingHorizontal: 16
  }
});

export default LeisureVoucher;
