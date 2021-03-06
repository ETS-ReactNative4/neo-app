import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewPropTypes
} from "react-native";
import PropTypes from "prop-types";
import InfoPill from "../../../CommonComponents/InfoPill/InfoPill";
import constants from "../../../constants/constants";
import { responsiveWidth } from "react-native-responsive-dimensions";

const TicketMessageSummary = ({
  containerStyle = StyleSheet.create({}),
  subject = "",
  message = "",
  time = "",
  isClosed = false,
  unReadCount = 0,
  action = () => null
}) => {
  return (
    <TouchableOpacity
      onPress={action}
      activeOpacity={0.8}
      style={[
        styles.ticketMessageSummaryContainer,
        unReadCount ? styles.unreadContainer : {},
        containerStyle
      ]}
    >
      <View style={styles.subjectRow}>
        <View style={styles.subjectTextWrapper}>
          <Text style={styles.subjectText}>{subject}</Text>
        </View>
        {/* {unReadCount ? (
          <View style={styles.unReadCountWrapper}>
            <Text style={styles.unReadCountText}>{unReadCount}</Text>
          </View>
        ) : (
          <View />
        )} */}
        {isClosed ? (
          <InfoPill
            info={"Closed"}
            infoColor={constants.shade1dot5}
            infoBackgroundColor={constants.shade5}
          />
        ) : (
          <InfoPill
            info={"Open"}
            infoColor={constants.firstColor}
            infoBackgroundColor={constants.firstColorBackground}
          />
        )}
      </View>
      <View style={styles.messageRow}>
        <Text
          numberOfLines={1}
          ellipsizeMode={"tail"}
          style={styles.messageText}
        >
          {message}
        </Text>
      </View>
      <View style={styles.timeRow}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
};

TicketMessageSummary.propTypes = {
  containerStyle: ViewPropTypes.style,
  subject: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  isClosed: PropTypes.bool,
  unReadCount: PropTypes.number.isRequired,
  action: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  ticketMessageSummaryContainer: {
    backgroundColor: "white",
    paddingHorizontal: 24
  },
  unreadContainer: {
    backgroundColor: constants.firstColorBackground
  },
  subjectRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    justifyContent: "space-between"
  },
  subjectTextWrapper: {
    flex: 1
  },
  subjectText: {
    ...constants.fontCustom(constants.primarySemiBold, 14),
    color: constants.black1,
    width: responsiveWidth(60)
  },
  unReadCountWrapper: {
    backgroundColor: constants.firstColor,
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center"
  },
  unReadCountText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: "white"
  },
  messageRow: {
    marginTop: 8
  },
  messageText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black1,
    width: responsiveWidth(60)
  },
  timeRow: {
    marginTop: 16,
    marginBottom: 16
  },
  timeText: {
    ...constants.fontCustom(constants.primaryLight, 13),
    color: constants.black2
  }
});

export default TicketMessageSummary;
