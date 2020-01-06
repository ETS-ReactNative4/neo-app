import { ReactNode } from "react";

export interface IVoucherSplitSectionData {
  name: string;
  value?: string;
  component?: ReactNode;
}

export interface IPassengerDetail {
  salutation: string;
  firstName: string;
  lastName: string;
}
