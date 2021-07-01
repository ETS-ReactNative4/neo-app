import * as freshchatService from "../freshchatService";
import {
  Freshchat
  // @ts-ignore
} from "react-native-freshchat-sdk";

test("open freshchat screen", () => {
  const spyOnShowConversations = jest.spyOn(Freshchat, "showConversations");
  const openChatDefault = freshchatService.openChat();
  expect(openChatDefault).toBe(true);
  expect(spyOnShowConversations).toHaveBeenCalled();
});

test("closing freshchat screen", () => {
  const spyOnHideConversations = jest.spyOn(Freshchat, "dismissFreshchatViews");
  freshchatService.closeChat();
  expect(spyOnHideConversations).toHaveBeenCalled();
});

const testFreshChatAppId = "test app id",
  testFreshChatAppKey = "test app key";

test("initializing fresh chat with invalid app id", () => {
  const spyOnInit = jest.spyOn(Freshchat, "init");
  const initializeResult = freshchatService.initializeChat(
    "",
    testFreshChatAppKey
  );
  expect(initializeResult).toBe(false);
  expect(spyOnInit).toHaveBeenCalledTimes(0);
});

test("initializing fresh chat", () => {
  const spyOnInit = jest.spyOn(Freshchat, "init");
  const initializeResult = freshchatService.initializeChat(
    testFreshChatAppId,
    testFreshChatAppKey
  );
  expect(initializeResult).toBe(true);
  expect(spyOnInit).toHaveBeenCalled();
});

test("Setting Chat User Details", () => {
  const userDetails = {
    firstName: "Test",
    lastName: "User",
    email: "testuser@gmail.com",
    phoneCountryCode: "+91",
    phone: "1234567890"
  };
  const spyOnSetUser = jest.spyOn(Freshchat, "setUser");
  freshchatService.setChatUserDetails(userDetails).then(() => {
    expect(spyOnSetUser).toHaveBeenCalled();
  });
});

/**
 * Failure scenarios cannot be reproduced since they are callbacks
 */
// test("Setting Chat User Details - failure", () => {
//   const userDetails = {
//     firstName: "Test",
//     lastName: "User",
//     email: "testuser@gmail.com",
//     phoneCountryCode: "+91",
//     phone: "1234567890"
//   };
//   const spyOnSetUser = jest.spyOn(Freshchat, "setUser");
//   spyOnSetUser.mockReturnValueOnce(new Error());
//   const spyOnLogError = jest.spyOn(errorLogger, "logError");
//   freshchatService
//     .setChatUserDetails(userDetails)
//     .then(() => {
//       expect(spyOnSetUser).toHaveBeenCalled();
//     })
//     .catch(() => {
//       expect(spyOnLogError).toHaveBeenCalled();
//     });
// });

test("Identifying Chat User", () => {
  const spyOnIdentifyUser = jest.spyOn(Freshchat, "identifyUser");
  freshchatService.identifyChatUser("externalId", "restoreId").then(() => {
    expect(spyOnIdentifyUser).toHaveBeenCalled();
  });
});

test("Get unread messages count", () => {
  const spyOnUnreadCount = jest.spyOn(Freshchat, "getUnreadCountAsync");
  freshchatService.getUnreadMessagesCount().then(() => {
    expect(spyOnUnreadCount).toHaveBeenCalled();
  });
});

test("logout user from chat", () => {
  const spyOnResetUser = jest.spyOn(Freshchat, "resetUser");
  freshchatService.logoutUserFromChat();
  expect(spyOnResetUser).toHaveBeenCalled();
});

test("retrieve restore id of the user", () => {
  const spyOnGetUser = jest.spyOn(Freshchat, "getUser");
  freshchatService.getRestoreId().then(() => {
    expect(spyOnGetUser).toHaveBeenCalled();
  });
});

test("retrieve actor id of the user", () => {
  const spyOnGetActorId = jest.spyOn(Freshchat, "getFreshchatUserId");
  freshchatService.getRestoreId().then(() => {
    expect(spyOnGetActorId).toHaveBeenCalled();
  });
});

test("Set chat push token", () => {
  const spyOnSetToken = jest.spyOn(Freshchat, "setPushRegistrationToken");
  const result = freshchatService.setChatPushToken("token");
  expect(result).toBe(true);
  expect(spyOnSetToken).toHaveBeenCalled();
});

test("check if the notification belongs to chat", () => {
  const spyOnFreshChatNotification = jest.spyOn(
    Freshchat,
    "isFreshchatNotification"
  );
  freshchatService.checkIfChatPushNotification({}).then(() => {
    expect(spyOnFreshChatNotification).toHaveBeenCalled();
  });
});

test("chat push notification handler", () => {
  const spyOnChatPushNotification = jest.spyOn(
    Freshchat,
    "handlePushNotification"
  );
  freshchatService.chatPushNotificationHandler({});
  expect(spyOnChatPushNotification).toHaveBeenCalled();
});

/**
 * TODO: Chat launcher requires user details to test the function
 * Will be picking this up once fixtures have been created for different types of
 * user accounts and itineraries.
 */
