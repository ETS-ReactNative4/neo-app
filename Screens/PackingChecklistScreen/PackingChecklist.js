import React, { Component } from "react";
import { View, Text } from "react-native";
import ScrollableTabView from "react-native-scrollable-tab-view";
import constants from "../../constants/constants";
import DefaultTabBar from "../../CommonComponents/DefaultTabBar/DefaultTabBar";
import ToPack from "./Components/ToPack/ToPack";
import { responsiveWidth } from "react-native-responsive-dimensions";
import _ from "lodash";
import { inject, observer } from "mobx-react/custom";

@inject("packingChecklistStore")
@inject("itineraries")
@inject("yourBookingsStore")
@observer
class PackingChecklist extends Component {
  static navigationOptions = {
    title: "Packing Checklist"
  };

  state = {
    listItems: [
      {
        title: "Clothing",
        data: [
          {
            id: 0,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Clothing"
          },
          {
            id: 1,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Clothing"
          },
          {
            id: 2,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Clothing"
          },
          {
            id: 3,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Clothing"
          },
          {
            id: 4,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Clothing"
          },
          {
            id: 5,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Clothing"
          },
          {
            id: 6,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Clothing"
          }
        ]
      },
      {
        title: "Travel",
        data: [
          {
            id: 0,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Travel"
          },
          {
            id: 1,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Travel"
          },
          {
            id: 2,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Travel"
          },
          {
            id: 3,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Travel"
          },
          {
            id: 4,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Travel"
          },
          {
            id: 5,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Travel"
          },
          {
            id: 6,
            item: "Light weight Clothing",
            isComplete: false,
            type: "Travel"
          }
        ]
      },
      {
        title: constants.customCheckListName,
        data: [
          {
            id: 0,
            item: "Light weight Clothing",
            isComplete: false,
            type: constants.customCheckListName
          },
          {
            id: 1,
            item: "Light weight Clothing",
            isComplete: false,
            type: constants.customCheckListName
          },
          {
            id: 2,
            item: "Light weight Clothing",
            isComplete: false,
            type: constants.customCheckListName
          },
          {
            id: 3,
            item: "Light weight Clothing",
            isComplete: false,
            type: constants.customCheckListName
          },
          {
            id: 4,
            item: "Light weight Clothing",
            isComplete: false,
            type: constants.customCheckListName
          },
          {
            id: 5,
            item: "Light weight Clothing",
            isComplete: false,
            type: constants.customCheckListName
          },
          {
            id: 6,
            item: "Light weight Clothing",
            isComplete: false,
            type: constants.customCheckListName
          },
          {
            id: 7,
            item: "Light weight Clothing",
            isComplete: false,
            type: "user-input"
          }
        ]
      }
    ]
  };

  componentDidMount() {
    this.props.packingChecklistStore.getPackingChecklist(
      this.props.itineraries.selectedItineraryId
    );
  }

  toggleCheckListStatus = item => {
    const newListItems = this.state.listItems.map(listItem => {
      return {
        title: listItem.title,
        data: listItem.data.map(currentItem => {
          if (currentItem.id === item.id && currentItem.type === item.type) {
            return {
              ...currentItem,
              isComplete: !currentItem.isComplete
            };
          } else return currentItem;
        })
      };
    });

    this.setState({
      listItems: newListItems
    });
  };

  render() {
    const {
      checkListItems,
      toggleCheckList,
      addListItem,
      deleteListItem
    } = this.props.packingChecklistStore;

    const packedList = checkListItems.map(listItem => {
      return {
        title: listItem.title,
        data: listItem.data.reduce((data, item) => {
          if (item.isComplete) {
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
          />
          <ToPack
            listItems={packedList}
            toggleCheckListStatus={toggleCheckList}
            tabLabel="PACKED"
            addListItem={addListItem}
            deleteListItem={deleteListItem}
          />
        </ScrollableTabView>
      </View>
    );
  }
}

export default PackingChecklist;
