import React from "react";
import VoucherHeaderV2 from "./VoucherHeaderV2";
import constants from "../../../../constants/constants";

const VoucherHeaderV2TestCases = [
  {
    title: "Voucher Header",
    Component: (
      <VoucherHeaderV2
        title={"Insurance Voucher"}
        icon={constants.insuranceIcon}
        coverImage={constants.leisureIllus}
      />
    )
  }
];

export default VoucherHeaderV2TestCases;
