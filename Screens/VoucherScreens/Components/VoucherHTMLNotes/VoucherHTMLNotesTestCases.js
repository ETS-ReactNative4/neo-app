import React from "react";
import VoucherHTMLNotes from "./VoucherHTMLNotes";

const htmlData = `<div>
  <ul>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
    <li>Upon arrival, phone 0800 935050 and let us know that you are ready to be picked up (Airport free phones are located near the baggage collection area)</li>
  </ul>
</div>`;

const VoucherHTMLNotesTestCases = [
  {
    title: "Voucher HTML notes data",
    Component: <VoucherHTMLNotes data={htmlData} />
  }
];

export default VoucherHTMLNotesTestCases;
