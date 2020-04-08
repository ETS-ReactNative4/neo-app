import React from "react";
import { StyleSheet } from "react-native";
import {
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import { ITestimonialsSection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { ICountryCardData } from "./CountryCardsRow";
import TestimonialCard from "../../../CommonComponents/TestimonialCard/TestimonialCard";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { CONSTANT_exploreFeedCardLimit } from "../../../constants/stringConstants";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { CONSTANT_explore } from "../../../constants/appEvents";

const TestimonialsCardsRow = (props: ITestimonialsSection) => {
  return (
    <HorizontalCardsRow
      apiUrl={props.apiUrl}
      httpMethod={props.httpMethod}
      requestPayload={props.requestPayload}
    >
      {({ data, isLoading }: ICountryCardData) => {
        const action = () =>
          recordEvent(CONSTANT_explore.event, {
            click: CONSTANT_explore.click.travellerTestimonialscard
          });
        return isLoading
          ? null
          : data &&
              data?.testimonials
                .slice(0, CONSTANT_exploreFeedCardLimit)
                .map((testimonial, testimonialIndex) => {
                  return (
                    <TestimonialCard
                      key={testimonialIndex}
                      action={action}
                      date={testimonial.dateOfDeparture}
                      image={{
                        uri: getImgIXUrl({ src: testimonial.profileImage })
                      }}
                      name={testimonial.fName}
                      region={testimonial.region}
                      reviewText={testimonial.review}
                      tripType={testimonial.ttype}
                      containerStyle={styles.testimonialCardStyle}
                    />
                  );
                });
      }}
    </HorizontalCardsRow>
  );
};

const styles = StyleSheet.create({
  testimonialCardStyle: {
    width: responsiveWidth(80),
    marginRight: 16
  }
});

export default TestimonialsCardsRow;
