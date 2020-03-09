import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { CONSTANT_black1 } from "../../../constants/colorPallete";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";

const GCMDepartingFrom = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={styles.searchContainerStyle}
    >
      <Text style={styles.titleStyle}>Departing from</Text>

      {/* Added search box component here starts */}
      <View style={styles.height} />
      {/* Added search box component here ends */}

      <View style={styles.searchListWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.searchList}
        >
          <Text style={styles.searchListText}>Chennai, MAA</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.searchList}
        >
          <Text style={styles.searchListText}>Ahmedhabad, AHM</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {}}
          style={styles.searchList}
        >
          <Text style={styles.searchListText}>Bombay, BOM</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  searchContainerStyle: {
    padding: 24
  },
  titleStyle: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 16),
    marginBottom: 16
  },
  height: {
    height: 40,
    backgroundColor: "#EEF0F2",
    borderRadius: 8
  },

  searchListWrapper: {
    flex: 1
  },
  searchList: {
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingTop: 16,
    paddingBottom: 8,
    paddingLeft: 8
  },
  searchListText: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 16, 24)
  }
});

export default GCMDepartingFrom;
