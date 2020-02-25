import React from "react";

import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  TouchableOpacity,
  Alert
} from "react-native";
import {
  CONSTANT_white,
  CONSTANT_shade1,
  CONSTANT_shade2,
  CONSTANT_black1,
  CONSTANT_shade4
} from "../../../constants/colorPallete";
import Icon from "../../../CommonComponents/Icon/Icon";
import { CONSTANT_arrowRight } from "../../../constants/imageAssets";
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";

const categoryList = [
  {
    name: "Payment related",
    iconName: "payment-related"
  },
  {
    name: "Visa related",
    iconName: "visa"
  },
  {
    name: "Itinerary changes",
    iconName: "booking"
  },
  {
    name: "Vouchers",
    iconName: "voucher-related"
  },
  {
    name: "App related",
    iconName: "app-related"
  },
  {
    name: "Others",
    iconName: "others"
  }
];

interface CategorySectionProps {
  containerBoxStyle?: ViewStyle;
}

const CategorySection = ({ containerBoxStyle }: CategorySectionProps) => {
  return (
    <View style={styles.test}>
      <Text style={styles.titleStyle}>Categories</Text>
      <View style={[styles.boxContainer, containerBoxStyle]}>
        {categoryList.map((item, itemIndex) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => Alert.alert(`Click -> ${item.name}`)}
              style={styles.boxListStyle}
              key={itemIndex}
            >
              <View style={styles.leftColStyle}>
                <Icon name={item.iconName} size={20} color={CONSTANT_shade2} />
              </View>

              <View
                style={[
                  styles.rightColStyle,
                  itemIndex === categoryList.length - 1 ? styles.noBorder : null
                ]}
              >
                <Text style={styles.boxListTextStyle}>{item.name}</Text>

                <View>
                  <Icon
                    name={CONSTANT_arrowRight}
                    size={16}
                    color={CONSTANT_shade2}
                  />
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 14),
    color: CONSTANT_shade1,
    marginBottom: 8
  },
  boxContainer: {
    backgroundColor: CONSTANT_white,
    borderRadius: 8,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "rgb(0, 0, 0)",
    shadowOpacity: 0.1,
    paddingHorizontal: 16,
    marginBottom: 64
  },
  boxListStyle: {
    flexDirection: "row",
    alignItems: "center"
  },
  leftColStyle: {
    marginTop: -2,
    marginRight: 20
  },
  rightColStyle: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: CONSTANT_shade4
  },
  boxListTextStyle: {
    flex: 1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 14, 17),
    color: CONSTANT_black1
  },
  noBorder: {
    borderBottomWidth: 0
  },

  test: {
    padding: 24
  }
});

export default CategorySection;
