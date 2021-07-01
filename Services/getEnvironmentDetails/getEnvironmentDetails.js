import Config from "react-native-config";

export const isProduction = () => Config.ENVIRONMENT === "production";

export const getEnvironmentName = () => Config.ENVIRONMENT;
