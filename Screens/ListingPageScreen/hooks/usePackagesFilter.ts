import { useState } from "react";
import {
  IRadioGroup,
  ICheckBoxGroup,
  INumericCheckBoxGroup
} from "../Components/FilterActionSheet";
import {
  interestsRadio,
  travelDurationCheckBox,
  propertyRatingCheckBox,
  estimatedBudgetCheckBox
} from "../filterOptions/filterOptions";

export interface IRadioSet {
  group: IRadioGroup;
  action: (val: string) => any;
  reset: () => any;
}

export interface ICheckBoxSet {
  group: ICheckBoxGroup;
  action: (val: string) => any;
  reset: () => any;
}

export interface INumericCheckBoxSet {
  group: INumericCheckBoxGroup;
  action: (val: number) => any;
  reset: () => any;
}

export interface IPackagesFilter {
  interests: IRadioSet;
  travelDuration: ICheckBoxSet;
  propertyRatings: ICheckBoxSet;
  estimatedBudget: ICheckBoxSet;
}

const usePackagesFilter = (): IPackagesFilter => {
  const [interestsRadioGroup, setInterestsRadioGroup] = useState<IRadioGroup>({
    type: "Radio",
    ...interestsRadio
  });

  const selectInterest = (interestValue: string) => {
    const newInterestsOptions = interestsRadioGroup.options.map(item => {
      if (item.value === interestValue) {
        return {
          ...item,
          isSelected: !item.isSelected
        };
      }
      return {
        ...item,
        isSelected: false
      };
    });
    setInterestsRadioGroup({
      ...interestsRadioGroup,
      options: newInterestsOptions
    });
  };

  const resetInterest = () =>
    setInterestsRadioGroup({
      type: "Radio",
      ...interestsRadio
    });

  const [
    travelDurationCheckBoxGroup,
    setTravelDurationCheckBoxGroup
  ] = useState<ICheckBoxGroup>({
    type: "Checkbox",
    ...travelDurationCheckBox
  });

  const selectTravelDuration = (durationValue: string) => {
    const newDurationsOptions = travelDurationCheckBoxGroup.options.map(
      item => {
        if (item.value === durationValue) {
          return {
            ...item,
            isSelected: !item.isSelected
          };
        }
        return item;
      }
    );
    setTravelDurationCheckBoxGroup({
      ...travelDurationCheckBoxGroup,
      options: newDurationsOptions
    });
  };

  const resetDuration = () =>
    setTravelDurationCheckBoxGroup({
      type: "Checkbox",
      ...travelDurationCheckBox
    });

  const [ratingsCheckBoxGroup, setRatingsCheckBoxGroup] = useState<
    ICheckBoxGroup
  >({
    type: "Checkbox",
    ...propertyRatingCheckBox
  });

  const selectRatings = (ratingValue: string) => {
    const newRatingsOptions = ratingsCheckBoxGroup.options.map(item => {
      if (item.value === ratingValue) {
        return {
          ...item,
          isSelected: !item.isSelected
        };
      }
      return item;
    });
    setRatingsCheckBoxGroup({
      ...ratingsCheckBoxGroup,
      options: newRatingsOptions
    });
  };

  const resetRatings = () =>
    setRatingsCheckBoxGroup({
      type: "Checkbox",
      ...propertyRatingCheckBox
    });

  const [
    estimatedBudgetCheckBoxGroup,
    setEstimatedBudgetCheckBoxGroup
  ] = useState<ICheckBoxGroup>({
    type: "Checkbox",
    ...estimatedBudgetCheckBox
  });

  const selectEstimatedBudget = (budgetValue: string) => {
    const newInterestsOptions = estimatedBudgetCheckBoxGroup.options.map(
      item => {
        if (item.value === budgetValue) {
          return {
            ...item,
            isSelected: !item.isSelected
          };
        }
        return item;
      }
    );
    setEstimatedBudgetCheckBoxGroup({
      ...estimatedBudgetCheckBoxGroup,
      options: newInterestsOptions
    });
  };

  const resetBudgets = () => {
    setEstimatedBudgetCheckBoxGroup({
      type: "Checkbox",
      ...estimatedBudgetCheckBox
    });
  };

  return {
    interests: {
      group: interestsRadioGroup,
      action: selectInterest,
      reset: resetInterest
    },
    travelDuration: {
      group: travelDurationCheckBoxGroup,
      action: selectTravelDuration,
      reset: resetDuration
    },
    propertyRatings: {
      group: ratingsCheckBoxGroup,
      action: selectRatings,
      reset: resetRatings
    },
    estimatedBudget: {
      group: estimatedBudgetCheckBoxGroup,
      action: selectEstimatedBudget,
      reset: resetBudgets
    }
  };
};

export default usePackagesFilter;
