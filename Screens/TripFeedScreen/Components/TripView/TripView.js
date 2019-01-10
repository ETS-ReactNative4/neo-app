import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import Carousel from "../../../../CommonComponents/Carousel/Carousel";
import PropTypes from "prop-types";
import constants from "../../../../constants/constants";
import CircleIcon from "./Components/CircleIcon";
import Box from "../../../../CommonComponents/Box/Box";
import { recordEvent } from "../../../../Services/analytics/analyticsService";
import WidgetTitle from "../WidgetTitle/WidgetTitle";
import resolveLinks from "../../../../Services/resolveLinks/resolveLinks";
import forbidExtraProps from "../../../../Services/PropTypeValidation/forbidExtraProps";
import _ from "lodash";
import storeService from "../../../../Services/storeService/storeService";
import { toastBottom } from "../../../../Services/toast/toast";

class TripView extends Component {
  static propTypes = forbidExtraProps({
    containerStyle: PropTypes.object,
    title: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        cityName: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
        period: PropTypes.string.isRequired,
        image: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
          .isRequired,
        costingId: PropTypes.string,
        costingIdentifier: PropTypes.string,
        date: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired
      }).isRequired
    )
  });

  state = {
    isScrollRecorded: false
  };

  scrollAction = () => {
    if (!this.state.isScrollRecorded) {
      recordEvent(constants.tripViewScroll);
      this.setState({
        isScrollRecorded: true
      });
    }
  };

  render() {
    const { data = [], containerStyle = {}, title } = this.props;
    const onScrollProps = {},
      boxSize = 136,
      circleSize = 32;
    if (!this.state.isScrollRecorded) {
      onScrollProps["onScrollAction"] = () => this.scrollAction();
    }
    return (
      <View style={[styles.listWrapper, containerStyle]}>
        {title ? (
          <WidgetTitle
            containerStyle={{ marginHorizontal: 24 }}
            title={title}
          />
        ) : null}
        <Carousel
          {...onScrollProps}
          firstMargin={24}
          containerStyle={{
            height: boxSize + 8
          }}
        >
          {data.map((item, itemIndex) => {
            const rotate = item.icon === "FLIGHT" ? "90deg" : "0deg";
            const action = () =>
              resolveLinks(item.link, {
                selectedDate: JSON.stringify(item.date)
              });
            const circleAction = () => {
              const transfer = storeService.itineraries.getTransferFromAllById(
                item.costingIdentifier || item.costingId
              );
              /**
               * TODO: Causes unnecessary error logs for activity with transfers
               */
              if (transfer && !_.isEmpty(transfer)) {
                if (transfer.voucher.booked) {
                  if (icon === "flight")
                    resolveLinks("FlightVoucher", { flight: transfer });
                  else resolveLinks("TransferVoucher", { transfer });
                } else {
                  toastBottom(constants.bookingProcessText.message);
                }
              } else {
                const activity = storeService.itineraries.getActivityById(
                  item.costingId
                );
                if (
                  activity &&
                  (activity.voucher.booked || activity.free) &&
                  !_.isEmpty(activity)
                )
                  resolveLinks("ActivityVoucher", { activity });
                else toastBottom(constants.bookingProcessText.message);
              }
            };
            return (
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  marginLeft: itemIndex ? -20 : 0
                }}
                key={itemIndex}
              >
                {itemIndex ? (
                  <CircleIcon
                    icon={item.icon}
                    color={constants.black1}
                    circleSize={circleSize}
                    rotate={rotate}
                    action={circleAction}
                    containerStyle={{
                      top: boxSize / 2 - circleSize / 2,
                      zIndex: 10,
                      marginHorizontal: 0,
                      marginRight: -12,
                      ...constants.elevationTwo,
                      shadowColor: constants.black2
                    }}
                  />
                ) : null}
                <Box
                  size={boxSize}
                  data={{
                    title: item.cityName,
                    helpText: item.period,
                    image: item.image,
                    action
                  }}
                  gradientColor={constants.darkGradientAlpha}
                />
              </View>
            );
          })}
        </Carousel>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listWrapper: {
    marginVertical: 8
  }
});

export default TripView;
