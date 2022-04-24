import React, {useState} from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, View} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {
  CONSTANT_fontCustom,
  CONSTANT_primarySemiBold,
  CONSTANT_primaryLight,
} from '../../constants/fonts';
import {
  CONSTANT_firstColor,
  CONSTANT_firstColorAlpha,
  CONSTANT_shade2,
  CONSTANT_shade1,
} from '../../constants/colorPallete';
import constants from '../../constants/constants';
import SimpleButton from '../../CommonComponents/SimpleButton/SimpleButton';
import apiCall from '../../Services/networkRequests/apiCall';
import {SCREEN_PRETRIP_HOME_TABS} from '../../NavigatorsV2/ScreenNames';

const findBookingButtonStyle = {width: 200, height: 48};

const Starter = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const getSales = () => {
    const requestObject = {
      username,
      password,
    };
    console.log('test', requestObject);
    try {
      apiCall(constants.login, requestObject, 'POST')
        .then(response => {
          alert('login success');
          navigation.navigate(SCREEN_PRETRIP_HOME_TABS);
        })
        .catch(res => {
          alert('Please Enter valid credentials');
        });
      return '';
    } catch (e) {
      console.log('error occured');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text>Checking</Text>
      <View style={styles.contentSection}>
        <View style={styles.buttonRow}>
          <Text style={styles.titleLogo}>PLATO</Text>
          <TextInput
            placeholder="Username"
            placeholderTextColor="#bbb"
            style={styles.inputField}
            value={username}
            onChangeText={text => setUsername(text)}></TextInput>
          <TextInput
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor="#bbb"
            style={styles.inputField}
            value={password}
            onChangeText={text => setPassword(text)}></TextInput>
          <SimpleButton
            text={'Login'}
            textColor={'white'}
            textStyle={{
              ...CONSTANT_fontCustom(CONSTANT_primarySemiBold, 18),
            }}
            color={CONSTANT_firstColor}
            underlayColor={CONSTANT_firstColorAlpha(0.7)}
            action={() => {
              getSales();
              // recordEvent(CONSTANT_StarterScreen.event, {
              //   click: CONSTANT_StarterScreen.click.planVacation,
              // });
              return null;
            }}
            containerStyle={findBookingButtonStyle}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  titleLogo: {
    textAlignVertical: 'center',
    color: '#4FB58E',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 15,
  },
  container: {
    flex: 1,
    backgroundColor: '#222232',
  },
  contentSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  logoRow: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logo: {
    height: 62,
    width: 200,
  },
  buttonRow: {
    width: responsiveWidth(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    ...CONSTANT_fontCustom(CONSTANT_primaryLight, 13),
    color: CONSTANT_shade1,
    textAlignVertical: 'center',
  },

  hyperlink: {
    textDecorationLine: 'underline',
  },
  inputField: {
    borderColor: '#6FCF97',
    borderStyle: 'solid',
    borderWidth: 1,
    height: 40,
    width: 200,
    marginBottom: 20,
    borderRadius: 5,
    color: '#bbb',
    paddingLeft: 10,
  },
});

export default Starter;
