/**
 * This component is based on useKeyboard hook from 'react-native-hooks'
 * However, the hook had some issues - https://github.com/react-native-community/react-native-hooks/pull/55
 *
 * And the keyboard is considered hidden only on 'didHide' but we need the keyboardHeight
 * to go to 0 on 'willHide'. Hence this hook is recreated in this file.
 */

import { useEffect, useState } from "react";
import { Keyboard, KeyboardEventListener, ScreenRect } from "react-native";

export default function useKeyboard() {
  const [shown, setShown] = useState(false);
  const [coordinates, setCoordinates] = useState<{
    start: ScreenRect;
    end: ScreenRect;
  }>({
    start: { screenX: 0, screenY: 0, width: 0, height: 0 },
    end: { screenX: 0, screenY: 0, width: 0, height: 0 }
  });
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const handleKeyboardWillShow: KeyboardEventListener = e => {
    setShown(true);
    setCoordinates({ start: e.startCoordinates, end: e.endCoordinates });
    setKeyboardHeight(e.endCoordinates.height);
  };
  const handleKeyboardDidShow: KeyboardEventListener = e => {
    setShown(true);
    setCoordinates({
      start: e.startCoordinates,
      end: e.endCoordinates
    });
    setKeyboardHeight(e.endCoordinates.height);
  };
  const handleKeyboardWillHide: KeyboardEventListener = e => {
    setShown(false);
    setCoordinates({
      start: e.startCoordinates,
      end: e.endCoordinates
    });
    setKeyboardHeight(0);
  };
  const handleKeyboardDidHide: KeyboardEventListener = e => {
    setShown(false);
    setCoordinates({
      start: e.startCoordinates,
      end: e.endCoordinates
    });
    setKeyboardHeight(0);
  };

  useEffect(() => {
    const keyboardWillShowListener = Keyboard.addListener(
      "keyboardWillShow",
      handleKeyboardWillShow
    );
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      handleKeyboardDidShow
    );
    const keyboardWillHideListener = Keyboard.addListener(
      "keyboardWillHide",
      handleKeyboardWillHide
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      handleKeyboardDidHide
    );

    return () => {
      keyboardWillShowListener.remove();
      keyboardDidShowListener.remove();
      keyboardWillHideListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {
    keyboardShown: shown,
    coordinates,
    keyboardHeight
  };
}
