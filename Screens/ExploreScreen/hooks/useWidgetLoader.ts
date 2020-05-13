import useApiCall, {
  IApiCallHookData,
  NetworkRequestMethodTypes
} from "../../../Services/networkRequests/hooks/useApiCall";

export interface IWidgetLoaderRequestBody {
  url: string;
  method: NetworkRequestMethodTypes;
  requestBody: object;
}

const useWidgetLoader = (): [
  IApiCallHookData,
  (request: IWidgetLoaderRequestBody) => Promise<boolean>
] => {
  const [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    makeApiCall
  ] = useApiCall();

  const loadWidgetsData = ({
    url,
    method = "GET",
    requestBody = {}
  }: IWidgetLoaderRequestBody): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await makeApiCall({
          route: url,
          method,
          requestBody
        });
        resolve(result);
      } catch (e) {
        reject();
      }
    });
  };

  return [
    { successResponseData, failureResponseData, isError, isLoading, isSuccess },
    loadWidgetsData
  ];
};

export default useWidgetLoader;
