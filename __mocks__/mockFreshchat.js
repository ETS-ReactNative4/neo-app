jest.mock("react-native-freshchat-sdk", () => ({
  Freshchat: {
    showConversations: jest.fn(),
    addEventListener: jest.fn(),
    dismissFreshchatViews: jest.fn(),
    init: jest.fn(),
    setUser: jest.fn(),
    identifyUser: jest.fn(),
    getUnreadCountAsync: jest.fn(),
    resetUser: jest.fn(),
    getUser: jest.fn(),
    getFreshchatUserId: jest.fn(),
    setPushRegistrationToken: jest.fn(),
    isFreshchatNotification: jest.fn(),
    handlePushNotification: jest.fn()
  },
  ConversationOptions: class {
    tags = [];
    constructor(tags) {
      this.tags = tags;
    }
  },
  FreshchatConfig: jest.fn(),
  FreshchatUser: class {
    user = {};
    constructor() {
      return this.user;
    }
  }
}));
