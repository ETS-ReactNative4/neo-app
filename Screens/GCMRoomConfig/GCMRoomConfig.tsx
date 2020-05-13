import React, { useState } from "react";
import { StyleSheet, View, ScrollView, LayoutAnimation } from "react-native";
import GCMViewer from "../GCMFormScreen/Components/GCMViewer";
import { AppNavigatorProps } from "../../NavigatorsV2/AppNavigator";
import { SCREEN_GCM_ROOM_CONFIG } from "../../NavigatorsV2/ScreenNames";
import {
  IHotelGuestRoomConfig,
  HotelGuestRoomChildAgesType
} from "../GCMScreen/hooks/useGCMForm";
import HighlightText from "../ItineraryScreen/Components/HighlightText";
import {
  CONSTANT_seventeenthColor,
  CONSTANT_twentySeventhColor
} from "../../constants/colorPallete";
import RoomButton from "./Components/RoomButton";
import GuestNumberCounter from "./Components/GuestNumberCounter";
import ChildAgesPicker from "./Components/ChildAgesPicker";
import BottomButtonBar from "../../CommonComponents/BottomButtonBar/BottomButtonBar";

type GCMRoomConfigNavType = AppNavigatorProps<typeof SCREEN_GCM_ROOM_CONFIG>;

export interface IGCMRoomConfigPros extends GCMRoomConfigNavType {}

const GCMRoomConfig = ({ navigation, route }: IGCMRoomConfigPros) => {
  const {
    title = "",
    roomConfig: defaultRoomConfig = [],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSelect = (selected: IHotelGuestRoomConfig[]) => null,
    bannerImage = "https://pickyourtrail-guides-images.imgix.net/misc/hungary.jpeg"
  } = route.params || {};

  const goBack = () => navigation.goBack();

  const [roomConfig, setRoomConfig] = useState<IHotelGuestRoomConfig[]>(
    defaultRoomConfig.length
      ? defaultRoomConfig
      : [
          {
            adultCount: 1,
            childAges: []
          }
        ]
  );

  const [selectedRoomButton, setSelectedRoomButton] = useState<number>(0);

  const selectRoomButton = (buttonIndex: number) =>
    setSelectedRoomButton(buttonIndex);

  const deleteRoom = (buttonIndex: number) => {
    const newRoomList = roomConfig.filter(
      (config, configIndex) => buttonIndex !== configIndex
    );
    setRoomConfig(newRoomList);
    if (selectedRoomButton >= newRoomList.length) {
      setSelectedRoomButton(newRoomList.length - 1);
    }
  };

  const addRoom = () =>
    setRoomConfig([...roomConfig, { adultCount: 1, childAges: [] }]);

  const selectedAdultCount = roomConfig[selectedRoomButton].adultCount;

  const selectedChildAges = roomConfig[selectedRoomButton].childAges;
  const selectedChildAgesCount = selectedChildAges.length;

  const addAdultRoomCount = () => {
    setRoomConfig(
      roomConfig.map((room, roomIndex) => {
        if (roomIndex === selectedRoomButton) {
          return {
            ...room,
            adultCount:
              room.adultCount + room.childAges.length < 6
                ? room.adultCount + 1
                : room.adultCount
          };
        }
        return room;
      })
    );
  };

  const subAdultRoomCount = () => {
    setRoomConfig(
      roomConfig.map((room, roomIndex) => {
        if (roomIndex === selectedRoomButton) {
          return {
            ...room,
            adultCount: room.adultCount > 1 ? room.adultCount - 1 : 1
          };
        }
        return room;
      })
    );
  };

  const addChildRoomCount = () => {
    setRoomConfig(
      roomConfig.map((room, roomIndex) => {
        if (roomIndex === selectedRoomButton) {
          return {
            ...room,
            childAges:
              room.adultCount + room.childAges.length < 6
                ? [...room.childAges, "1 year"]
                : room.childAges
          };
        }
        return room;
      })
    );
  };

  const subChildRoomCount = () => {
    setRoomConfig(
      roomConfig.map((room, roomIndex) => {
        if (roomIndex === selectedRoomButton) {
          return {
            ...room,
            childAges:
              room.childAges.length > 0
                ? room.childAges.filter(
                    (element, index) => index < room.childAges.length - 1
                  )
                : room.childAges
          };
        }
        return room;
      })
    );
  };

  const changeChildAge = (
    newAge: HotelGuestRoomChildAgesType,
    ageIndex: number
  ) => {
    setRoomConfig(
      roomConfig.map((room, roomIndex) => {
        if (roomIndex === selectedRoomButton) {
          return {
            ...room,
            childAges: room.childAges.map((childAge, childAgeIndex) => {
              if (ageIndex === childAgeIndex) {
                return newAge;
              }
              return childAge;
            })
          };
        }
        return room;
      })
    );
  };

  const saveRoomDetails = () => {
    onSelect(roomConfig);
    goBack();
  };

  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

  return (
    <GCMViewer bannerImage={bannerImage} backAction={goBack} title={title}>
      <HighlightText
        textColor={CONSTANT_seventeenthColor}
        textBackgroundColor={CONSTANT_twentySeventhColor}
        containerStyle={styles.highlightText}
        titleText={"You can’t add more than 6 people in a room"}
      />
      <ScrollView>
        <View style={styles.roomButtonWrapper}>
          {roomConfig.map((room, roomIndex) => {
            const onButtonClick = () => selectRoomButton(roomIndex);

            const onDeleteClick = () => deleteRoom(roomIndex);

            return (
              <RoomButton
                isSelected={
                  roomConfig.length === 1
                    ? false
                    : selectedRoomButton === roomIndex
                }
                key={roomIndex}
                text={`Room ${roomIndex + 1}`}
                clickAction={onButtonClick}
                deleteAction={onDeleteClick}
              />
            );
          })}
          <RoomButton text={`+ Add new room`} clickAction={addRoom} />
        </View>
        <GuestNumberCounter
          addAction={addAdultRoomCount}
          subAction={subAdultRoomCount}
          counterText={`${selectedAdultCount} Adult${
            selectedAdultCount > 1 ? "s" : ""
          }`}
        />
        <GuestNumberCounter
          addAction={addChildRoomCount}
          subAction={subChildRoomCount}
          counterText={`${selectedChildAgesCount} Child${
            selectedChildAgesCount > 1 ? "ren" : ""
          }`}
        />
        <View style={styles.childAgesWrapper}>
          {selectedChildAges.map((age, ageIndex) => {
            const onAgeChange = (newAge: HotelGuestRoomChildAgesType) =>
              changeChildAge(newAge, ageIndex);
            return (
              <ChildAgesPicker
                selectedAge={age}
                key={ageIndex}
                onChange={onAgeChange}
              />
            );
          })}
        </View>
      </ScrollView>
      <BottomButtonBar
        disableLeftButton
        rightButtonName={"Save room details"}
        rightButtonAction={saveRoomDetails}
      />
    </GCMViewer>
  );
};

const styles = StyleSheet.create({
  highlightText: {
    justifyContent: "center"
  },
  roomButtonWrapper: {
    paddingHorizontal: 24,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  childAgesWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    flexWrap: "wrap"
  }
});

export default GCMRoomConfig;
