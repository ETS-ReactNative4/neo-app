import React from "react";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { IBlogSection } from "../ExploreFeedType";
import BlogCard from "../../../CommonComponents/BlogCard/BlogCard";
import { StyleSheet, View } from "react-native";

export interface IPromotedCardsRowData {
  data?: IBlogSection["items"];
  isLoading: boolean;
}

const BlogCardsRow = (props: IBlogSection) => {
  return (
    <HorizontalCardsRow items={props.items}>
      {({ data }: IPromotedCardsRowData) => {
        return (
          <View style={styles.blogCardWrapper}>
            {data
              ? data.map((blogCard, blogCardIndex) => {
                  return (
                    <BlogCard
                      key={blogCardIndex}
                      action={() => null}
                      title={blogCard.blogText}
                      smallTitle={blogCard.type}
                      bgColor={blogCard.bgColor}
                    />
                  );
                })
              : null}
          </View>
        );
      }}
    </HorizontalCardsRow>
  );
};

const styles = StyleSheet.create({
  blogCardWrapper: {
    flexDirection: "row",
    marginHorizontal: 16
  }
});

export default BlogCardsRow;
