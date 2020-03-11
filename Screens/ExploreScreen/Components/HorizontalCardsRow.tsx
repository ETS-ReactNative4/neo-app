import React, { useEffect, ReactNode } from "react";
import { ScrollView, ScrollViewProps } from "react-native";
import { ILoadCardRequest } from "../ExploreFeedType";
import useWidgetLoader from "../hooks/useWidgetLoader";

export interface HorizontalCardsRowProps
  extends ILoadCardRequest,
    ScrollViewProps {
  apiUrl?: string;
  children: ({
    data,
    isLoading
  }: {
    data?: any;
    isLoading: boolean;
  }) => ReactNode;
  items?: any;
}

const HorizontalCardsRow = ({
  apiUrl,
  requestPayload = {},
  httpMethod = "GET",
  children = () => null,
  items,
  ...otherProps
}: HorizontalCardsRowProps) => {
  const [widgetDetails, loadWidgetsData] = useWidgetLoader();

  useEffect(() => {
    if (apiUrl) {
      loadWidgetsData({
        url: apiUrl,
        requestBody: requestPayload,
        method: httpMethod
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { successResponseData, isLoading } = widgetDetails;

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      horizontal
      {...otherProps}
    >
      {children({
        data: items || (successResponseData?.data as any),
        isLoading
      })}
    </ScrollView>
  );
};

export default HorizontalCardsRow;
