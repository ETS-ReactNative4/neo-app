/**
 * PT TODO: Options to be moved to an API
 */

export interface IFilterOption {
  text: string;
  value: string;
  isSelected: boolean;
}

export interface IFilters {
  title: string;
  options: IFilterOption[];
}

export const destinationsRadio: IFilters = {
  title: "Destination",
  options: []
};

export const interestsRadio: IFilters = {
  title: "Interests",
  options: [
    {
      text: "All interests",
      value: "",
      isSelected: false
    },
    {
      text: "For the Newly weds",
      value: "honeymoon",
      isSelected: false
    },
    {
      text: "Family Specials",
      value: "family",
      isSelected: false
    },
    {
      text: "Beach Lovers",
      value: "beach",
      isSelected: false
    },
    {
      text: "Adrenaline Junkies",
      value: "adventure",
      isSelected: false
    },
    {
      text: "Visa on arrival",
      value: "visa-on-arrival",
      isSelected: false
    }
  ]
};

export const travelDurationCheckBox: IFilters = {
  title: "Travel Duration",
  options: [
    {
      text: "3-5 days",
      value: "3_5",
      isSelected: false
    },
    {
      text: "4-8 days",
      value: "4_8",
      isSelected: false
    },
    {
      text: "9-12 days",
      value: "9_12",
      isSelected: false
    },
    {
      text: "13-16 days",
      value: "13_16",
      isSelected: false
    },
    {
      text: "Above 16 days",
      value: "16_99",
      isSelected: false
    }
  ]
};

export const propertyRatingCheckBox: IFilters = {
  title: "Property Ratings",
  options: [
    {
      text: "3 Star",
      value: "3",
      isSelected: false
    },
    {
      text: "4 Star",
      value: "4",
      isSelected: false
    },
    {
      text: "5 Star",
      value: "5",
      isSelected: false
    }
  ]
};

export const estimatedBudgetCheckBox: IFilters = {
  title: "Estimate Budget",
  options: [
    {
      text: `Below ₹50k`,
      value: "0_50000",
      isSelected: false
    },
    {
      text: `₹50k - ₹75k`,
      value: "50000_75000",
      isSelected: false
    },
    {
      text: `₹75k - ₹1L`,
      value: "75000_100000",
      isSelected: false
    },
    {
      text: `₹1L - ₹1.5L`,
      value: "100000_150000",
      isSelected: false
    },
    {
      text: `₹1.5L - ₹2L`,
      value: "150000_200000",
      isSelected: false
    },
    {
      text: `Above ₹2L`,
      value: "200000_9999999",
      isSelected: false
    }
  ]
};
