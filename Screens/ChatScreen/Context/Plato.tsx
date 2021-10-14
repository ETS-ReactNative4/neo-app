import React, {
  ReactNode,
  createContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import {logError} from '../../../Services/errorLogger/errorLogger';
import User from '../../../mobx/User';
import {useRoute} from '@react-navigation/native';
import {
  createTicket,
  replyTicket,
  closeTicket,
  getTicketConversations,
} from '../../../Services/plato/platoServices';
import moment from 'moment';

export type ChatMessageType = {
  id: number;
  bot: boolean;
  type: string;
  message?: string;
  date?: string;
  options?: {
    title: string;
    id: number;
  }[];
  action?: (value: string, id: number, index: string) => any;
  animationDelay?: number;
  source?: string;
};

type ContextProp = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: SendMessageType;
  messages: ChatMessageType[];
  hiddenMessages: string[];
  hideMessage: React.Dispatch<React.SetStateAction<string[]>>;
  pushMessage: (
    message: Omit<ChatMessageType, 'id' | 'animationDelay'>,
  ) => void;
  userStore: User;
  inputDisabled: boolean;
};

type SendMessageType = (
  message: string,
  hidden?: boolean,
  isBot?: boolean,
) => Promise<void>;

export const PlatoContext = createContext<ContextProp>({} as ContextProp);

type Props = {
  children: ReactNode;
  userStore: User;
  ticketTypes:
    | {
        id: number;
        display_name: string;
        description: string;
        task_type_id: string;
      }[]
    | undefined;
};

const animationDelay = 500;

const typeMap: {
  [key: string]: string;
} = {
  'Visa Related': 'Visa',
  'Payment Related': 'Payment',
  'Voucher Related': 'Voucher',
  'Itinerary Modification': 'Itinerary modification',
  'Itinerary Modifications': 'Itinerary modification',
  'App Related': 'App',
  Others: 'Others',
};

