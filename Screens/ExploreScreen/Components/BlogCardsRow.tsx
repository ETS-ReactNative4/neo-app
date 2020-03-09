import React from "react";
import HorizontalCardsRow from "./HorizontalCardsRow";
import { IBlogSection } from "../ExploreFeedType";
import BlogCard from "../../../CommonComponents/BlogCard/BlogCard";

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
          : null;
      }}
    </HorizontalCardsRow>
  );
};

export default BlogCardsRow;
