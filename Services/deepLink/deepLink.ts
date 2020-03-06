import resolveLinks from "../resolveLinks/resolveLinks";

export interface ILocationDetail {
  latitude: number;
  longitude: number;
}

export interface IDeepLinkObject {
  link?: string;
  screenData?: object;
  voucherType?: string;
  costingIdentifier?: string;
  location?: ILocationDetail;
  contactNumber?: string;
}

/**
 * A well typed wrapper around the good old resolveLinks module
 * PT TODO: The resolveLinks need cleaning up at the end of project
 */
const deepLink = ({
  link = "",
  screenData = {},
  voucherType = "",
  costingIdentifier = "",
  location,
  contactNumber = ""
}: IDeepLinkObject) => {
  resolveLinks(link, screenData, {
    voucherType,
    costingIdentifier,
    location,
    contactNumber
  });
};

export default deepLink;
