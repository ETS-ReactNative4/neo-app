import React from "react";

import { StyleSheet, View, Text } from "react-native";
import Icon from "../../Icon/Icon";

import {
  CONSTANT_shade1,
  CONSTANT_firstColor
} from "../../../constants/colorPallete";
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import {
  CONSTANT_checkIcon,
  CONSTANT_closeIcon
} from "../../../constants/imageAssets";
import { IInclusion } from "../../../Screens/ExploreScreen/services/generateInclusions";

export interface InclusionListProps {
  inclusionList: IInclusion[];
}

const InclusionList = ({ inclusionList }: InclusionListProps) => {
  return (
    <View style={styles.listWrapper}>
      {inclusionList &&
        inclusionList.map((item, index) => {
          return (
            <View style={styles.listInner} key={index}>
              <View style={styles.checkIconStyle}>
                <Icon
                  name={item.type ? CONSTANT_checkIcon : CONSTANT_closeIcon}
                  size={14}
                  color={item.type ? CONSTANT_firstColor : "red"}
                />
              </View>
              <Text style={styles.listText}>{item.text}</Text>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  listWrapper: {
    marginBottom: 8
  },
  listInner: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8
  },
  checkIconStyle: {
    marginTop: 2
  },
  listText: {
    flex: 1,
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 18),
    marginLeft: 8
  },
  bottomWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 16
  }
});

export default InclusionList;
