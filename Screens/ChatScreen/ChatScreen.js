import React, { Component } from "react";
import { BackHandler, Keyboard, Platform, SafeAreaView } from "react-native";
import { isIphoneX } from "react-native-iphone-x-helper";
import constants from "../../constants/constants";
import { inject, observer } from "mobx-react/custom";
import BackButtonIos from "../../CommonComponents/BackButtonIos/BackButtonIos";
import ControlledWebView from "../../CommonComponents/ControlledWebView/ControlledWebView";
import UnableToUseChat from "./Components/UnableToUseChat";
import PreTrip from "./Components/PreTrip";
import { recordEvent } from "../../Services/analytics/analyticsService";
import ErrorBoundary from "../../CommonComponents/ErrorBoundary/ErrorBoundary";
import openCustomTab from "../../Services/openCustomTab/openCustomTab";
import getUrlParams from "../../Services/getUrlParams/getUrlParams";
import isUserLoggedInCallback from "../../Services/isUserLoggedInCallback/isUserLoggedInCallback";
import objectToQueryParam from "../../Services/objectToQueryParam/objectToQueryParam";
import { logError } from "../../Services/errorLogger/errorLogger";
import DeviceInfo from "react-native-device-info";
import storeService from "../../Services/storeService/storeService";
import HelpDeskView from "./Components/HelpDeskView";
import debouncer from "../../Services/debouncer/debouncer";
import SupportOfflineMessage from "./Components/SupportOfflineMessage";
import dialer from "../../Services/dialer/dialer";

@ErrorBoundary({ isRoot: true })
@inject("itineraries")
@inject("appState")
@inject("chatDetailsStore")
@inject("supportStore")
@observer
class ChatScreen extends Component {
  state = {
    canGoBack: false,
    keyboardVisible: false,
    keyboardSpace: 0,
    isChatKilled: false
  };
  _webView = React.createRef();
  _didFocusSubscription;
  _willBlurSubscription;
  _keyboardDidShowListener;
  _keyboardDidHideListener;

  keyboardDidShow = e => {
    this.setState({
      keyboardVisible: true,
      keyboardSpace: e.endCoordinates.height
    });
  };

  keyboardDidHide = () => {
    this.setState({
      keyboardVisible: false,
      keyboardSpace: 0
    });
  };

