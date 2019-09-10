import React, { Component } from "react";
import { View, StyleSheet, ViewPropTypes } from "react-native";
import PropTypes from "prop-types";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

@ErrorBoundary()
@inject("itineraries")
@inject("visaStore")
@observer
class VisaDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: <CommonHeader title={"Visa Documents"} navigation={navigation} />
    };
  };

  render() {
    const {} = this.props;
    return <View style={styles.visaDetailsContainer}></View>;
  }
}

const styles = StyleSheet.create({
  visaDetailsContainer: {}
});

export default VisaDetails;
