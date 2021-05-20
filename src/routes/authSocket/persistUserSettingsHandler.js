import { findUser, updateUserData } from '../../services/userService';

export const persistUserSettingsHandler = [
  'persistUserSettings',
  async({ userId, settings = {} }, comms) => {
    const clientId = comms.connection.cookies.get('CHSS_CLIENT_ID');
    const userFromMongo = await findUser({ userId });
    if (!clientId || !userFromMongo) throw new Error('User setting could not be persisted');

    const filter = { userId };
    const update = Object.keys(settings).reduce((result, key) => {
      result[`settings.${key}`] = settings[key];
      return result;
    }, {});

    await updateUserData({ filter, update });
    comms.send('OK');
  },
];
