import { Easing, Animated } from "react-native";
import storeService from "../storeService/storeService";

const transitionConfig = () => {
  return {
    transitionSpec: {
      duration: 600,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
      useNativeDriver: true
    },
    screenInterpolator: sceneProps => {
      const { position, layout, scene, index, scenes } = sceneProps;
      const toIndex = index;
      const thisSceneIndex = scene.index;
      const height = layout.initHeight;
      const width = layout.initWidth;

      /**
       * Notify MobX about active screens
       */
      storeService.appState.setActiveScenes(scenes);

      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [width, 0, 0]
      });

      const translateY = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [height, 0, 0]
      });

      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex - 0.5, thisSceneIndex],
        outputRange: [0, 1, 1]
      });

      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      });

      const slideFromRight = { transform: [{ translateX }] };
      const slideFromBottom = { transform: [{ translateY }] };
      const opacityTransition = { opacity };
      const scaleWithOpacity = {
        opacity,
        transform: [{ scaleX: scale }, { scaleY: scale }]
      };

      const currentScene = scenes[scenes.length - 1];
      switch (currentScene.route.routeName) {
        case "Starter":
          return scaleWithOpacity;

        case "YourBookings":
          return slideFromBottom;

        case "PassVoucher":
          return slideFromBottom;

        case "TransferVoucher":
          return slideFromBottom;

        case "ActivityVoucher":
          return slideFromBottom;

        case "HotelVoucher":
          return slideFromBottom;

        case "FlightVoucher":
          return slideFromBottom;

        default:
          return slideFromRight;
      }
    }
  };
};

export default transitionConfig;
