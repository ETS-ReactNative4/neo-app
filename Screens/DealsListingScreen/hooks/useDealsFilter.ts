import {
  IRadioSet,
  ICheckBoxSet,
  INumericCheckBoxSet
} from "../../ListingPageScreen/hooks/usePackagesFilter";
import {
  IRadioGroup,
  ICheckBoxGroup,
  INumericCheckBoxGroup
} from "../../ListingPageScreen/Components/FilterActionSheet";
import {
  sort,
  fieldToBeSorted,
  months,
  discounts,
  price
} from "../../ListingPageScreen/filterOptions/filterOptions";
import { useState } from "react";

export interface IDealsPackagesFilter {
  month: INumericCheckBoxSet;
  discounts: ICheckBoxSet;
  price: ICheckBoxSet;
  sort: IRadioSet;
  sortBy: IRadioSet;
}

const useDealsFilter = (): IDealsPackagesFilter => {
  const [sortRadioGroup, setSortRadioGroup] = useState<IRadioGroup>({
    type: "Radio",
    ...sort
  });

  const selectSort = (sortValue: string) => {
    const newInterestsOptions = sortRadioGroup.options.map(item => {
      if (item.value === sortValue) {
        return {
          ...item,
          isSelected: item.isSelected ? item.isSelected : !item.isSelected
        };
      }
      return {
        ...item,
        isSelected: false
      };
    });
    setSortRadioGroup({
      ...sortRadioGroup,
      options: newInterestsOptions
    });
  };

  const resetSort = () =>
    setSortRadioGroup({
      type: "Radio",
      ...sort
    });

  const [sortByRadioGroup, setSortByRadioGroup] = useState<IRadioGroup>({
    type: "Radio",
    ...fieldToBeSorted
  });

  const selectSortBy = (sortByValue: string) => {
    const newInterestsOptions = sortByRadioGroup.options.map(item => {
      if (item.value === sortByValue) {
        return {
          ...item,
          isSelected: item.isSelected ? item.isSelected : !item.isSelected
        };
      }
      return {
        ...item,
        isSelected: false
      };
    });
    setSortByRadioGroup({
      ...sortByRadioGroup,
      options: newInterestsOptions
    });
  };

  const resetSortBy = () =>
    setSortByRadioGroup({
      type: "Radio",
      ...fieldToBeSorted
    });

  const [monthsCheckBoxGroup, setMonthsCheckBoxGroup] = useState<
    INumericCheckBoxGroup
  >({
    type: "Checkbox",
    ...months
  });

  const selectMonths = (monthValue: number) => {
    const newRatingsOptions = monthsCheckBoxGroup.options.map(item => {
      if (item.value === monthValue) {
        return {
          ...item,
          isSelected: !item.isSelected
        };
      }
      return item;
    });
    setMonthsCheckBoxGroup({
      ...monthsCheckBoxGroup,
      options: newRatingsOptions
    });
  };

  const resetMonths = () =>
    setMonthsCheckBoxGroup({
      type: "Checkbox",
      ...months
    });

  const [discountsCheckBoxGroup, setDiscountsCheckBoxGroup] = useState<
    ICheckBoxGroup
  >({
    type: "Checkbox",
    ...discounts
  });

  const selectDiscounts = (discountValue: string) => {
    const newRatingsOptions = discountsCheckBoxGroup.options.map(item => {
      if (item.value === discountValue) {
        return {
          ...item,
          isSelected: !item.isSelected
        };
      }
      return item;
    });
    setDiscountsCheckBoxGroup({
      ...discountsCheckBoxGroup,
      options: newRatingsOptions
    });
  };

  const resetDiscounts = () =>
    setDiscountsCheckBoxGroup({
      type: "Checkbox",
      ...discounts
    });

  const [priceCheckBoxGroup, setPriceCheckBoxGroup] = useState<ICheckBoxGroup>({
    type: "Checkbox",
    ...price
  });

  const selectPrice = (priceValue: string) => {
    const newRatingsOptions = priceCheckBoxGroup.options.map(item => {
      if (item.value === priceValue) {
        return {
          ...item,
          isSelected: !item.isSelected
        };
      }
      return item;
    });
    setPriceCheckBoxGroup({
      ...priceCheckBoxGroup,
      options: newRatingsOptions
    });
  };

  const resetPrice = () =>
    setPriceCheckBoxGroup({
      type: "Checkbox",
      ...price
    });

  return {
    sort: {
      group: sortRadioGroup,
      action: selectSort,
      reset: resetSort
    },
    sortBy: {
      group: sortByRadioGroup,
      action: selectSortBy,
      reset: resetSortBy
    },
    discounts: {
      group: discountsCheckBoxGroup,
      action: selectDiscounts,
      reset: resetDiscounts
    },
    month: {
      group: monthsCheckBoxGroup,
      action: selectMonths,
      reset: resetMonths
    },
    price: {
      group: priceCheckBoxGroup,
      action: selectPrice,
      reset: resetPrice
    }
  };
};

export default useDealsFilter;
