import { isProduction } from "../../getEnvironmentDetails/getEnvironmentDetails";
import {
  enableAnalytics,
  disableAnalytics
} from "../../analytics/analyticsService";

/**
 * Enables analytics only in PROD otherwise disables it
 */
const enableAnalyticsInProd = () => {
  if (!__DEV__ && isProduction()) {
    enableAnalytics();
  } else {
    disableAnalytics();
  }
};

export default enableAnalyticsInProd;
