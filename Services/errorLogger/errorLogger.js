import { Sentry } from "react-native-sentry";

Sentry.config(
  "https://af21f52962874bf49a888d1826e5a827:dbbf31a3751e420d8d579f33139558fc@sentry.io/1216774"
).install();

// Sentry.captureException(new Error(`Test Error! - ${Platform.OS}`), {
//   logger: "my.module"
// });