  constructor(props) {
    super(props);

    const { clearChatNotification } = props.appState;

    this._didFocusSubscription = props.navigation.addListener(
      "didFocus",
      () => {
        debouncer(() => {
          this.refreshChatInitializationStatus();
          clearChatNotification();
          this._keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === "ios"
              ? "keyboardWillChangeFrame"
              : "keyboardDidShow",
            this.keyboardDidShow
          );
          this._keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
            this.keyboardDidHide
          );
          BackHandler.addEventListener("hardwareBackPress", this.goBack);
        });
      }
    );
  }

  /**
   * Keeps track of history of the webview so that back button can navigate through webview history
   */
  onNavigationStateChange = navState => {
    this.setState({
      canGoBack: navState.canGoBack
    });
  };

  /**
   * Go back to previous webview page if possible otherwise simply go back to the first tab in the app home screen
   */
  goBack = () => {
    if (this.state.canGoBack) {
      this._webView.goBack();
    } else {
      this.props.navigation.goBack();
    }
    return true;
  };

  initializeChat = () => {
    isUserLoggedInCallback(() => {
      const { getUserDetails } = this.props.chatDetailsStore;
      const { loadConversation, loadFaqDetails } = this.props.supportStore;
      loadConversation();
      loadFaqDetails();
      getUserDetails();
    });
  };

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener(
      "willBlur",
      () => {
        this._keyboardDidShowListener && this._keyboardDidShowListener.remove();
        this._keyboardDidHideListener && this._keyboardDidHideListener.remove();
        BackHandler.removeEventListener("hardwareBackPress", this.goBack);
      }
    );
    this.refreshChatInitializationStatus();
  }

  refreshChatInitializationStatus = () => {
    const { isChatActive } = this.props.chatDetailsStore;
    const { selectedItineraryId } = this.props.itineraries;
    if (!isChatActive && selectedItineraryId) {
      this.initializeChat();
    }
  };

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  /**
   * This will be triggered by the events happening inside the Webview
   * Used to retrieve `restoreId`, `actorId` and log errors happening inside the HTML
   */
  webViewMessageCallback = event => {
    const data = JSON.parse(event.nativeEvent.data);
    const { restoreId, error, actorId } = data;
    const { setChatMetaInfo } = this.props.chatDetailsStore;
    if (restoreId && actorId) {
      setChatMetaInfo({ restoreId, actorId }, () => {
        /**
         * Chat Webview needs to be killed and restarted, otherwise
         * it will behave like history.push event
         */
        this.setState(
          {
            isChatKilled: true
          },
          () => {
            setTimeout(() => {
              this.setState({
                isChatKilled: false
              });
            }, 200);
          }
        );
      });
    } else {
      /**
       * Prevent logging the error if the chat fails
       * due to no internet connection
       */
      const isConnectedToInternet = storeService.appState.isConnected;
      if (isConnectedToInternet) {
        logError(error, { data });
      }
    }
  };

  contactSupport = () => {
    this.props.navigation.navigate("ContactUs", {
      type: constants.defaultSupportType
    });
  };

  viewTickets = () => {
    this.props.navigation.navigate("YourTickets");
  };

  render() {
    const { isChatKilled } = this.state;
    const { isConnected } = this.props.appState;
    const {
      chatDetails,
      initializationError,
      metaDataError,
      isChatActive,
      chatActivationMessage,
      offlineContact,
      currentTime,
      isOffHours
    } = this.props.chatDetailsStore;
    const {
      faqDetails,
      getConversationsByItineraryId,
      loadConversation,
      isConversationLoading
    } = this.props.supportStore;
    const { selectedItineraryId } = this.props.itineraries;
    const conversations = getConversationsByItineraryId(selectedItineraryId);

    const faqSections = Object.keys(faqDetails).map(faqSection => {
      return {
        title: faqSection,
        icon: faqSection,
        action: () =>
          this.props.navigation.navigate("FAQ", { title: faqSection })
      };
    });

    const openSupportCenter = () => {
      recordEvent(constants.chatOpenSupportCenterClick);
      this.props.navigation.navigate("SupportCenter");
    };
    const isChatFailed = initializationError || metaDataError;
    const chatQueryParam = objectToQueryParam({
      // create query parameter for loading webview from the chat details object
      ...chatDetails,
      region: encodeURI(chatDetails.region), // region is an Array and needs to be encoded
      appVersion: DeviceInfo.getVersion(),
      webview: true
    });
    const uri = constants.chatServerUrl(chatQueryParam);

    const openDialer = () => dialer(offlineContact);

    const shouldDisplayChat = isConnected && isChatActive && !isChatFailed;
    const chatScreenError = isChatActive && isChatFailed;
    const chatScreenNoInternet = isChatActive && !isConnected;

    /**
     * Chat can be displayed, Otherwise show helpdesk /error message
     */
    if (shouldDisplayChat) {
      return (
        <SafeAreaView
          style={[
            { flex: 1 },
            Platform.OS === "ios" && isIphoneX()
              ? {
                  backgroundColor:
                    this.state.keyboardVisible || this.state.canGoBack
                      ? constants.chatLightColor
                      : isOffHours
                      ? constants.black1
                      : constants.chatMainColor
                }
              : null
          ]}
        >
          {isOffHours ? (
            <SupportOfflineMessage time={currentTime} ctaAction={openDialer} />
          ) : null}
          {chatDetails.feid && !isChatKilled ? (
            <ControlledWebView
              source={{ uri }}
              onNavigationStateChange={this.onNavigationStateChange}
              style={{
                flex: 1
              }}
              webviewRef={e => (this._webView = e)}
              onShouldStartLoadWithRequest={event => {
                /**
                 * Prevent user from navigating away from chat window by opening
                 * external links in custom tab (helps with file downloads)
                 */
                if (event.url) {
                  const isFreshChatIframe = event.url.startsWith(
                    constants.freshChatIframe
                  );
                  const isBlankPageIframe =
                    event.url === constants.freshChatIframeBlankPage;
                  if (isFreshChatIframe || isBlankPageIframe) return true; // the action happened inside iframe let it proceed
                  const params = getUrlParams(event.url); // get query params of the page
                  if (params.webview !== "true") {
                    // check if the page is permitted to render inside webview
                    if (event.url !== uri) {
                      openCustomTab(event.url);
                      return false;
                    }
                  }
                  // the page can load inside the webview
                  return true;
                } else {
                  return false;
                }
              }}
              onMessage={this.webViewMessageCallback}
            />
          ) : null}
          {Platform.OS === "ios" ? (
            <BackButtonIos
              backAction={this.goBack}
              isVisible={this.state.canGoBack}
            />
          ) : null}
        </SafeAreaView>
      );
    } else if (chatScreenError) {
      return (
        <UnableToUseChat
          contactNumber={offlineContact}
          text={constants.onChatFailedToInitialize}
          showAlternatives={true}
        />
      );
    } else if (chatScreenNoInternet) {
      return <UnableToUseChat contactNumber={offlineContact} />;
    } else if (isChatFailed) {
      return (
        <UnableToUseChat
          contactNumber={offlineContact}
          text={constants.onChatFailedToInitialize}
          showAlternatives={true}
        />
      );
    } else {
      const ctaText = conversations.length
        ? `${conversations.length} Message${
            conversations.length > 1 ? "s" : ""
          }`
        : "New Message";
      const ctaAction = conversations.length
        ? this.viewTickets
        : this.contactSupport;
      return (
        <HelpDeskView
          disableTopBar={!conversations.length}
          onRefresh={this.refreshChatInitializationStatus}
          faqSections={faqSections}
          chatActivationMessage={chatActivationMessage}
          navigation={this.props.navigation}
          topBarCta={ctaText}
          topBarCtaAction={ctaAction}
          topBarText={
            conversations.length ? "Your conversations" : chatActivationMessage
          }
          isTitleBold={conversations.length}
        />
      );
    }
  }
}

export default ChatScreen;
