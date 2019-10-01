import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import Icon from "../../../../../CommonComponents/Icon/Icon";
import constants from "../../../../../constants/constants";

const VisaStageBullets = ({
  containerStyle = StyleSheet.create({}),
  list = []
}) => {
  return (
    <View style={[styles.visaStageBulletsContainer, containerStyle]}>
      {list.map((item, itemIndex) => {
        return (
          <View style={styles.listRow} key={itemIndex}>
            <View style={styles.listInfo}>
              <Text style={[styles.listText, { color: item.color }]}>
                {item.text}
              </Text>
              <View
                style={
                  item.icon
                    ? [styles.iconWrapper, { backgroundColor: item.color }]
                    : {}
                }
              >
                {item.icon ? (
                  <Icon name={item.icon} size={8} color={"white"} />
                ) : null}
              </View>
            </View>
            {item.notes && (item.notes.title || item.notes.text) ? (
              <View style={styles.notesContainer}>
                {item.notes.title ? (
                  <Text style={styles.titleText}>{item.notes.title}</Text>
                ) : null}
                {item.notes.text ? (
                  <Text style={styles.notesText}>{item.notes.text}</Text>
                ) : null}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
};

VisaStageBullets.propTypes = {
  containerStyle: ViewPropTypes.style
};

const styles = StyleSheet.create({
  visaStageBulletsContainer: {
    paddingVertical: 8
  },
  listRow: {},
  listInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 8
  },
  iconWrapper: {
    height: 14,
    width: 14,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center"
  },
  notesContainer: {
    borderTopWidth: 1,
    borderTopColor: constants.shade5,
    marginTop: 16
  },
  titleText: {
    marginTop: 24,
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.shade3
  },
  notesText: {
    marginTop: 8,
    ...constants.fontCustom(constants.primaryRegular, 14, 22),
    color: constants.black1,
    marginBottom: 16
  }
});

export default VisaStageBullets;
