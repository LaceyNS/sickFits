import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const databaseURL =
  process.env.DATABASE_URL || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 30, // How long should they stay signed in. seconds, minutes, hours, days
  secret: process.env.COOKIE_SECRET,
};

export default config({
  // @ts-ignore
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: databaseURL,
    // TO DO: Add data seeding here
  },
  lists: createSchema({
    // Scheme items go in here
  }),
  ui: {
    // TO DO: change this for roles
    isAccessAllowed: () => true,
    // TO DO: add session values here
  },
});
