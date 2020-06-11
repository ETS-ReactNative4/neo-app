import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import FilterModalHeader from "../../ListingPageScreen/Components/FilterModalHeader";
import BottomButtonBar from "../../../CommonComponents/BottomButtonBar/BottomButtonBar";
import {
  ICheckBoxGroup,
  IRadioGroup,
  INumericCheckBoxGroup
} from "../../ListingPageScreen/Components/FilterActionSheet";
import BlankSpacer from "../../../CommonComponents/BlankSpacer/BlankSpacer";
import RadioBoxWrapper from "../../ListingPageScreen/Components/RadioBoxWrapper";
import CheckBoxWrapper from "../../ListingPageScreen/Components/CheckBoxWrapper";
import { CONSTANT_white } from "../../../constants/colorPallete";

export interface DealsFilterProps {
  closeFilter: () => any;
  resetFilter: () => any;
  applyFilter: () => any;
  discounts: ICheckBoxGroup;
  selectDiscounts: (val: string) => any;
  month: INumericCheckBoxGroup;
  selectMonth: (val: number) => any;
  price: ICheckBoxGroup;
  selectPrice: (val: string) => any;
  sort: IRadioGroup;
  selectSort: (val: string) => any;
  sortBy: IRadioGroup;
  selectSortBy: (val: string) => any;
}

const DealsFilter = ({
  closeFilter,
  resetFilter,
  applyFilter,
  discounts,
  month,
  price,
  sort,
  sortBy,
  selectDiscounts,
  selectMonth,
  selectPrice,
  selectSort,
  selectSortBy
}: DealsFilterProps) => {
  return (
    <SafeAreaView style={styles.dealsFilterContainer}>
      <FilterModalHeader title={"Filters"} closeAction={closeFilter} />
      <ScrollView style={styles.scrollContainer}>
        <BlankSpacer height={24} />
        <RadioBoxWrapper options={sort} action={selectSort} />
        <RadioBoxWrapper options={sortBy} action={selectSortBy} />
        <CheckBoxWrapper options={discounts} action={selectDiscounts} />
        <CheckBoxWrapper options={price} action={selectPrice} />
        <CheckBoxWrapper options={month} action={selectMonth} />
        <BlankSpacer height={88} />
      </ScrollView>
      <BottomButtonBar
        containerStyle={styles.bottomBar}
        leftButtonName={"Reset"}
        leftButtonAction={resetFilter}
        rightButtonName={"Apply"}
        rightButtonAction={applyFilter}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dealsFilterContainer: {
    flex: 1,
    backgroundColor: CONSTANT_white
  },
  scrollContainer: {
    paddingHorizontal: 24
  },
  bottomBar: {
    paddingBottom: 24
  }
});

export default DealsFilter;
