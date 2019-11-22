import React from "react";
import VoucherListItem from "./VoucherListItem";

const voucherItemsData = [
  {
    name: "Confirmation number",
    value: "SX236283624",
    info: "(19 Jun 2019 - 19 Jul 2019)"
  }
];

const VoucherListItemTestCases = [
  {
    title: "Voucher List Item",
    Component: (
      <VoucherListItem
        name={voucherItemsData[0].name}
        value={voucherItemsData[0].value}
      />
    )
  },
  {
    title: "Voucher List Item with info",
    Component: (
      <VoucherListItem
        name={voucherItemsData[0].name}
        value={voucherItemsData[0].value}
        info={voucherItemsData[0].info}
      />
    )
  },
  {
    title: "Voucher List Item with info Last",
    Component: (
      <VoucherListItem
        name={voucherItemsData[0].name}
        value={voucherItemsData[0].value}
        info={voucherItemsData[0].info}
        isLast={true}
      />
    )
  }
];

export default VoucherListItemTestCases;
