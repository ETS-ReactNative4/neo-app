import UserFlowTransition from "../UserFlowTransition";

it("User Flow Transition can be initialized", () => {
  const userFlowTransition = new UserFlowTransition();

  expect(userFlowTransition.completedSOFeedback).toBe(false);
  expect(userFlowTransition.seenOPSIntro).toBe(false);
  expect(userFlowTransition.seenPostBookingIntro).toBe(false);
});
