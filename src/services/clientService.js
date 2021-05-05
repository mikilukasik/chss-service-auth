import { getCollection } from "./mongoService";

export const setUserAsLoggedInOnClient = async({ userId, clientId }) => {
  const clientsCollection = await getCollection('clients');
  return clientsCollection.update({ clientId }, { $set: { loggedInUser: userId} }, { upsert: true }); 
};

export const getClient = async(filter) => {
  const clientsCollection = await getCollection('clients');
  return clientsCollection.findOne(filter, { upsert: true });
};

export const insertClient = async(client) => {
  const clientsCollection = await getCollection('clients');
  return clientsCollection.insertOne(client);
}
