import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {
  CONSTANT_loyalty_apply,
  CONSTANT_loyalty_remove,
} from '../../../constants/apiUrls';
import {IMobileServerResponse} from '../../../TypeInterfaces/INetworkResponse';
import {IItinerary} from '../../../TypeInterfaces/IItinerary';

export interface LoyalCreditResponseData extends IMobileServerResponse {
  status: 'SUCCESS';
  data: IItinerary;
}

export interface ICityListApiCallHookData extends IApiCallHookData {
  successResponseData: LoyalCreditResponseData | undefined;
}

export type LoyalCreditRequestType = {coupon: number; itineraryId: string};

export type loaylCreditApiHookType = [
  ICityListApiCallHookData,
  (reqObject: LoyalCreditRequestType) => Promise<boolean>,
];

export type useLoyaltyCreditApiCallType = [
  ICityListApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useLoayltyCreditApi = (): loaylCreditApiHookType => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as useLoyaltyCreditApiCallType;

  const applyLoyaltyCredit = ({
    coupon,
    itineraryId,
  }: LoyalCreditRequestType) => {
    return new Promise<boolean>(async (resolve, reject) => {
      const url = coupon
        ? CONSTANT_loyalty_apply({coupon, itineraryId})
        : CONSTANT_loyalty_remove({itineraryId});

      const method = coupon ? 'POST' : 'DELETE';
      try {
        const result = await makeApiCall({
          route: url,
          method,
          requestBody: {},
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    applyLoyaltyCredit,
  ];
};

export default useLoayltyCreditApi;
