import React, {useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  UIManager,
  Platform,
  Keyboard,
} from 'react-native';
import {Box} from '@pyt/micros';
import {CONSTANT_white} from '../../constants/colorPallete';
import {observer, inject} from 'mobx-react';
import User from '../../mobx/User';
import {PlatoProvider} from './Context/Plato';
import Footer from './Components/Plato/Footer';
import Content from './Components/Plato/Content';
import {useNavigation, useRoute} from '@react-navigation/native';
import PrimaryHeader from '../../NavigatorsV2/Components/PrimaryHeader';
import useTicketSubtypeApi from './hooks/useTicketSubtypeApi';
import {SCREEN_SUPPORT_TAB} from '../../NavigatorsV2/ScreenNames';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export interface ChatScreenProps {
  userStore: User;
}

const PlatoChat = ({userStore}: ChatScreenProps) => {
  const navigation = useNavigation();
  const route = useRoute();
  //@ts-ignore
  const {ticket_id} = route.params;

  const [{successResponseData}, getSubtype] = useTicketSubtypeApi();

  useEffect(() => {
    navigation.setOptions({
      header: () => {
        const backAction = () => {
          Keyboard.dismiss();
          if (navigation.canGoBack()) {
            navigation.goBack();
          } else {
            navigation.navigate(SCREEN_SUPPORT_TAB);
          }
        };
        return PrimaryHeader({
          leftAction: backAction,
          headerText: `Customer Support ${
            ticket_id ? '(Ticket no: ' + ticket_id + ')' : ''
          }`,
        });
      },
    });
  }, [navigation, ticket_id]);

  useEffect(() => {
    getSubtype({});
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PlatoProvider
        userStore={userStore}
        ticketTypes={successResponseData?.data?.task_sub_types}>
        <Box flex={1}>
          <Content />
          <Footer />
        </Box>
      </PlatoProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CONSTANT_white,
    justifyContent: 'space-between',
  },
  drawerBackgroundImage: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    height: 482,
    width: 360,
    opacity: 0.5,
  },
});

export default inject('userStore')(observer(PlatoChat));
