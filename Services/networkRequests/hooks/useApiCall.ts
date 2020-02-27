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
    customHeader = {}
  }: IApiCallConfig): Promise<boolean> => {
    return new Promise<boolean>(async (resolve, reject) => {
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
