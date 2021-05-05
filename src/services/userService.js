import { getCollection, getNextAvailableUserId } from "./mongoService";

export const findUser = ({ username }) => new Promise(async(resolve, reject) => {
  const usersCollection = await getCollection('users');

  usersCollection.findOne({ username }, (error, result) => {
    if (error) return reject(error);
    return resolve(result);
  });
});

export const createGuestUser = (fields) => new Promise(async(resolve, reject) => {
  const usersCollection = await getCollection('users');

  usersCollection.insertOne(Object.assign({
    type: 'guest',
    userId: await getNextAvailableUserId(),
    createdAt: new Date(),
  }, fields), (error, result) => {
    if (error) return reject(error);
    return resolve(result.ops[0]);
  });
});

export const getUser = async(filter) => {
  const usersCollection = await getCollection('users');
  return usersCollection.findOne(filter, { upsert: true });
};
