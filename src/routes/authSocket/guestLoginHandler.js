import { setUserAsLoggedInOnClient } from "../../services/clientService";
import { createGuestUser, findUser } from "../../services/userService";

export const guestLoginHandler = [
  'guestLogin',
  async({ username }, comms) => {
    const clientId = comms.connection.cookies.get('CHSS_CLIENT_ID');
    if (!clientId) throw new Error('guest tried to log in without client id');

    const userFromMongo = await findUser({ username });

    if (userFromMongo) {
      if (userFromMongo.clientId !== clientId) {
        // TODO: comms.error should take an error object
        comms.error('This guest user already exists and is associated with another computer. Please use a different username.');
        return;
      }

      await setUserAsLoggedInOnClient({ clientId, userId: userFromMongo.userId });
      await comms.connection.do('setUser', userFromMongo);
      comms.send('OK');
      
      return;
    }

    const newGuestUser = await createGuestUser({ username, clientId, isLoggedIn: true, lastLoggedIn: new Date().toISOString() });
    await setUserAsLoggedInOnClient({ clientId, userId: newGuestUser.userId });
    await comms.connection.do('setUser', newGuestUser);
    comms.send('OK');
  },
];
