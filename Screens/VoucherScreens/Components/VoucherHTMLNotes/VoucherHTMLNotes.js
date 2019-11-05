import React from "react";
import { View, StyleSheet, ViewPropTypes, Text } from "react-native";
import PropTypes from "prop-types";
import CustomHtmlView from "../../../../CommonComponents/CustomHtmlView/CustomHtmlView";
import containsHtml from "../../../../Services/containsHtml/containsHtml";
import Icon from "../../../../CommonComponents/Icon/Icon";
import constants from "../../../../constants/constants";
import HTMLView from "react-native-htmlview";

/**
 * Custom HTML element rendering for htmlview
 * Reference - https://github.com/jsdf/react-native-htmlview#custom-element-rendering
 */
function renderNode(node, index, siblings, parent, defaultRenderer) {
  // if (node.name === "ol" || node.name === "ul") {
  //   return <View key={index}>{defaultRenderer(node.children, parent)}</View>;
  // }
  if (node.name === "ol" || node.name === "ul") {
    return (
      <View key={index} style={styles.listItemRow}>
        <View style={styles.iconContainer}>
          <Icon
            name={constants.infoIcon}
            size={15}
            color={constants.secondColor}
          />
        </View>
        <View>
          <Text style={styles.listItemText}>{"Some Text Goes here"}</Text>
        </View>
      </View>
    );
  }
}

const VoucherHTMLNotes = ({
  containerStyle = StyleSheet.create({}),
  data = ""
}) => {
  if (!data) {
    return null;
  }
  if (!containsHtml(data)) {
    data = `<div>${data}</div>`;
  }
  data = data.replace(/(\r\n|\n|\r)/gm, "");
  return (
    <View style={[styles.voucherHtmlNotes, containerStyle]}>
      <HTMLView value={data} renderNode={renderNode} />
    </View>
  );
};

VoucherHTMLNotes.propTypes = {
  containerStyle: ViewPropTypes.style,
  data: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  voucherHtmlNotes: {
    flex: 1,
    marginTop: 48,
    backgroundColor: "silver"
  },
  listItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start"
  },
  iconContainer: {
    marginTop: 4
  },
  listItemText: {
    marginLeft: 4,
    ...constants.fontCustom(constants.primaryRegular, 14, 22),
    color: constants.black1
  }
});

export default VoucherHTMLNotes;
