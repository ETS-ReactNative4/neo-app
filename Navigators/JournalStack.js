import { createStackNavigator } from "react-navigation-stack";
import Journal from "../Screens/JournalScreen/Journal";
import JournalStart from "../Screens/JournalStartScreen/JournalStart";
import JournalSetup from "../Screens/JournalSetupScreen/JournalSetup";
import JournalDaySelector from "../Screens/JournalDaySelectorScreen/JournalDaySelector";
import JournalImagePicker from "../Screens/JournalImagePickerScreen/JournalImagePicker";
import JournalTextEditor from "../Screens/JournalTextEditorScreen/JournalTextEditor";
import NewItineraryStack from "./NewItineraryStack";
import getActiveRouteName from "../Services/getActiveRouteName/getActiveRouteName";
import JournalPublish from "../Screens/JournalPublishScreen/JournalPublish";
import JournalShare from "../Screens/JournalShareScreen/JournalShare";

const JournalStack = createStackNavigator(
  {
    JournalHome: {
      screen: Journal
    },
    JournalStart: {
      screen: JournalStart
    },
    JournalSetup: {
      screen: JournalSetup
    },
    JournalDaySelector: {
      screen: JournalDaySelector
    },
    JournalImagePicker: {
      screen: JournalImagePicker
    },
    JournalTextEditor: {
      screen: JournalTextEditor
    },
    JournalPublish: {
      screen: JournalPublish
    },
    JournalShare: {
      screen: JournalShare
    }
  },
  {
    initialRouteName: "JournalHome",
    defaultNavigationOptions: {
      gesturesEnabled: true
    },
    navigationOptions: ({ navigation }) => {
      const routeName = getActiveRouteName(navigation.state);
      let tabBarVisible = true;

      /**
       * Hide the tab bar in the following screens
       */
      if (
        [
          "JournalTextEditor",
          "JournalImagePicker",
          "JournalDaySelector"
        ].indexOf(routeName) > -1
      ) {
        tabBarVisible = false;
      }

      return {
        tabBarVisible
      };
    }
  }
);

export default JournalStack;
