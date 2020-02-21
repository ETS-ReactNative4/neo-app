import React, { useState, useEffect } from "react";

import { StyleSheet, View, ViewStyle, Text, ScrollView } from "react-native";
import {
  CONSTANT_shade6,
  CONSTANT_white,
  CONSTANT_firstColor,
  CONSTANT_black1,
  CONSTANT_shade1
} from "../../../constants/colorPallete";
import PrimaryButton from "../../../CommonComponents/PrimaryButton/PrimaryButton";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import CustomCheckBox, {
  ISuggestedDetails,
  ICheckBoxData
} from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";

interface ListingPageFilterProps {
  containerStyle?: ViewStyle;
  filterCheckboxData: ICheckBoxData[];
}

const ListingPageFilter = ({
  containerStyle,
  filterCheckboxData
}: ListingPageFilterProps) => {
  const [filterDetails, setFilterDetails] = useState<ISuggestedDetails[]>([]);

  useEffect(() => {
    setFilterDetails(
      filterCheckboxData.map((checkboxData, checkboxDataIndex) => {
        return {
          index: checkboxDataIndex,
          text: checkboxData.text,
          isChecked: false
        };
      })
    );
  }, [filterCheckboxData]);

  const selectFilterCheckBoxDetails = (dataIndex: number) => {
    const filterList = [...filterDetails];
    filterList[dataIndex].isChecked = !filterList[dataIndex].isChecked;
    setFilterDetails(filterList);
  };

  return (
    <View style={[styles.listingFilterContainer, containerStyle]}>
      <View style={styles.listingFilterContent}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.fiterList}>
            <Text style={styles.filterListHeading}>Interests</Text>

            {filterDetails.map((dataObj, index) => {
              const onSelect = () => {
                selectFilterCheckBoxDetails(dataObj.index);
              };

              return (
                <CustomCheckBox
                  key={index}
                  isChecked={dataObj.isChecked}
                  action={onSelect}
                  text={dataObj.text}
                  checkboxStyle={styles.checkboxStyle}
                  checkboxTextStyle={styles.checkboxTextStyle}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      <View style={styles.filterActionWrapper}>
        <PrimaryButton
          text={"Reset"}
          containerStyle={[styles.filterAction, styles.resetBtnAction]}
          buttonStyle={[styles.buttonStyle, styles.resetButtonStyle]}
          buttonTextStyle={styles.resetButtonTextStyle}
        />
        <PrimaryButton
          text={"Apply"}
          containerStyle={[styles.filterAction, styles.applyBtnAction]}
          buttonStyle={styles.buttonStyle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listingFilterContainer: {
    flex: 1
  },

  listingFilterContent: {
    flex: 1
  },

  fiterList: {
    marginBottom: 32
  },

  filterListHeading: {
    color: CONSTANT_black1,
    ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18, 23),
    marginBottom: 12
  },
  checkboxStyle: {
    borderWidth: 2
  },
  checkboxTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18, 23),
    paddingLeft: 10
  },

  filterActionWrapper: {
    flexDirection: "row",
    backgroundColor: CONSTANT_shade6,
    paddingHorizontal: 24,
    paddingVertical: 16
  },
  filterAction: {
    flex: 1
  },
  resetBtnAction: {
    marginRight: 4
  },
  applyBtnAction: {
    marginLeft: 4
  },
  buttonStyle: {
    height: 44,
    borderRadius: 8
  },
  resetButtonStyle: {
    backgroundColor: CONSTANT_white,
    borderColor: CONSTANT_firstColor,
    borderWidth: 2
  },
  resetButtonTextStyle: {
    color: CONSTANT_firstColor
  }
});

export default ListingPageFilter;
