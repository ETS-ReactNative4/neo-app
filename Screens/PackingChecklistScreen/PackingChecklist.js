import React, {
  Component,
} from 'react';
import {
  View,
  Text,
} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import constants from "../../constants/constants";
import {
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DefaultTabBar from "../../CommonComponents/DefaultTabBar/DefaultTabBar";
import ToPack from "./Components/ToPack";

class PackingChecklist extends Component {

  static navigationOptions = {
    title: 'Packing Checklist',
  };

  state = {
    listItems: [
      {
        id: 0,
        item: 'Light weight Clothing',
        isComplete: false,
      },
      {
        id: 1,
        item: 'Light weight Clothing',
        isComplete: false,
      },
      {
        id: 2,
        item: 'Light weight Clothing',
        isComplete: false,
      },
      {
        id: 3,
        item: 'Light weight Clothing',
        isComplete: false,
      },
      {
        id: 4,
        item: 'Light weight Clothing',
        isComplete: false,
      },
      {
        id: 5,
        item: 'Light weight Clothing',
        isComplete: false,
      },
      {
        id: 6,
        item: 'Light weight Clothing',
        isComplete: false,
      },
    ],
  };

  render() {
    return(
      <ScrollableTabView
        tabBarActiveTextColor={constants.black2}
        tabBarInactiveTextColor={constants.firstColor}
        tabBarUnderlineStyle={{height: 2, backgroundColor: constants.black2}}
        tabBarTextStyle={{...constants.font13(constants.primaryLight)}}
        initialPage={0}
        style={{alignSelf: 'center'}}
        prerenderingSiblingsNumber={Infinity}
        renderTabBar={() => <DefaultTabBar />}
        >
        <ToPack listItems={this.state.listItems} tabLabel="To Pack" />
        <View tabLabel="Packed" />
      </ScrollableTabView>
    )
  }
}

export default PackingChecklist;
