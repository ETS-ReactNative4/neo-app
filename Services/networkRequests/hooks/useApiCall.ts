import { useState } from "react";
import apiCall from "../../../Services/networkRequests/apiCall";
import { CONSTANT_responseSuccessStatus } from "../../../constants/stringConstants";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";

export interface IApiCallConfig {
  route: string;
  method?:
    | "CONNECT"
    | "DELETE"
    | "GET"
    | "HEAD"
    | "OPTIONS"
    | "PATCH"
    | "POST"
    | "PUT"
    | "TRACE";
  requestBody?: object;
  customDomain?: boolean;
  customToken?: string;
  customHeader?: object;
}

const useApiCall = (): [
  { data: object; isLoading: boolean; isError: boolean; isSuccess: boolean },
  (request: IApiCallConfig) => void
] => {
  const [data, setData] = useState<object>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const makeApiCall = async ({
    route = "",
    method = "GET",
    requestBody = {},
    customDomain = false,
    customToken = "",
    customHeader = {}
  }: IApiCallConfig) => {
    setIsLoading(true);
    try {
      const response: IMobileServerResponse = await apiCall(
        route,
        requestBody,
        method,
        customDomain,
        customToken,
        customHeader
      );
      if (response.status === CONSTANT_responseSuccessStatus) {
        setData(response.data);
      }
      setIsLoading(false);
      setIsError(false);
      setIsSuccess(true);
    } catch (e) {
      setIsLoading(false);
      setIsError(true);
      setIsSuccess(false);
    }
    return;
  };

  return [{ data, isLoading, isError, isSuccess }, makeApiCall];
};

export default useApiCall;
