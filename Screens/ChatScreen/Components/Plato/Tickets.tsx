import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {Box, Text} from '@pyt/micros';
import Icon from '../../../../CommonComponents/Icon/Icon';
import {theme} from '../../../../constants/colorPallete';
import constants from '../../../../constants/constants';
import faqIconMap from '../../../../Services/faqIconMap/faqIconMap';
import {CONSTANT_fontPrimarySemiBold} from '../../../../constants/fonts';
import usePlatoTicketsApi, {TaskType} from '../../hooks/usePlatoTicketsApi';
import useTicketSubtypeApi from '../../hooks/useTicketSubtypeApi';
import {SCREEN_PLATO_CHAT} from '../../../../NavigatorsV2/ScreenNames';
import SimpleButton from '../../../../CommonComponents/SimpleButton/SimpleButton';

const iconMap = {
  Visa: '100',
  Payment: '101',
  Voucher: '102',
  'Itinerary modification': '103',
  App: '104',
  Others: '105',
};

const Tickets = ({itineraryId}: {itineraryId: string}) => {
  const navigation = useNavigation();
  const [tickets, setTickets] = useState<TaskType[]>([]);
  const iconMapRef = useRef<{
    [key: string]: string;
  }>({});
  const [
    {successResponseData},
    getTickets,
  ] = usePlatoTicketsApi();

  const [
    {successResponseData: subtypeData},
    getSubtype,
  ] = useTicketSubtypeApi();

  useEffect(() => {
    getSubtype({});
    getTickets(itineraryId);
  }, [itineraryId]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getTickets(itineraryId);
    });
    return unsubscribe;
  }, [navigation, itineraryId]);

  useEffect(() => {
    const trail_tasks = successResponseData?.data?.trail_tasks;

    if (trail_tasks !== undefined && trail_tasks.length !== 0) {
      setTickets(trail_tasks);
    }
  }, [successResponseData, setTickets]);

  if (tickets.length === 0) {
    return null;
  }

  const task_sub_types = subtypeData?.data?.task_sub_types;

  task_sub_types?.forEach(type => {
    iconMapRef.current[type.id] = type.description;
  });

  return (
    <View style={styles.helpDeskCategoriesContainer}>
      <Box
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        marginBottom={16}>
        <Text style={styles.categoryTitleText}>Support tickets</Text>
        <SimpleButton
          text={'Send message'}
          textColor={constants.firstColor}
          icon={constants.arrowRight}
          color={'transparent'}
          containerStyle={styles.messageBtn}
          iconSize={12}
          rightIcon={true}
          underlayColor={'transparent'}
          action={() => {
            navigation.navigate('PlatoChat', {
              type: 'Other',
              itineraryId: itineraryId,
            });
            return null;
          }}
        />
      </Box>
      <View style={styles.categoryWrapper}>
        {tickets.map((task, index) => {
          return (
            <TouchableOpacity
              key={task.id}
              onPress={() => {
                navigation.navigate(SCREEN_PLATO_CHAT, {
                  ticket_id: task.id,
                  source: 'list',
                  itineraryId,
                });
              }}
              style={styles.helpSectionTileContainer}>
              <View style={styles.leftIconContainer}>
                <Icon
                  size={20}
                  color={constants.shade2}
                  name={
                    //@ts-ignore
                    faqIconMap[
                      //@ts-ignore
                      iconMap[iconMapRef.current[task.sub_type_id]] || '105'
                    ]
                  }
                />
              </View>
              <View style={styles.textSectionContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.titleText}>
                  {`${iconMapRef.current[task.sub_type_id] ||
                    ''}: ${decodeURIComponent(task.title)}`}
                </Text>
                <Text style={styles.ticketText}>Ticket no: {task.id}</Text>
              </View>
              {task.status_id === 2 ? (
                <Box
                  marginRight={10}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center">
                  <View style={styles.rightIconContainer}>
                    <Icon
                      size={20}
                      color={theme.colors.primary002}
                      name={'tick-mark'}
                    />
                  </View>
                  <Text
                    fontFamily={CONSTANT_fontPrimarySemiBold}
                    fontSize={12}
                    lineHeight={16}
                    marginTop={5}
                    color={theme.colors.primary002}>
                    CLOSED
                  </Text>
                </Box>
              ) : task.customer_have_new_message ? (
                <Box
                  marginHorizontal={10}
                  width={70}
                  justifyContent="center"
                  alignItems="center">
                  <Text
                    fontFamily={CONSTANT_fontPrimarySemiBold}
                    fontSize={12}
                    lineHeight={16}
                    marginTop={5}
                    borderRadius={36}
                    paddingHorizontal={12}
                    paddingVertical={4}
                    backgroundColor={theme.colors.primary006}
                    color={theme.colors.primary002}>
                    New
                  </Text>
                </Box>
              ) : (
                <Box
                  marginRight={10}
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center">
                  <View style={styles.rightIconContainer}>
                    <Icon
                      size={20}
                      color={theme.colors.neutral001}
                      name={'tick-mark'}
                    />
                  </View>
                </Box>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryTitleText: {
    ...constants.fontCustom(constants.primaryRegular, 12),
    color: constants.shade1,
  },
  helpDeskCategoriesContainer: {
    margin: 16,
  },
  messageBtn: {
    padding: 0,
    margin: 0,
    height: 20,
  },
  categoryWrapper: {
    borderColor: constants.shade4,
    borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: constants.white1,
    ...constants.elevationFive,
    width: responsiveWidth(100) - 32,
    alignSelf: 'center',
  },
  helpSectionTileMargin: {
    marginVertical: 1,
  },
  helpSectionTileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
    backgroundColor: 'white',
    borderBottomColor: constants.shade4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 15,
    marginVertical: 0.25,
  },
  leftIconContainer: {
    height: 20,
    width: 20,
    marginLeft: 24,
  },
  textSectionContainer: {
    flex: 1,
    marginLeft: 24,
  },
  titleText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: constants.black1,
    marginTop: 4,
  },
  ticketText: {
    ...constants.fontCustom(constants.primaryRegular, 14),
    color: theme.colors.neutral004,
    marginTop: 4,
  },
  rightIconContainer: {
    height: 20,
    width: 20,
    marginHorizontal: 24,
  },
});
export default Tickets;
