import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {CONSTANT_platoListTickets} from '../../../constants/apiUrls';
import {CONSTANT_responseSuccessStatus} from '../../../constants/stringConstants';

export type TaskType = {
  id: number;
  title: string;
  status_id: number;
  type_id: number;
  sub_type_id: number;
  customer_have_new_message: boolean;
};

export interface IRequestBody {}

export interface ISuccessData {
  status: typeof CONSTANT_responseSuccessStatus;
  data?: {
    trail_tasks: TaskType[];
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

const usePlatoTicketsApi = (): [
  IApiHookData,
  (itineraryId: string) => Promise<boolean>,
] => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as apiHook;
  const getTickets = (itineraryId: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: `${CONSTANT_platoListTickets}?vacation_id=${itineraryId}`,
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
    getTickets,
  ];
};

export default usePlatoTicketsApi;
