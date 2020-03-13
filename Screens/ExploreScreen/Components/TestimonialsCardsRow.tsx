import React from "react";
import { ITestimonialsSection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { ICountryCardData } from "./CountryCardsRow";
import TestimonialCard from "../../../CommonComponents/TestimonialCard/TestimonialCard";

const TestimonialsCardsRow = (props: ITestimonialsSection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading }: ICountryCardData) => {
        return isLoading
          ? null
          : data &&
              data?.testimonials.map((testimonial, testimonialIndex) => {
                return (
                  <TestimonialCard
                    key={testimonialIndex}
                    action={() => null}
                    date={testimonial.dateOfDeparture}
                    image={{ uri: testimonial.profileImage }}
                    name={testimonial.fName}
                    region={testimonial.region}
                    reviewText={testimonial.review}
                    tripType={testimonial.ttype}
                  />
                );
              });
      }}
    </HorizontalCardsRow>
  );
};

export default TestimonialsCardsRow;
