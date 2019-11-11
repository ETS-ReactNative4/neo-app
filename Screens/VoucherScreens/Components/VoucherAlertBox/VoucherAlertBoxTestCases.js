import React from "react";
import VoucherAlertBox from "./VoucherAlertBox";

const VoucherAlertBoxTestCases = [
  {
    title: "Voucher Alert Box",
    Component: (
      <VoucherAlertBox
        alertText={
          "As the transfer is on shared basis, the arrival time of transfer could vary plus or minus 15-30minutes depending on traffic"
        }
        mode={"alert"}
      />
    )
  },
  {
    title: "Voucher Alert Box - info mode",
    Component: (
      <VoucherAlertBox
        alertText={
          "As the transfer is on shared basis, the arrival time of transfer could vary plus or minus 15-30minutes depending on traffic"
        }
        mode={"info"}
      />
    )
  }
];

export default VoucherAlertBoxTestCases;
