import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once('open', () => {
  console.log('🥭 MongoDB connection is ready!');
});
mongoose.connection.on('error', (err) => {
  console.error(err);
});

export async function mongoConnect() {
  console.log('connect');
  await mongoose.connect(MONGO_URL);
}

export async function mongoDisconnect() {
  try {
    console.log('disconnect');
    await mongoose.disconnect();
  } catch (e) {
    console.log(e);
  }
}
