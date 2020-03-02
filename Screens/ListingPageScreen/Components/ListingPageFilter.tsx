import React, { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  ViewStyle,
  Text,
  ScrollView,
  Alert
} from "react-native";
import {
  CONSTANT_black1,
  CONSTANT_shade1
} from "../../../constants/colorPallete";
import {
  CONSTANT_primarySemiBold,
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular
} from "../../../constants/fonts";
import CustomCheckBox, {
  ISuggestedDetails,
  ICheckBoxData
} from "../../../CommonComponents/CustomCheckBox/CustomCheckBox";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar.js/BottomButtonBar";

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
            <Text style={styles.filterListHeading}>Destination</Text>
            {/* Here added <CustomRadioButton /> Component */}
          </View>

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
                  checkIconSize={15}
                  containerStyle={styles.checkBoxContainerStyle}
                  checkboxStyle={styles.checkboxStyle}
                  checkboxTextStyle={styles.checkboxTextStyle}
                />
              );
            })}
          </View>
        </ScrollView>
      </View>

      <BottomButtonBar
        leftButtonName={"Reset"}
        leftButtonAction={() => Alert.alert("Click Reset")}
        rightButtonName={"Apply"}
        rightButtonAction={() => Alert.alert("Click Apply")}
      />
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

  checkBoxContainerStyle: {
    marginBottom: 20
  },
  checkboxStyle: {
    width: 20,
    height: 20,
    borderWidth: 2
  },
  checkboxTextStyle: {
    color: CONSTANT_shade1,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 18, 23),
    paddingLeft: 10
  }
});

export default ListingPageFilter;
