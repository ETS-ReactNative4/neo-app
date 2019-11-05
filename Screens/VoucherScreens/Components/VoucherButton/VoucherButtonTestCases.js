import React from "react";
import VoucherButton from "./VoucherButton";

const VoucherButtonTestCases = [
  {
    title: "Voucher Button",
    Component: <VoucherButton cta={"View Voucher"} action={() => null} />
  },
  {
    title: "Voucher Button Last",
    Component: (
      <VoucherButton cta={"View Voucher"} action={() => null} isLast={true} />
    )
  }
];

export default VoucherButtonTestCases;
