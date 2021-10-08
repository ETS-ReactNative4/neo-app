import React, {useContext, useEffect, useState} from 'react';
import {Box} from '@pyt/micros';
import {Image, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {theme} from '../../../../constants/colorPallete';
import {PlatoContext} from '../../Context/Plato';
import {CONSTANT_PlatoChatSendIcon} from '../../../../constants/imageAssets';
import {
  CONSTANT_fontCustom,
  CONSTANT_primaryRegular,
} from '../../../../constants/fonts';

const Footer = () => {
  const {message, setMessage, sendMessage, inputDisabled} = useContext(
    PlatoContext,
  );
  const [keyboardActive, setKeyboardActive] = useState<boolean>(false);

  useEffect(() => {
    setKeyboardActive(message !== '');
  }, [message, setKeyboardActive]);

  if (inputDisabled) {
    return null;
  }

  return (
    <Box
      flexDirection="row"
      width={'92%'}
      alignSelf="center"
      marginBottom={10}
      borderRadius={68}
      padding={6}
      borderColor={theme.colors.neutral003}
      borderWidth={1}
      backgroundColor={theme.colors.neutral002}>
      <TextInput
        value={message}
        placeholder="Type your message"
        style={styles.input}
        underlineColorAndroid="transparent"
        onChangeText={setMessage}
      />
      <TouchableOpacity
        style={[
          styles.sendButton,
          {
            backgroundColor: keyboardActive
              ? theme.colors.primary002
              : theme.colors.neutral003,
          },
        ]}
        onPress={() => sendMessage(message)}>
        <Image source={CONSTANT_PlatoChatSendIcon} style={styles.imageStyle} />
      </TouchableOpacity>
    </Box>
  );
};

export default Footer;

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 15,
    ...CONSTANT_fontCustom(CONSTANT_primaryRegular, 15),
    lineHeight: 19,
    flex: 1,
  },
  imageStyle: {
    width: 20,
    height: 20,
  },
  sendButton: {
    alignSelf: 'center',
    borderRadius: 99,
    padding: 15,
  },
});
