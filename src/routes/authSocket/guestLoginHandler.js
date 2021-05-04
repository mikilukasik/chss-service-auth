import { getCollection } from "../../services/mongoService";

export const guestLoginHandler = [
  'guestLogin',
  async(data, comms) => {
    console.log({ data, c: comms.connection.cookie })
    comms.send('OK');
  },
];
