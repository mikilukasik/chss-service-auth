import { getClient, insertClient } from "../../services/clientService";
import { getUser } from "../../services/userService";

export const authSocketOpenEventHandler = [
  'open',
  async(connection) => {
    console.log({ cookie: connection.cookies.get('CHSS_CLIENT_ID') })
    const client = await getClient({ clientId: connection.cookies.get('CHSS_CLIENT_ID') });

    if (!client) {
      await insertClient({ clientId: connection.cookies.get('CHSS_CLIENT_ID') });
      return;
    }

    if (client.loggedInUser) {
      const user = await getUser({ userId: client.loggedInUser });
      if (!user) throw new Error(`Client ${client.clientId} has user ${client.loggedInUser} logged in in the clients DB but userId not found in users DB`);

      connection.do('setUser', user);
    }
  },
];
