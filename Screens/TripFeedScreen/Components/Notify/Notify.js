import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation
} from "react-native";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import PropTypes from "prop-types";
import Swiper from "react-native-deck-swiper";
import constants from "../../../../constants/constants";
import Icon from "../../../../CommonComponents/Icon/Icon";
import { responsiveWidth } from "react-native-responsive-dimensions";
import NotifyModal from "./Components/NotifyModal";

class Notify extends Component {
  static propTypes = {
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    data: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        message: PropTypes.string.isRequired,
        icon: PropTypes.string,
        action: PropTypes.func,
        actionText: PropTypes.string,
        success: PropTypes.string,
        details: PropTypes.arrayOf(PropTypes.object)
      })
    ).isRequired
  };

  state = {
    isHidden: false,
    currentCard: 0,
    removeWidget: false,
    showModal: false,
    modalData: {}
  };

  cardSwiped = i => {
    this.setState(
      {
        currentCard: i + 1
      },
      () => {
        if (this.state.currentCard === this.props.data.length) {
          this.hideWidget();
        }
      }
    );
  };

  hideWidget = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState(
      {
        isHidden: true
      },
      () => {
        setTimeout(() => {
          LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
          this.setState({
            removeWidget: true
          });
        }, 1000);
      }
    );
  };

  renderCard = (item, index) => {
    item.action = item.action ? item.action : () => {};
    return (
      <View style={styles.cardWrapper}>
        <TouchableOpacity
          onPress={() => this.cardClicked(index)}
          style={{ flexDirection: "row" }}
        >
          <View style={styles.iconWrapper}>
            <Icon
              name={item.icon || constants.helpIcon}
              size={24}
              color={"white"}
            />
          </View>
          <View style={styles.messageWrapper}>
            <View>
              <Text style={styles.messageContent} numberOfLines={2}>
                <Text style={styles.messageTitle}>{item.title}</Text>
                {item.message}
              </Text>
            </View>
            <View style={styles.messageLinkWrapper}>
              {item.success ? (
                <TouchableOpacity style={styles.button1} onPress={() => {}}>
                  <Text style={styles.messageLink}>{item.success}</Text>
                </TouchableOpacity>
              ) : null}
              {item.action ? (
                <TouchableOpacity style={styles.button2} onPress={item.action}>
                  <Text style={styles.messageLink}>{item.actionText}</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  cardClicked = i => {
    console.log(i, d, this.props);
    const d = this.props.data[i];
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({
      showModal: true,
      modalData: { ...d }
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false
    });
  };

  render() {
    if (this.state.removeWidget) return null;
    if (this.state.isHidden)
      return (
        <View style={styles.doneTextWrapper}>
          <Text style={styles.doneText}> All Done! </Text>
        </View>
      );

    const { containerStyle = {}, data } = this.props;

    return (
      <>
        <View style={[styles.cardsContainer, containerStyle]}>
          <Swiper
            ref={swiper => {
              this.swiper = swiper;
            }}
            cardIndex={0}
            backgroundColor={"transparent"}
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            verticalThreshold={20}
            cards={data}
            renderCard={this.renderCard}
            onTapCard={this.cardClicked}
            onSwiped={this.cardSwiped}
            disableTopSwipe={true}
            disableBottomSwipe={true}
            outputRotationRange={["0deg", "0deg", "0deg"]}
          />
        </View>
        <NotifyModal
          show={this.state.showModal}
          data={this.state.modalData}
          onClose={this.closeModal}
        />
      </>
    );
  }
}

const styles = StyleSheet.create({
  cardsContainer: {
    marginVertical: 8,
    marginHorizontal: 24,
    minHeight: 110
  },
  cardWrapper: {
    width: responsiveWidth(100) - 48,
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: constants.seventhColor
  },
  iconWrapper: {
    width: 24,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center"
  },
  messageWrapper: {
    flex: 1,
    marginHorizontal: 8
  },
  messageTitle: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    color: "white",
    paddingRight: 8
  },
  messageContent: {
    color: "white",
    ...constants.fontCustom(constants.primaryRegular, 15, 18)
  },
  messageLinkWrapper: {
    marginTop: 16
  },
  messageLink: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    color: constants.secondColor
  },
  button1: {
    marginRight: 16
  },
  button2: {},
  doneTextWrapper: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8
  },
  doneText: {
    ...constants.fontCustom(constants.primarySemiBold, 15),
    textAlign: "center"
  }
});

export default Notify;
