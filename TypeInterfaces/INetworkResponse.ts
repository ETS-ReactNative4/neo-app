export interface IMobileServerResponse {
  status:
    | "VERIFIED"
    | "VERIFICATION_FAILED"
    | "EXPIRED"
    | "SUCCESS"
    | "INVALID_PASSWORD"
    | "INVALID_EMAIL"
    | "USER_UNAVAILABLE"
    | "EXCEPTION"
    | "FAILURE"
    | "NOT_FOUND"
    | "BAD_REQUEST"
    | "UNAUTHORIZED"
    | "FORBIDDEN"
    | "PLATO_FAILURE"
    | "MOBILE_EXISTS"
    | "EMAIL_EXISTS";
  data?: any;
}
