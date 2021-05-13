import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {
  CONSTANT_coupon_apply,
  CONSTANT_coupon_remove,
} from '../../../constants/apiUrls';
import {IMobileServerResponse} from '../../../TypeInterfaces/INetworkResponse';
export interface CouponResponseDataType extends IMobileServerResponse {
  status: 'SUCCESS';
  data: {};
}
export interface CouponApiCallHookData extends IApiCallHookData {
  successResponseData: CouponResponseDataType | undefined;
}
type CouponRequestType = {coupon: string; itineraryId: string};

export type couponApiHookType = [
  CouponApiCallHookData,
  (requestObject: CouponRequestType) => Promise<boolean>,
];

export type useCityApiCallType = [
  CouponApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useCouponApi = (): couponApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useCityApiCallType;

  const applyCoupon = (requestObject: CouponRequestType) => {
    return new Promise<boolean>(async (resolve, reject) => {
      const {coupon, itineraryId} = requestObject;
      const url = coupon
        ? CONSTANT_coupon_apply({coupon, itineraryId})
        : CONSTANT_coupon_remove({itineraryId});
      const method = coupon ? 'POST' : 'DELETE';
      try {
        const result = await makeApiCall({
          route: url,
          method,
          requestBody: {},
        });
        console.log('result coupon', result, successResponseData);
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    applyCoupon,
  ];
};

export default useCouponApi;
