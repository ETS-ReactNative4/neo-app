import React, { Component } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import PropTypes from "prop-types";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import constants from "../../../../constants/constants";
import ReminderModal from "./Components/ReminderModal";

class ReminderCard extends Component {
  static propTypes = {
    data: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      content: PropTypes.string,
      action: PropTypes.func,
      modalButton: PropTypes.string
    }).isRequired,
    boxStyle: PropTypes.object,
    titleStyle: PropTypes.object
  };

  state = {
    showModal: false,
    modalData: {}
  };

  cardClicked = i => {
    this.setState({
      showModal: true,
      modalData: { ...this.props.data }
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    const { data, boxStyle = {}, titleStyle = {} } = this.props;
    return (
      <>
        <View style={[styles.box, boxStyle]}>
          <TouchableOpacity onPress={this.cardClicked} style={styles.touchable}>
            {data.image ? (
              <FastImage
                style={styles.imageBackground}
                resizeMode={FastImage.resizeMode.cover}
                source={{ uri: data.image }}
              />
            ) : (
              <View style={{ height: 40 }} />
            )}
            <View style={styles.contentView}>
              <View style={styles.header}>
                <Text style={[styles.boxTitle, titleStyle]} numberOfLines={2}>
                  {data.title}
                </Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.bodyText}>{data.content}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <ReminderModal
          show={this.state.showModal}
          onClose={this.closeModal}
          data={this.state.modalData}
          modalButton={data.modalButton}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    overflow: "hidden",
    borderRadius: 5,
    marginHorizontal: 24,
    marginVertical: 16,
    minHeight: 260,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: constants.shade5,
    ...constants.elevationTwo
  },
  touchable: {
    flex: 1
  },
  imageBackground: {
    flex: 1,
    height: 144
  },
  contentView: {
    flex: 1,
    padding: 16
  },
  header: {},
  body: {
    padding: 0
  },
  bodyText: {
    ...constants.fontCustom(constants.primaryLight, 15, 18),
    color: constants.black1
  },
  boxTitle: {
    marginVertical: 8,
    marginTop: 0,
    ...constants.fontCustom(constants.primaryRegular, 20, 24),
    color: constants.black1
  }
});

export default ReminderCard;
