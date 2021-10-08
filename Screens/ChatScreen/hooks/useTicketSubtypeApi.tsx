import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {CONSTANT_platoListTickets} from '../../../constants/apiUrls';
import {CONSTANT_responseSuccessStatus} from '../../../constants/stringConstants';

export interface IRequestBody {}

export type TaskSubType = {
  id: number;
  display_name: string;
  description: string;
  task_type_id: string;
};

export interface ISuccessData {
  status: typeof CONSTANT_responseSuccessStatus;
  data?: {
    task_sub_types: TaskSubType[];
  };
}

export interface IFailureData {
  status: 'FAILURE';
  data?: {
    message: string;
  };
}

export interface IApiHookData extends IApiCallHookData {
  successResponseData: ISuccessData | undefined;
  failureResponseData: IFailureData | undefined;
}

export type apiHook = [
  IApiHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>,
];

const useTicketSubtypeApi = (): [
  IApiHookData,
  (requestBody: IRequestBody) => Promise<boolean>,
] => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as apiHook;
  const getSubtype = (): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: `${CONSTANT_platoListTickets}/subtypes`,
          requestBody: {},
          method: 'GET',
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    getSubtype,
  ];
};

export default useTicketSubtypeApi;
