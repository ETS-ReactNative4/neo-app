import { createStackNavigator } from "react-navigation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import Journal from "../Screens/JournalScreen/Journal";
import JournalStart from "../Screens/JournalStartScreen/JournalStart";
import JournalSetup from "../Screens/JournalSetupScreen/JournalSetup";
import JournalDaySelector from "../Screens/JournalDaySelectorScreen/JournalDaySelector";
import JournalImagePicker from "../Screens/JournalImagePickerScreen/JournalImagePicker";
import JournalTextEditor from "../Screens/JournalTextEditorScreen/JournalTextEditor";
import NewItineraryStack from "./NewItineraryStack";
import getActiveRouteName from "../Services/getActiveRouteName/getActiveRouteName";
import JournalPublish from "../Screens/JournalPublishScreen/JournalPublish";

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
    }
  },
  {
    initialRouteName: "JournalHome",
    navigationOptions: {
      gesturesEnabled: true
    },
    transitionConfig
  }
);

JournalStack.navigationOptions = ({ navigation }) => {
  const routeName = getActiveRouteName(navigation.state);
  let tabBarVisible = true;

  if (routeName === "JournalTextEditor") {
    tabBarVisible = false;
  }

  return {
    tabBarVisible
  };
};

export default JournalStack;
