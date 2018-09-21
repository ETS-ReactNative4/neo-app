import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import CommonHeader from "../../../CommonComponents/CommonHeader/CommonHeader";
import constants from "../../../constants/constants";
import Icon from "../../../CommonComponents/Icon/Icon";
import SimpleButton from "../../../CommonComponents/SimpleButton/SimpleButton";

class PassVoucher extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
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
      )
    };
  };

  render() {
    return (
      <View style={styles.passVoucherContainer}>
        <Text
          style={styles.passInfoText}
        >{`Your Pass is Confirmed.\nWe will be sending this pass to your postal address soon.`}</Text>
        <SimpleButton
          text={"Alright"}
          containerStyle={{ width: 125, height: 40 }}
          action={() => this.props.navigation.goBack()}
          textColor={constants.firstColor}
          hasBorder={true}
          color={"white"}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  leftButtonContainer: {
    height: constants.headerHeight,
    justifyContent: "center",
    paddingHorizontal: 16
  },
  passVoucherContainer: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center"
  },
  passInfoText: {
    ...constants.fontCustom(constants.primaryLight, 15),
    textAlign: "center",
    marginBottom: 16
  }
});

export default PassVoucher;
