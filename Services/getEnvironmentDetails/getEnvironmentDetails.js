import { ENVIRONMENT } from "react-native-dotenv";

export const isProduction = () => ENVIRONMENT === "production";

export const getEnvironmentName = () => ENVIRONMENT;
