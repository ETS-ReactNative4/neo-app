import React, { useState } from "react";

import { ITestCase } from "../../TypeInterfaces/TestCases/ITestCases";

import SearchBox from "./SearchBox";

const SearchBoxWrapper = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <SearchBox
      textPlaceholder={"Find a country"}
      text={search}
      onChangeText={setSearch}
    />
  );
};

const SearchBoxTestCases: ITestCase[] = [
  {
    title: "Search Box",
    Component: <SearchBoxWrapper />
  }
];

export default SearchBoxTestCases;
