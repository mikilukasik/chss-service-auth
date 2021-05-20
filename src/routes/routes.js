import { authSocketOpenEventHandler } from './authSocket/authSocketOpenEventHandler';
import { guestLoginHandler } from './authSocket/guestLoginHandler';
import { persistUserSettingsHandler } from './authSocket/persistUserSettingsHandler';

export const initRoutes = ({ msg }) => {
  const authSocket = msg.ws('/authSocket');
  authSocket.on(...guestLoginHandler);
  authSocket.on(...persistUserSettingsHandler);
  authSocket.onEvt(...authSocketOpenEventHandler);
};
