import UserFlowTransition from "../UserFlowTransition";
import fetchMock from "fetch-mock";
import { CONSTANT_apiServerUrl } from "../../constants/serverUrls";
import { CONSTANT_responseSuccessStatus } from "../../constants/stringConstants";
import { CONSTANT_feedbackUserState } from "../../constants/apiUrls";

const itineraryId = "testItineraryId";

const userHasSeenFeedbackUrl = `${CONSTANT_apiServerUrl}${CONSTANT_feedbackUserState}?itineraryId=${itineraryId}`;
const userTransitionStatusUrl = `${CONSTANT_apiServerUrl}${CONSTANT_feedbackUserState}?itineraryId=${itineraryId}`;
const userHasSeenOPSIntroUrl = `${CONSTANT_apiServerUrl}${CONSTANT_feedbackUserState}?itineraryId=${itineraryId}`;

const userHasSeenFeedbackSuccess = () => {
  fetchMock.patch(userHasSeenFeedbackUrl, {
    status: 200,
    body: {
      status: CONSTANT_responseSuccessStatus
    }
  });
};

const userHasSeenFeedbackError = () => {
  fetchMock.patch(userHasSeenFeedbackUrl, {
    throw: new Error("Request Failed")
  });
};

const userHasSeenFeedbackFailure = () => {
  fetchMock.patch(userHasSeenFeedbackUrl, {
    status: 500,
    body: "Internal Server Error"
  });
};

const userHasSeenOPSIntroSuccess = () => {
  fetchMock.patch(userHasSeenOPSIntroUrl, {
    status: 200,
    body: {
      status: CONSTANT_responseSuccessStatus
    }
  });
};

const userHasSeenOPSIntroError = () => {
  fetchMock.patch(userHasSeenOPSIntroUrl, {
    throw: new Error("Request Failed")
  });
};

const userHasSeenOPSIntroFailure = () => {
  fetchMock.patch(userHasSeenOPSIntroUrl, {
    status: 500,
    body: "Internal Server Error"
  });
};

const loadUserTransitionStatusSuccess = () => {
  fetchMock.get(userTransitionStatusUrl, {
    status: 200,
    body: {
      status: CONSTANT_responseSuccessStatus,
      data: {
        seenPostBookingIntro: true,
        completedSOFeedback: true,
        seenOPSIntro: true
      }
    }
  });
};

const loadUserTransitionStatusFailure = () => {
  fetchMock.get(userTransitionStatusUrl, {
    status: 500,
    body: {
      status: CONSTANT_responseSuccessStatus,
      data: "Internal Server Error"
    }
  });
};

const loadUserTransitionStatusError = () => {
  fetchMock.get(userTransitionStatusUrl, {
    throw: new Error("Request Failed")
  });
};

afterEach(() => {
  fetchMock.reset();
});

it("User Flow Transition can be initialized", () => {
  const userFlowTransition = new UserFlowTransition();
  expect(userFlowTransition.completedSOFeedback).toBe(false);
  expect(userFlowTransition.seenOPSIntro).toBe(false);
  expect(userFlowTransition.seenPostBookingIntro).toBe(false);
});

it("Transition status data loaded successfully", async () => {
  loadUserTransitionStatusSuccess();
  const userFlowTransition = new UserFlowTransition();
  const transitionStatus = await userFlowTransition.loadUserTransitionStatus(
    itineraryId
  );
  expect(transitionStatus.seenPostBookingIntro).toBe(true);
  expect(transitionStatus.seenOPSIntro).toBe(true);
  expect(transitionStatus.completedSOFeedback).toBe(true);
  expect(userFlowTransition.seenPostBookingIntro).toBe(true);
  expect(userFlowTransition.seenOPSIntro).toBe(true);
  expect(userFlowTransition.completedSOFeedback).toBe(true);
});

it("Transition status data load failure", async () => {
  loadUserTransitionStatusFailure();
  const userFlowTransition = new UserFlowTransition();
  try {
    await userFlowTransition.loadUserTransitionStatus(itineraryId);
  } catch (e) {
    console.error(e);
    expect(userFlowTransition.seenPostBookingIntro).toBe(false);
    expect(userFlowTransition.seenOPSIntro).toBe(false);
    expect(userFlowTransition.completedSOFeedback).toBe(false);
  }
});

it("Transition status data load error", async () => {
  loadUserTransitionStatusError();
  const userFlowTransition = new UserFlowTransition();
  try {
    await userFlowTransition.loadUserTransitionStatus(itineraryId);
  } catch (e) {
    console.error(e);
    expect(userFlowTransition.seenPostBookingIntro).toBe(false);
    expect(userFlowTransition.seenOPSIntro).toBe(false);
    expect(userFlowTransition.completedSOFeedback).toBe(false);
  }
});

it("User Has seen the Post booking intro", async () => {
  userHasSeenFeedbackSuccess();
  const userFlowTransition = new UserFlowTransition();
  await userFlowTransition.userSeenPostBookingIntro(itineraryId);
  expect(userFlowTransition.seenPostBookingIntro).toBe(true);
});

it("User Has seen the Post booking intro - But API Failed", async () => {
  userHasSeenFeedbackFailure();
  const userFlowTransition = new UserFlowTransition();
  try {
    await userFlowTransition.userSeenPostBookingIntro(itineraryId);
  } catch (e) {
    console.error(e);
    expect(userFlowTransition.seenPostBookingIntro).toBe(false);
  }
});

it("User Has seen the Post booking intro - But API Error", async () => {
  userHasSeenFeedbackError();
  const userFlowTransition = new UserFlowTransition();
  try {
    await userFlowTransition.userSeenPostBookingIntro(itineraryId);
  } catch (e) {
    console.error(e);
    expect(userFlowTransition.seenPostBookingIntro).toBe(false);
  }
});

it("User Has seen OPS intro", async () => {
  userHasSeenOPSIntroSuccess();
  const userFlowTransition = new UserFlowTransition();
  await userFlowTransition.userSeenOPSIntro(itineraryId);
  expect(userFlowTransition.seenOPSIntro).toBe(true);
});

it("User Has seen OPS intro - But API Failed", async () => {
  userHasSeenOPSIntroFailure();
  const userFlowTransition = new UserFlowTransition();
  try {
    await userFlowTransition.userSeenOPSIntro(itineraryId);
  } catch (e) {
    console.error(e);
    expect(userFlowTransition.seenOPSIntro).toBe(false);
  }
});

it("User Has seen OPS intro - But API Error", async () => {
  userHasSeenOPSIntroError();
  const userFlowTransition = new UserFlowTransition();
  try {
    await userFlowTransition.userSeenOPSIntro(itineraryId);
  } catch (e) {
    console.error(e);
    expect(userFlowTransition.seenOPSIntro).toBe(false);
  }
});

it("User Flow Transition after user logout", () => {
  const userFlowTransition = new UserFlowTransition();
  userFlowTransition.reset();
  expect(userFlowTransition.completedSOFeedback).toBe(false);
  expect(userFlowTransition.seenOPSIntro).toBe(false);
  expect(userFlowTransition.seenPostBookingIntro).toBe(false);
});
