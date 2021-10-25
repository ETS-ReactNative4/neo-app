import useApiCall, {
  IApiCallHookData,
  IApiCallConfig,
} from '../../../Services/networkRequests/hooks/useApiCall';
import {CONSTANT_uploadAssets} from '../../../constants/apiUrls';
import {CONSTANT_responseSuccessStatus} from '../../../constants/stringConstants';

export interface IRequestBody {}

export interface ISuccessData {
  status: typeof CONSTANT_responseSuccessStatus;
  data?: {
    id: string;
    fileUrl: string;
    fileKey: string;
    uploadedAt: string;
    userId: string;
    client: string;
  }[];
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

const useListFilesApi = (): [
  IApiHookData,
  (itineraryId: string) => Promise<boolean>,
] => {
  const [
    {successResponseData, failureResponseData, isError, isLoading, isSuccess},
    makeApiCall,
  ] = useApiCall() as apiHook;
  const getFiles = (userId: string): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: `${CONSTANT_uploadAssets}/${userId}`,
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
    getFiles,
  ];
};

export default useListFilesApi;
