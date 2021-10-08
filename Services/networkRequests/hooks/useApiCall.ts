import { useState } from "react";
import apiCall from "../../../Services/networkRequests/apiCall";
import { CONSTANT_responseSuccessStatus } from "../../../constants/stringConstants";
import { IMobileServerResponse } from "../../../TypeInterfaces/INetworkResponse";

export type NetworkRequestMethodTypes =
  | "CONNECT"
  | "DELETE"
  | "GET"
  | "HEAD"
  | "OPTIONS"
  | "PATCH"
  | "POST"
  | "PUT"
  | "TRACE";

export interface IApiCallConfig {
  route: string;
  method?: NetworkRequestMethodTypes;
  requestBody?: object;
  customDomain?: boolean;
  customToken?: string;
  customHeader?: object;
  abortController?: any; // no types available yet for the controller
}

export interface IApiCallResponse {
  successResponseData: IMobileServerResponse | undefined;
  failureResponseData: IMobileServerResponse | undefined;
}

export interface IApiCallHookData {
  successResponseData: IMobileServerResponse | undefined;
  failureResponseData: IMobileServerResponse | undefined;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

const useApiCall = (): [
  IApiCallHookData,
  (requestObject: IApiCallConfig) => Promise<boolean>
] => {
  const [successResponseData, setSuccessResponseData] = useState<
    IMobileServerResponse | undefined
  >();
  const [failureResponseData, setFailureResponseData] = useState<
    IMobileServerResponse | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const makeApiCall = ({
    route = "",
    method = "GET",
    requestBody = {},
    customDomain = false,
    customToken = "",
    customHeader = {},
    abortController = null
  }: IApiCallConfig): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
      setIsLoading(true);
      setSuccessResponseData(undefined);
      setFailureResponseData(undefined);
      try {
        const response: IMobileServerResponse = await apiCall(
          route,
          requestBody,
          method,
          customDomain,
          customToken,
          customHeader,
          abortController
        );
        if (response.status.toUpperCase() === CONSTANT_responseSuccessStatus) {
          setSuccessResponseData(response);
          setFailureResponseData(undefined);
          resolve(true);
        } else {
          setSuccessResponseData(undefined);
          setFailureResponseData(response);
          resolve(false);
        }
        setIsLoading(false);
        setIsError(false);
        setIsSuccess(true);
      } catch (e) {
        setIsLoading(false);
        setIsError(true);
        setIsSuccess(false);
        reject();
      }
    });
  };

  return [
    { successResponseData, failureResponseData, isLoading, isError, isSuccess },
    makeApiCall
  ];
};

export default useApiCall;
