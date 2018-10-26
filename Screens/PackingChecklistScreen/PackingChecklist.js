import React, { Component } from "react";
import { View, Text } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import constants from "../../constants/constants";
import DefaultTabBar from "../../CommonComponents/DefaultTabBar/DefaultTabBar";
import ToPack from "./Components/ToPack/ToPack";
import { responsiveWidth } from "react-native-responsive-dimensions";
import _ from "lodash";
import { inject, observer } from "mobx-react/custom";
import CommonHeader from "../../CommonComponents/CommonHeader/CommonHeader";

@inject("packingChecklistStore")
@inject("itineraries")
@inject("yourBookingsStore")
@observer
class PackingChecklist extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <CommonHeader title={"Packing Checklist"} navigation={navigation} />
      )
    };
  };

  componentDidMount() {
    const { selectPackingChecklist } = this.props.packingChecklistStore;

    selectPackingChecklist(this.props.itineraries.selectedItineraryId);
  }

  render() {
    const {
      checkListItems,
      toggleCheckList,
      addListItem,
      deleteListItem
    } = this.props.packingChecklistStore;

    let isPackedEmpty = true;

    const packedList = checkListItems.map(listItem => {
      return {
        title: listItem.title,
        data: listItem.data.reduce((data, item) => {
          if (item.isComplete) {
            isPackedEmpty = false;
            data.push(item);
          }
          return data;
        }, [])
      };
    });

    return (
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <ScrollableTabView
          tabBarActiveTextColor={constants.black2}
          tabBarInactiveTextColor={constants.firstColor}
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: constants.black2
          }}
          tabBarTextStyle={{
            ...constants.font13(constants.primaryLight),
            letterSpacing: 2
          }}
          initialPage={0}
          style={{ alignSelf: "center", width: responsiveWidth(100) }}
          prerenderingSiblingsNumber={Infinity}
          locked={true}
          renderTabBar={() => <DefaultTabBar />}
        >
          <ToPack
            listItems={checkListItems}
            toggleCheckListStatus={toggleCheckList}
            tabLabel="TO PACK"
            addListItem={addListItem}
            deleteListItem={deleteListItem}
            navigation={this.props.navigation}
            enableKeyboardListener={true}
            isPackedEmpty={false}
          />
          <ToPack
            listItems={packedList}
            toggleCheckListStatus={toggleCheckList}
            tabLabel="PACKED"
            addListItem={addListItem}
            deleteListItem={deleteListItem}
            navigation={this.props.navigation}
            isPackedEmpty={isPackedEmpty}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

export default PackingChecklist;
