import React from "react";
import {
  responsiveHeight
  // @ts-ignore
} from "react-native-responsive-dimensions";

import ActionSheet from "../../../CommonComponents/ActionSheet/ActionSheet";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_callStartIcon } from "../../../constants/imageAssets";
import {
  CONSTANT_shade4,
  CONSTANT_black1,
  CONSTANT_shade5
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold
} from "../../../constants/fonts";

const NotificationsActionSheet = () => {
  return (
    <ActionSheet panelStartingPosition={responsiveHeight(20)}>
      <View style={styles.actionSheetContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.actionSheetList}
        >
          <View>
            <Icon
              name={CONSTANT_callStartIcon}
              size={24}
              color={CONSTANT_shade4}
            />
          </View>
          <Text style={styles.textStyle}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.actionSheetList}
        >
          <View>
            <Icon
              name={CONSTANT_callStartIcon}
              size={24}
              color={CONSTANT_shade4}
            />
          </View>
          <Text style={styles.textStyle}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.actionSheetList}
        >
          <View>
            <Icon
              name={CONSTANT_callStartIcon}
              size={24}
              color={CONSTANT_shade4}
            />
          </View>
          <Text style={styles.textStyle}>View details</Text>
        </TouchableOpacity>
      </View>
    </ActionSheet>
  );
};

const styles = StyleSheet.create({
  actionSheetContainer: {
    flex: 1,
    padding: 16
  },
  actionSheetList: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade5
  },
  textStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 15, 19),
    color: CONSTANT_black1,
    paddingLeft: 8
  }
});

export default NotificationsActionSheet;
