import apiCall from '../networkRequests/apiCall';
import {IMobileServerResponse} from '../../TypeInterfaces/INetworkResponse';
import {CONSTANT_platoListTickets} from '../../constants/apiUrls';

export async function createTicket(
  message: string,
  vacation_id: string,
  selectedType: number,
) {
  const respose: IMobileServerResponse = await apiCall(
    `${CONSTANT_platoListTickets}?title=${message}&vacation_id=${vacation_id}&sub_type_id=${selectedType}`,
    {},
    'PUT',
  );

  return respose;
}

export async function replyTicket(message: string, ticket_id: number) {
  const respose: IMobileServerResponse = await apiCall(
    `${CONSTANT_platoListTickets}/${ticket_id}/reply?reply=${message}&user_type=customer`,
    {},
    'POST',
  );

  return respose;
}

export async function closeTicket(ticket_id: number) {
  const respose: IMobileServerResponse = await apiCall(
    `${CONSTANT_platoListTickets}/${ticket_id}/close?status_id=2`,
    {},
    'PATCH',
  );

  return respose;
}

export async function getTicketConversations(ticket_id: number) {
  const respose: IMobileServerResponse = await apiCall(
    `${CONSTANT_platoListTickets}/${ticket_id}/conversations?user_type=customer`,
    {},
    'GET',
  );

  return respose;
}
