import {
  Freshchat,
  FreshchatConfig,
  FreshchatUser
  //@ts-ignore
} from "react-native-freshchat-sdk";
import { logError } from "../errorLogger/errorLogger";

/**
 * Event listener for retrieving restore id. This restore id must be stored on the
 * server side to retrieve user's chat history.
 */
Freshchat.addEventListener(Freshchat.EVENT_USER_RESTORE_ID_GENERATED, () => {
  Freshchat.getUser((user: { restoreId: string; externalId: string }) => {
    const restoreId = user.restoreId;
    const externalId = user.externalId;
  });
});

/**
 * Opens the chat screen
 */
export const openChat = (): boolean => {
  try {
    Freshchat.showConversations();
    return true;
  } catch (e) {
    logError(e, {
      type: "Failed to open chat"
    });
    return false;
  }
};

/**
 * Prepares the fresh chat native indent.
 * Rest of the fresh-chat functions will work only if the initialization method succeeds.
 */
export const initializeChat = (appId: string, appKey: string): boolean => {
  try {
    const freshchatConfig = new FreshchatConfig(appId, appKey);
    Freshchat.init(freshchatConfig);
    return true;
  } catch (e) {
    logError(e, {
      type: "Failed to initialize chat"
    });
    return false;
  }
};

export interface chatUserDetails {
  firstName: string;
  lastName: string;
  email: string;
  phoneCountryCode: string;
  phone: string;
}

/**
 * Used to set user related info to the fresh-chat conversation.
 * Then agents can see this details on the agent dashboard for every conversations.
 */
export const setChatUserDetails = ({
  firstName,
  lastName,
  email,
  phoneCountryCode,
  phone
}: chatUserDetails): Promise<Error> => {
  /**
   * TODO: No way to resolve this promise...
   */
  return new Promise((resolve, reject): void => {
    const freshchatUser = new FreshchatUser();
    freshchatUser.firstName = firstName;
    freshchatUser.lastName = lastName;
    freshchatUser.email = email;
    freshchatUser.phoneCountryCode = phoneCountryCode;
    freshchatUser.phone = phone;
    Freshchat.setUser(freshchatUser, (error: Error): void => {
      logError(error, {
        type: "failed to set user details in chat"
      });
      reject(error);
    });
  });
};

/**
 * On fresh install / logging in, this method will identify & restore the user's previous
 * chat history using the conversation's restore id.
 */
export const identifyChatUser = (
  externalId: string = "",
  restoreId: string | null = null
): Promise<Error> => {
  return new Promise((resolve, reject): void => {
    Freshchat.identifyUser(externalId, restoreId, (error: Error): void => {
      logError(error, {
        type: "unable to identify user in chat"
      });
      reject(error);
    });
  });
};
