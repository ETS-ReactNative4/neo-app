import * as analyticsService from "../analyticsService";
import analytics from "@segment/analytics-react-native";
import { analytics as firebaseAnalytics, perf } from "react-native-firebase";
import * as activeRoute from "../../getActiveRouteName/getActiveRouteName";
import * as logger from "../../errorLogger/errorLogger";

/**
 * Jest techniques used -
 *
 * 1. Mocking default unnamed exports.
 * 2. Mocking different return values for same mocked method.
 */

test("recordEvent - records given event all of our analytics stores", () => {
  const testEvent = "example_event";
  const testParams = {
    hi: "hello"
  };
  const spyOnBreadCrumbLogger = jest.spyOn(logger, "logBreadCrumb");
  const spyOnFirebase = jest.spyOn(firebaseAnalytics(), "logEvent");
  const spyOnAnalyticsTrack = jest.spyOn(analytics, "track");
  analyticsService.recordEvent(testEvent, testParams);
  setTimeout(() => {
    expect(spyOnBreadCrumbLogger).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "analytics-event",
        category: "analytics-data",
        data: {
          event: testEvent,
          params: {
            ...testParams,
            sessionId: expect.any(String)
          }
        },
        level: "info"
      })
    );
    expect(spyOnFirebase).toHaveBeenLastCalledWith(testEvent, testParams);
    expect(spyOnAnalyticsTrack).toHaveBeenCalledWith(testEvent, {
      ...testParams,
      sessionId: expect.any(String)
    });
    spyOnBreadCrumbLogger.mockRestore();
    spyOnFirebase.mockRestore();
    spyOnAnalyticsTrack.mockRestore();
  }, 0);
});

test("recordEvent - returns when an invalid analytics param is given", () => {
  const testEvent = "example_event";
  const testParams = null; // `null` isn't a valid analytics parameter type!
  const spyOnErrorLogger = jest.spyOn(logger, "logError");
  analyticsService.recordEvent(testEvent, testParams);
  setTimeout(() => {
    expect(spyOnErrorLogger).toHaveBeenCalledWith(
      "Invalid analytics parameter null",
      testEvent,
      testParams
    );
    spyOnErrorLogger.mockRestore();
  }, 0);
});

test("enableAnalytics - loads analytics, sets it up and enables it", () => {
  const spyOnSetup = jest.spyOn(analytics, "setup");
  const spyOnEnable = jest.spyOn(analytics, "enable");
  const spyOnFirebase = jest.spyOn(
    firebaseAnalytics(),
    "setAnalyticsCollectionEnabled"
  );
  const spyOnPerf = jest.spyOn(perf(), "setPerformanceCollectionEnabled");
  analyticsService.enableAnalytics().then(result => {
    expect(result).toBe(true);
    expect(spyOnSetup).toHaveBeenCalled(expect.any(String), {
      recordScreenViews: false,
      trackAppLifecycleEvents: true
    });
    expect(spyOnEnable).toHaveBeenCalledTimes(1);
    expect(spyOnFirebase).toHaveBeenCalledWith(true);
    expect(spyOnPerf).toHaveBeenCalledWith(true);
    spyOnSetup.mockRestore();
    spyOnFirebase.mockRestore();
    spyOnPerf.mockRestore();
  });
});

test("disableAnalytics - disables analytics", () => {
  const spyOnDisable = jest.spyOn(analytics, "disable");
  const spyOnFirebase = jest.spyOn(
    firebaseAnalytics(),
    "setAnalyticsCollectionEnabled"
  );
  const spyOnPerf = jest.spyOn(perf(), "setPerformanceCollectionEnabled");
  analyticsService.disableAnalytics().then(result => {
    expect(result).toBe(true);
    expect(spyOnDisable).toHaveBeenCalledTimes(1);
    expect(spyOnFirebase).toHaveBeenCalledWith(false);
    expect(spyOnPerf).toHaveBeenCalledWith(false);
    spyOnDisable.mockRestore();
    spyOnFirebase.mockRestore();
    spyOnPerf.mockRestore();
  });
});

test("setUserDetails - user details are correctly set", () => {
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

test("screenTracker - screen tracking is done correctly", () => {
  const spyOnActiveRoute = jest.spyOn(activeRoute, "default"); // Notice the use of "default" for unnamed default exports.
  spyOnActiveRoute.mockReturnValueOnce("example1"); // Mock different return values for each call.
  spyOnActiveRoute.mockReturnValueOnce("example2");

  const spyOnBreadCrumbLogger = jest.spyOn(logger, "logBreadCrumb");
  const spyOnAnalyticsScreen = jest.spyOn(analytics, "screen");
  analyticsService.screenTracker({}, {});
  setTimeout(() => {
    expect(spyOnActiveRoute).toHaveBeenCalledTimes(2);
    expect(spyOnBreadCrumbLogger).toHaveBeenCalledTimes(1);
    expect(spyOnAnalyticsScreen).toHaveBeenCalledTimes(1);
    spyOnBreadCrumbLogger.mockRestore();
    spyOnAnalyticsScreen.mockRestore();
  }, 0);
});

test("setUserAttributes - user attributes are correctly set", async () => {
  const spyOnWebEngage = jest.spyOn(analyticsService, "setWebEngageAttribute");
  analyticsService.setUserAttributes("name", "Uncle");
  expect(spyOnWebEngage).toHaveBeenCalledWith("name", "Uncle");
  spyOnWebEngage.mockRestore();
});

afterEach(() => {
  jest.clearAllMocks();
});
