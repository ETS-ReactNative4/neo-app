import React, { Fragment, ReactElement, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Keyboard,
  KeyboardEventListener
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth
  // @ts-ignore
} from "react-native-responsive-dimensions";
import Interactable from "react-native-interactable";
import { CONSTANT_shade4 } from "../../constants/colorPallete";

const { createAnimatedComponent, Value } = Animated;
const AnimatedView = createAnimatedComponent(View);
const { View: InteractableView } = Interactable;

export interface ActionSheetProps {
  interactableRef: any;
  children?: ReactElement;
  panelViewablePosition?: number;
  panelStartingPosition?: number;
  onSnap?: (snapDetails: Interactable.ISnapEvent) => any;
}

export enum ISnapPointsEnum {
  "maximized",
  "open",
  "minimized"
}

const ActionSheet = ({
  interactableRef = React.createRef(),
  children,
  panelViewablePosition = responsiveHeight(25),
  onSnap = () => null,
  panelStartingPosition = responsiveHeight(100)
}: ActionSheetProps) => {
  const [_deltaY] = useState(new Value(panelStartingPosition));
  const [snapPosition, setSnapPosition] = useState<ISnapPointsEnum>(2);

  const shadowOpacity = {
    opacity: _deltaY.interpolate({
      inputRange: [0, panelViewablePosition, responsiveHeight(100)],
      outputRange: [0.9, 0.3, 0],
      extrapolate: "clamp"
    })
  };

  const onSnapView = (snapDetails: Interactable.ISnapEvent) => {
    setSnapPosition(snapDetails.nativeEvent.index);
    onSnap(snapDetails);
  };

  useEffect(() => {
    /**
     * Snap Position checked to ensure no autosnapping to screen when
     * the sheet is minimized!
     */
    const keyboardAppeared: KeyboardEventListener = () => {
      if (snapPosition < 2) {
        interactableRef?.current?.snapTo({ index: 0 });
      }
    };

    const keyboardHidden: KeyboardEventListener = () => {
      if (snapPosition < 2) {
        interactableRef?.current?.snapTo({ index: 1 });
      }
    };

    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      keyboardAppeared
    );
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      keyboardAppeared
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      keyboardHidden
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      keyboardHidden
    );
    return () => {
      keyboardWillShowListener.remove();
      keyboardDidShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidHideListener.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapPosition]);

  return (
    <Fragment>
      <AnimatedView
        pointerEvents={"box-none"}
        style={[styles.interactablePanelShadow, shadowOpacity]}
      />
      <InteractableView
        ref={interactableRef}
        verticalOnly={true}
        snapPoints={[
          { y: 0 },
          { y: panelViewablePosition },
          { y: responsiveHeight(100) + 100 }
        ]}
        initialPosition={{ y: panelStartingPosition }}
        animatedValueY={_deltaY}
        style={styles.actionSheetContainer}
        onSnap={onSnapView}
        animatedNativeDriver={true}
      >
        <View style={styles.actionSheetContentWrapper}>
          <Fragment>
            <View style={styles.dragHandle} />
            {children}
          </Fragment>
        </View>
      </InteractableView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flex: 1
  },
  interactablePanelShadow: {
    position: "absolute",
    height: responsiveHeight(100),
    width: responsiveWidth(100),
    backgroundColor: "black"
  },
  actionSheetContainer: {
    position: "absolute",
    backgroundColor: "transparent",
    height: responsiveHeight(200),
    width: responsiveWidth(100),
    borderRadius: 30,
    overflow: "hidden"
  },
  /**
   * Content Wrapper needed due to an issue with interactable
   * https://github.com/wix/react-native-interactable/issues/138
   */
  actionSheetContentWrapper: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 30
  },
  dragHandle: {
    height: 8,
    width: 40,
    borderRadius: 3,
    backgroundColor: CONSTANT_shade4,
    alignSelf: "center",
    marginTop: 16
  }
});

export default ActionSheet;
