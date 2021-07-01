import React, { useEffect, ReactNode } from "react";
import { ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { ILoadCardRequest } from "../ExploreFeedType";
import useWidgetLoader from "../hooks/useWidgetLoader";

export interface HorizontalCardsRowProps
  extends ILoadCardRequest,
    ScrollViewProps {
  apiUrl?: string;
  children: ({
    data,
    isLoading,
    displayCurrency
  }: {
    data?: any;
    isLoading: boolean;
    displayCurrency: string;
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
  try {
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        removeClippedSubviews
        horizontal
        {...otherProps}
      >
        <View style={styles.horizontalCardsRowWrapper}>
          {children({
            data: items || (successResponseData?.data as any),
            displayCurrency: successResponseData?.displayCurrency ?? "INR",
            isLoading
          })}
        </View>
      </ScrollView>
    );
  } catch (e) {
    console.error(e);
    return null;
  }
};

const styles = StyleSheet.create({
  horizontalCardsRowWrapper: {
    flexDirection: "row",
    marginHorizontal: 16
  }
});

export default HorizontalCardsRow;
