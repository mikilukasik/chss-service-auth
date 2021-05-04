import { guestLoginHandler } from './authSocket/guestLoginHandler';

export const initRoutes = ({ msg }) => {
  const authSocket = msg.ws('/authSocket');
  authSocket.on(...guestLoginHandler);
};