export const PlatoProvider = ({userStore, ticketTypes, children}: Props) => {
  const route = useRoute();
  //@ts-ignore
  const {type, itineraryId, ticket_id} = route.params;

  const [ticketId, setTicketId] = useState<number>(ticket_id || 0);
  const selectedType = useRef<number>(0);
  const platoState = useRef<'INIT' | 'NEW' | 'EXISITING' | 'CREATED'>(
    ticket_id ? 'EXISITING' : 'INIT',
  );
  const [message, setMessage] = useState<string>('');
  const [hiddenMessages, hideMessage] = useState<string[]>([]);
  const [messages, updateMessage] = useState<ChatMessageType[]>([]);
  const animationDelayIndex = useRef<number>(0);
  const [inputDisabled, disableInput] = useState<boolean>(false);

  const pushMessage = useCallback(
    (msg: Omit<ChatMessageType, 'id' | 'animationDelay'>) => {
      updateMessage(currentMessages => {
        const lastMessage = currentMessages[currentMessages.length - 1];

        if (lastMessage && lastMessage.type === 'bubble') {
          hideMessage(state => {
            return [...state, `chat_item_${lastMessage.id}`];
          });
        }

        return [
          ...currentMessages,
          {
            ...msg,
            id: currentMessages.length,
            animationDelay:
              msg.type !== 'bubble' || msg.source !== 'list'
                ? animationDelayIndex.current++ * animationDelay
                : 0,
          },
        ];
      });
    },
    [animationDelayIndex, updateMessage, hideMessage],
  );

  const addClosButton = useCallback(() => {
    pushMessage({
      type: 'chips',
      options: [
        {
          title: 'Close this ticket',
          id: 1,
        },
      ],
      bot: true,
      source: 'list',
      action: async (_value: string, _id: number, index) => {
        hideMessage(state => [...state, index]);

        pushMessage({
          type: 'bubble',
          message: '',
          bot: true,
        });

        await closeTicket(ticketId);

        disableInput(true);

        pushMessage({
          type: 'text',
          message: `This ticket (id: ${ticketId}) is closed. Please raise a new ticket by clicking on “Send Message” from the previous screen.`,
          bot: true,
        });
      },
    });
  }, [pushMessage, disableInput, hideMessage, ticketId]);

  const sendMessage: SendMessageType = useCallback(
    async (
      receviedMsg: string,
      hidden: boolean = false,
      isBot: boolean = false,
    ) => {
      if (receviedMsg !== '') {
        try {
          animationDelayIndex.current = 0;
          if (!hidden) {
            pushMessage({
              type: 'text',
              message: receviedMsg,
              date: moment().format(),
              bot: isBot,
            });

            setMessage('');
          }

          if (platoState.current === 'NEW') {
            pushMessage({
              type: 'bubble',
              message: '',
              bot: true,
            });

            const response = await createTicket(
              receviedMsg,
              itineraryId,
              selectedType.current,
            );

            platoState.current = 'CREATED';

            setTicketId(response.data.trail_task.id);

            pushMessage({
              type: 'text',
              message: `Sure ${userStore.userDisplayDetails.name}. Noted on your request. We will get back to you shortly.`,
              bot: true,
            });
          } else if (
            platoState.current === 'EXISITING' ||
            platoState.current === 'CREATED'
          ) {
            pushMessage({
              type: 'bubble',
              message: '',
              bot: true,
            });

            await replyTicket(receviedMsg, ticketId);

            pushMessage({
              type: 'text',
              message: `Sure ${userStore.userDisplayDetails.name}. Noted on your request. We will get back to you shortly.`,
              bot: true,
            });
          }
        } catch (err) {
          logError(err);
          throw err;
        }
      }
    },
    [
      ticketId,
      itineraryId,
      platoState,
      animationDelayIndex,
      pushMessage,
      setMessage,
      setTicketId,
      userStore,
      selectedType,
      disableInput,
    ],
  );

  const getConversations = useCallback(
    async (ticketid: number) => {
      const response = await getTicketConversations(ticketid);

      const isClosed = response.data.conversation.status_id === 2;

      disableInput(isClosed);

      pushMessage({
        type: 'text',
        message: response.data.conversation.title,
        date: response.data.conversation.created_at,
        bot: false,
        source: 'list',
      });

      const replies = response.data.conversation.reply as {
        reply: string;
        user_type: string;
        created_at: string;
      }[];

      replies.forEach((reply, index) => {
        const isBot = reply.user_type !== 'customer';
        pushMessage({
          type: 'text',
          message: reply.reply,
          date: reply.created_at,
          bot: isBot,
          source: 'list',
        });

        if (index === replies.length - 1 && isBot && !isClosed) {
          addClosButton();
        }
      });

      if (isClosed) {
        pushMessage({
          type: 'text',
          message: `This ticket (id: ${ticketId}) is closed. Please raise a new ticket by clicking on “Send Message” from the previous screen.`,
          date: response.data.conversation.updated_at,
          bot: true,
          source: 'list',
        });
      }
    },
    [pushMessage, disableInput, addClosButton],
  );

  useEffect(() => {
    if (ticketId !== 0 && platoState.current === 'EXISITING') {
      pushMessage({
        type: 'bubble',
        message: '',
        bot: true,
      });

      getConversations(ticketId);
      return;
    }
  }, [ticketId, getConversations, pushMessage]);

  useEffect(() => {
    if (ticketId !== 0) {
      return;
    }

    if (type === 'Other') {
      if (ticketTypes) {
        pushMessage({
          type: 'text',
          message: `Hi ${userStore.userDisplayDetails.name} Welcome to Pickyourtrail Customer Support! Please select category in which you want to raise an issue.`,
          bot: true,
        });

        pushMessage({
          type: 'chips',
          options: ticketTypes.map((v: any) => ({
            title: v.description,
            id: v.id,
          })),
          bot: true,
          action: (value: string, id: number, index) => {
            hideMessage(state => [...state, index]);
            sendMessage(value);
            selectedType.current = id;
            sendMessage(
              `Thank you for selecting a category. Please let us know the details of your query / issue related to ${value}.`,
              false,
              true,
            );
            platoState.current = 'NEW';
          },
        });
      } else {
        pushMessage({
          type: 'bubble',
          message: '',
          bot: true,
        });
      }
    } else {
      if (ticketTypes) {
        const ticketType = ticketTypes.find((v: any) => {
          return typeMap[type] === v.description;
        });

        const otherType = ticketTypes.find((v: any) => {
          return v.description === 'Others';
        }) as {
          id: number;
        };

        selectedType.current = ticketType?.id || otherType.id;
        pushMessage({
          type: 'text',
          message: `Hi ${userStore.userDisplayDetails.name} Thank you for selecting a category. Please let us know the details of your query / issue related to ${type}`,
          bot: true,
        });
        platoState.current = 'NEW';
      } else {
        pushMessage({
          type: 'bubble',
          message: '',
          bot: true,
        });
      }
    }
  }, [
    ticketId,
    platoState,
    userStore,
    type,
    ticketTypes,
    pushMessage,
    sendMessage,
    getConversations,
  ]);

  return (
    <PlatoContext.Provider
      value={{
        message,
        setMessage,
        sendMessage,
        messages,
        hiddenMessages,
        hideMessage,
        pushMessage,
        userStore,
        inputDisabled,
      }}>
      {children}
    </PlatoContext.Provider>
  );
};
