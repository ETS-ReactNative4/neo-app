import React, { Component } from "react";
import {
  View,
  StyleSheet,
  ViewPropTypes,
  TouchableOpacity,
  BackHandler
} from "react-native";
import PropTypes from "prop-types";
import { responsiveHeight } from "react-native-responsive-dimensions";
import VisaInfoSheet from "../VisaScreen/Components/VisaInfoSheet";
import XSensorPlaceholder from "../../CommonComponents/XSensorPlaceholder/XSensorPlaceholder";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import { inject, observer } from "mobx-react";

@ErrorBoundary()
@inject("visaStore")
@observer
class VisaDocumentsActionSheet extends Component {
  static navigationOptions = {
    header: null,
    gestureResponseDistance: {
      vertical: 1
    }
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.goBack);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.goBack);
  }

  goBack = () => {
    const toggleOverlay = this.props.route.params?.toggleOverlay ?? (() => null);
    toggleOverlay();
    this.props.navigation.goBack();
    return true;
  };

  render() {
    const visaId = this.props.route.params?.visaId ?? "";
    const { getDocumentMustKnowsByVisaId = {} } = this.props.visaStore;
    const { title, body } = getDocumentMustKnowsByVisaId(visaId);
    return (
      <View style={styles.visaDocumentActionSheetContainer}>
        <TouchableOpacity
          onPress={this.goBack}
          activeOpacity={0.8}
          style={styles.blankPlaceholder}
        />
        <VisaInfoSheet action={this.goBack} content={body} title={title} />
        <XSensorPlaceholder containerStyle={styles.sensorPlaceholder} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  visaDocumentActionSheetContainer: {
    backgroundColor: "transparent",
    flex: 1
  },
  blankPlaceholder: {
    flex: 1,
    backgroundColor: "transparent",
    opacity: 0.5
  },
  sensorPlaceholder: {
    backgroundColor: "white"
  }
});

export default VisaDocumentsActionSheet;
