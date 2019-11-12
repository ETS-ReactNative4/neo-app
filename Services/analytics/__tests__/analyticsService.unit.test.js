import * as analyticsService from "../analyticsService";
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
  analyticsService.enableAnalytics().then(result => {
    expect(result).toBe(true);
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

test("disables analytics", () => {
  const spyOnDisable = jest.spyOn(analytics, "disable");
  const spyOnFirebase = jest.spyOn(
    firebaseAnalytics(),
    "setAnalyticsCollectionEnabled"
  );
  const spyOnPerf = jest.spyOn(perf(), "setPerformanceCollectionEnabled");
  analyticsService.disableAnalytics().then(result => {
    expect(result).toBe(true);
    expect(spyOnDisable).toHaveBeenCalled();
    expect(spyOnFirebase).toHaveBeenCalledWith(false);
    expect(spyOnPerf).toHaveBeenCalled(false);
    spyOnDisable.mockRestore();
    spyOnFirebase.mockRestore();
    spyOnPerf.mockRestore();
  });
});

test("user details are correctly set", () => {
  const userDetails = {
    id: 123,
    name: "Uncle",
    email: "uncle1@uncles.com",
    phoneNumber: 1010101010
  };
  const spyOnLogin = jest.spyOn(analyticsService, "login");
  const spyOnIdentify = jest.spyOn(analytics, "identify");
  const spyOnSetUserId = jest.spyOn(firebaseAnalytics(), "setUserId");
  const spyOnSetUserProps = jest.spyOn(
    firebaseAnalytics(),
    "setUserProperties"
  );

  analyticsService.setUserDetails(userDetails).then(result => {
    expect(result).toBe(true);
    expect(spyOnLogin).toHaveBeenCalledWith(userDetails.id);
    expect(spyOnIdentify).toHaveBeenCalledWith(userDetails);
    expect(spyOnSetUserId).toHaveBeenCalledWith(userDetails.id);
    expect(spyOnSetUserProps).toHaveBeenCalledWith({
      name: userDetails.name,
      email: userDetails.email,
      phoneNumber: userDetails.phoneNumber
    });
    spyOnLogin.mockRestore();
    spyOnIdentify.mockRestore();
    spyOnSetUserId.mockRestore();
    spyOnSetUserProps.mockRestore();
  });
});

test("user attributes are correctly set", async () => {
  const spyOnSetAttr = jest.spyOn(analyticsService, "setUserAttributes");
  const result = await analyticsService.setUserAttributes("name", "Uncle");
  expect(result).toBe(true);
  expect(spyOnSetAttr).toHaveBeenCalledWith("name", "Uncle");
  spyOnSetAttr.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});
