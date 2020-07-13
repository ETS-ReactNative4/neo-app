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

export interface INumericFilterOption {
  text: string;
  value: number;
  isSelected: boolean;
}

export interface INumericFilters {
  title: string;
  options: INumericFilterOption[];
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

// Based on - https://stackoverflow.com/a/10833631

const now = new Date();
let month = now.getMonth();
let year = now.getFullYear();

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const upcomingMonthOptions: INumericFilterOption[] = [];

for (let i = 0; i < 13; i++) {
  upcomingMonthOptions.push({
    text: monthNames[month] + " " + year,
    value: month + 1,
    isSelected: false
  });
  if (++month === 12) {
    month = 0;
    ++year;
  }
}

export const months: INumericFilters = {
  title: "Month",
  options: upcomingMonthOptions
};

export const discounts: IFilters = {
  title: "Discounts",
  options: [
    {
      text: "0 to 10%",
      value: "0_10",
      isSelected: false
    },
    {
      text: "11 to 20%",
      value: "11_20",
      isSelected: false
    },
    {
      text: "21 to 30%",
      value: "21_30",
      isSelected: false
    },
    {
      text: "31 to 40%",
      value: "31_40",
      isSelected: false
    },
    {
      text: "41 to 50%",
      value: "41_50",
      isSelected: false
    },
    {
      text: "above 50%",
      value: "51_100",
      isSelected: false
    }
  ]
};

export const price: IFilters = {
  title: "Price",
  options: [
    {
      text: "₹0 - ₹5k",
      value: "0_5000",
      isSelected: false
    },
    {
      text: "₹5k - ₹10k",
      value: "5000_10000",
      isSelected: false
    },
    {
      text: "₹10k - ₹15k",
      value: "10000_15000",
      isSelected: false
    },
    {
      text: "₹15k - ₹20k",
      value: "15000_20000",
      isSelected: false
    },
    {
      text: "₹20k - ₹30k",
      value: "20000_30000",
      isSelected: false
    },
    {
      text: "above ₹30k",
      value: "30000_9999999",
      isSelected: false
    }
  ]
};

export const sort: IFilters = {
  title: "Sort",
  options: [
    {
      text: "Low to High",
      value: "ASC",
      isSelected: false
    },
    {
      text: "High to Low",
      value: "DESC",
      isSelected: true
    }
  ]
};

export const fieldToBeSorted: IFilters = {
  title: "Sort By",
  options: [
    {
      text: "Discount",
      value: "dealDiscountPercentage",
      isSelected: true
    },
    {
      text: "Price",
      value: "cost",
      isSelected: false
    }
  ]
};

export const indianCities: IFilters = {
  title: "Departure City",
  options: [
    {
      text: "Chennai",
      value: "chennai",
      isSelected: false
    },
    {
      text: "Delhi",
      value: "delhi",
      isSelected: false
    },
    {
      text: "Bangalore",
      value: "bangalore",
      isSelected: false
    },
    {
      text: "Pune",
      value: "pune",
      isSelected: false
    },
    {
      text: "Mumbai",
      value: "mumbai",
      isSelected: false
    },
    {
      text: "Kolkata",
      value: "kolkata",
      isSelected: false
    },
    {
      text: "Hyderabad",
      value: "hyderabad",
      isSelected: false
    }
  ]
};
