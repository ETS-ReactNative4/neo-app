import React, { Fragment, ReactElement, memo } from "react";
import { View, StyleSheet, Animated } from "react-native";
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
  interactableRef?: any;
  children?: ReactElement;
  panelStartingPosition?: number;
  onSnap?: (snapDetails: Interactable.ISnapEvent) => any;
}

const ActionSheet = ({
  interactableRef = React.createRef(),
  children,
  panelStartingPosition = responsiveHeight(25),
  onSnap = () => null
}: ActionSheetProps) => {
  const _deltaY = new Value(panelStartingPosition);

  const shadowOpacity = {
    opacity: _deltaY.interpolate({
      inputRange: [0, panelStartingPosition, responsiveHeight(100)],
      outputRange: [0.9, 0.3, 0],
      extrapolate: "clamp"
    })
  };

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
          { y: panelStartingPosition },
          { y: responsiveHeight(100) }
        ]}
        initialPosition={{ y: panelStartingPosition }}
        animatedValueY={_deltaY}
        style={styles.actionSheetContainer}
        onSnap={onSnap}
        animatedNativeDriver={true}
      >
        <Fragment>
          <View style={styles.dragHandle} />
          {children}
        </Fragment>
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
    height: responsiveHeight(200),
    width: responsiveWidth(100),
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

export default memo(ActionSheet, () => true);
