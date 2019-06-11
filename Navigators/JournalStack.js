import { createStackNavigator } from "react-navigation";
import transitionConfig from "../Services/navigationAnimations/transitionConfig";
import Journal from "../Screens/JournalScreen/Journal";
import JournalStart from "../Screens/JournalStartScreen/JournalStart";
import JournalSetup from "../Screens/JournalSetupScreen/JournalSetup";
import JournalDaySelector from "../Screens/JournalDaySelectorScreen/JournalDaySelector";
import JournalImagePicker from "../Screens/JournalImagePickerScreen/JournalImagePicker";
import JournalTextEditor from "../Screens/JournalTextEditorScreen/JournalTextEditor";

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

export default JournalStack;
