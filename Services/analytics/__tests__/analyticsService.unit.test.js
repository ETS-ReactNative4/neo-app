import { enableAnalytics } from "../analyticsService";
import analytics from "@segment/analytics-react-native";
import { analytics as firebaseAnalytics, perf } from "react-native-firebase";

test("loads analytics, sets it up and enables it", () => {
  const spyOnSetup = jest.spyOn(analytics, "setup");
  const spyOnEnable = jest.spyOn(analytics, "enable");
  const spyOnFirebase = jest.spyOn(
    firebaseAnalytics(),
    "setAnalyticsCollectionEnabled"
  );
  const spyOnPerf = jest.spyOn(perf(), "setPerformanceCollectionEnabled");
  enableAnalytics().then(() => {
    expect(spyOnSetup).toHaveBeenCalled(expect.any(string), {
      recordScreenViews: false,
      trackAppLifecycleEvents: true
    });
    expect(spyOnEnable).toHaveBeenCalled();
    expect(spyOnFirebase).toHaveBeenCalledWith(true);
    expect(spyOnPerf).toHaveBeenCalled(true);
    spyOnSetup.mockRestore();
    spyOnFirebase.mockRestore();
    spyOnPerf.mockRestore();
  });
});

afterEach(() => {
  jest.clearAllMocks();
});
