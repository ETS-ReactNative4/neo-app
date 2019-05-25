import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import PDFViewAndroid from "../../CommonComponents/PDFViewAndroid/PDFViewAndroid";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import PDFCloseButton from "./Components/PDFCloseButton";
import PDFDownloadButton from "./Components/DownloadButton";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";
import getUrlParams from "../../Services/getUrlParams/getUrlParams";
import _ from "lodash";

@ErrorBoundary()
class PDFViewerAndroid extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const pdfUri = this.props.navigation.getParam("pdfUri", "");
    const { navigation } = this.props;
    const params = getUrlParams(pdfUri);
    const download = () => {
      if (_.isEmpty(params)) {
        openCustomTab(`${pdfUri}?customTab=false`);
      } else {
        openCustomTab(`${pdfUri}&customTab=false`);
      }
    };

    return (
      <View style={styles.pdfViewerContainer}>
        <CommonHeader
          title={"Voucher"}
          LeftButton={<PDFCloseButton action={() => navigation.goBack()} />}
          RightButton={<PDFDownloadButton action={() => download()} />}
          navigation={this.props.navigation}
        />
        {Platform.OS === constants.platformAndroid ? (
          <PDFViewAndroid uri={pdfUri} />
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pdfViewerContainer: {
    flex: 1,
    backgroundColor: "white"
  }
});

export default PDFViewerAndroid;
