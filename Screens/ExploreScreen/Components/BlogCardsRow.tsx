import React from "react";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { IBlogSection } from "../ExploreFeedType";
import BlogCard from "../../../CommonComponents/BlogCard/BlogCard";
import { recordEvent } from "../../../Services/analytics/analyticsService";
import { CONSTANT_explore } from "../../../constants/appEvents";

export interface IPromotedCardsRowData {
  data?: IBlogSection["items"];
  isLoading: boolean;
}

const BlogCardsRow = (props: IBlogSection) => {
  return (
    <HorizontalCardsRow items={props.items}>
      {({ data }: IPromotedCardsRowData) => {
        return data
          ? data.map((blogCard, blogCardIndex) => {
              const action = () => {
                recordEvent(CONSTANT_explore, {
                  click: CONSTANT_explore.click.travelBlogs
                });
              };
              return (
                <BlogCard
                  key={blogCardIndex}
                  action={action}
                  title={blogCard.blogText}
                  smallTitle={blogCard.type}
                  bgColor={blogCard.bgColor}
                />
              );
            })
          : null;
      }}
    </HorizontalCardsRow>
  );
};

export default BlogCardsRow;
