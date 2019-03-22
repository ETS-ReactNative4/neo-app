import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../constants/constants";
import PDFViewAndroid from "../../CommonComponents/PDFViewAndroid/PDFViewAndroid";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";

@ErrorBoundary()
class PDFViewerAndroid extends Component {
  render() {
    const pdfUri = this.props.navigation.getParam("pdfUri", "");
    return (
      <View style={styles.pdfViewerContainer}>
        <CommonHeader title={"Voucher"} navigation={this.props.navigation} />
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
