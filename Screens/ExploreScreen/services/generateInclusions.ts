export interface IInclusionList {
  flightsIncluded: boolean;
  hotelsIncluded: boolean;
  hotelStarRating: number;
  activities: string[];
  visaType: string;
  transferIncluded: boolean;
}

export interface IInclusion {
  text: string;
  type: boolean;
}

const generateInclusions = (data: IInclusionList): IInclusion[] => {
  const res: IInclusion[] = [];

  if (data.flightsIncluded) {
    res.push({ text: "Flights included", type: true });
  }

  if (data.hotelsIncluded) {
    res.push({
      text: `${data.hotelStarRating} star accommodations`,
      type: true
    });
  }

  if (data.activities && data.activities.length > 0) {
    res.push({
      text: `${data.activities.length} activities`,
      type: true
    });
  }

  if (data.transferIncluded !== null) {
    res.push({
      text: `${data.transferIncluded ? "Private" : "Shared"} transfer`,
      type: true
    });
  }

  res.push({
    text: data.visaType === "ON_ARRIVAL" ? "Visa on arrival" : "Visa fees",
    type: true
  });

  // Exclusions
  if (!data.flightsIncluded) {
    res.push({ text: "Flights excluded", type: false });
  }

  if (data.transferIncluded === null) {
    res.push({ text: "Transfers excluded", type: false });
  }

  return res;
};

export default generateInclusions;
