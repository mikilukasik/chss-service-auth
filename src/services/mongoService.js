import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb://0.0.0.0:27017');
let db;

const collections = {};

export const connect = async() => {
  await client.connect();
  console.log('Connected successfully to server');
  db = client.db('chss');
};

export const getCollection = async(collecitonName) => {
  if (collections[collecitonName]) return collections[collecitonName];
  if (!db) await connect();
  collections[collecitonName] = db.collection(collecitonName);
  return collections[collecitonName];
};

export const getNextAvailableUserId = async() => {
  const countersCollection = await getCollection('counters');
  const response = await countersCollection.findOneAndUpdate({ _id: 'nextUserId' }, { $inc: { userId: 1 } }, { upsert: true });
  if (response.lastErrorObject.upserted === 'nextUserId') return 0;
  return response.value.userId;
}
