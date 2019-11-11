import React from "react";
import VoucherSectionTitle from "./VoucherSectionTitle";
import constants from "../../../../constants/constants";

const VoucherSectionTitleTestCases = [
  {
    title: "Voucher Section Title",
    Component: (
      <VoucherSectionTitle
        titleText={"Hotel Room 1"}
        sectionIcon={constants.hotelIcon}
      />
    )
  },
  {
    title: "Voucher Section Title - without icon",
    Component: <VoucherSectionTitle titleText={"Hotel Room 1"} />
  }
];

export default VoucherSectionTitleTestCases;
