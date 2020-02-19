import React from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";
import BlogCard from "./BlogCard";
import { ScrollView, Alert } from "react-native";

const data: ICardData[] = [
  {
    smallTitle: "blog",
    title: "10 amazing things to do in Europe",
    backgroundColor: "rgb(0, 109, 183)"
  },
  {
    smallTitle: "blog",
    title: "5 essential things to know about Dubai",
    backgroundColor: "rgb(206, 133, 48)"
  },
  {
    smallTitle: "guide",
    title: "A local’s guide to experience Turkey",
    backgroundColor: "rgb(188, 74, 74)"
  }
];

interface ICardData {
  smallTitle: string;
  title: string;
  backgroundColor: string;
}

interface BlogCardWrapperProps {
  cardData: ICardData[];
}

const BlogCardWrapper = ({ cardData }: BlogCardWrapperProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {cardData.map((dataObj, index) => {
        return (
          <BlogCard
            key={index}
            smallTitle={dataObj.smallTitle}
            title={dataObj.title}
            bgColor={dataObj.backgroundColor}
            action={() => Alert.alert(`Click -> ${dataObj.title}`)}
          />
        );
      })}
    </ScrollView>
  );
};

const BlogCardTestCases: ITestCase[] = [
  {
    title: "Block Card",
    Component: (
      <BlogCard
        smallTitle={"blog"}
        title={"10 amazing things to do in Europe"}
        action={() => Alert.alert("Click -> 10 amazing things to do in Europe")}
      />
    )
  },
  {
    title: "Multiple Block Cards",
    Component: <BlogCardWrapper cardData={data} />
  }
];

export default BlogCardTestCases;
