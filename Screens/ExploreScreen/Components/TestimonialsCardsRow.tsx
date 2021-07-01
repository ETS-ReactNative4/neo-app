import React from "react";
import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { ITestimonialsSection } from "../ExploreFeedType";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { ICountryCardData } from "./CountryCardsRow";
import TestimonialCard, {
  TESTIMONIAL_USER_IMAGE_HEIGHT,
  TESTIMONIAL_USER_IMAGE_WIDTH
} from "../../../CommonComponents/TestimonialCard/TestimonialCard";
import getImgIXUrl from "../../../Services/getImgIXUrl/getImgIXUrl";
import { CONSTANT_exploreFeedCardLimit } from "../../../constants/stringConstants";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { CONSTANT_explore } from "../../../constants/appEvents";
import deepLink from "../../../Services/deepLink/deepLink";

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
              data?.testimonials
                .slice(0, CONSTANT_exploreFeedCardLimit)
                .map((testimonial, testimonialIndex) => {
                  const action = () => {
                    deepLink({
                      link: testimonial.deepLinking.link,
                      screenData: {
                        ...(testimonial.deepLinking.screenData || {}),
                        itineraryId: testimonial.itineraryId
                      }
                    });
                    recordEvent(CONSTANT_explore.event, {
                      click: CONSTANT_explore.click.travellerTestimonialscard
                    });
                  };

                  return (
                    <TestimonialCard
                      key={testimonialIndex}
                      action={action}
                      date={testimonial.dateOfDeparture}
                      thumbnail={{
                        uri: getImgIXUrl({
                          src: testimonial.profileImage,
                          DPR: 0.02,
                          imgFactor: `h=${TESTIMONIAL_USER_IMAGE_HEIGHT}&w=${TESTIMONIAL_USER_IMAGE_WIDTH}&crop=fit`
                        })
                      }}
                      image={{
                        uri: getImgIXUrl({
                          src: testimonial.profileImage,
                          imgFactor: `h=${TESTIMONIAL_USER_IMAGE_HEIGHT}&w=${TESTIMONIAL_USER_IMAGE_WIDTH}&crop=fit`
                        })
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
