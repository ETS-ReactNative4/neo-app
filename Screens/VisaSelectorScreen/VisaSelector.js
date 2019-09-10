import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react/custom";

@ErrorBoundary()
@inject("itineraries")
@inject("visaStore")
@observer
class VisaSelector extends Component {
  render() {
    return <View style={styles.visaSelectorContainer}></View>;
  }
}

const styles = StyleSheet.create({
  visaSelectorContainer: {}
});

export default VisaSelector;
