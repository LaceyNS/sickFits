import 'dotenv/config';

const databaseURL = process.env/ || 'mongodb://localhost/keystone-sick-fits-tutorial';

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 30, //How long should they stay signed in. seconds, minutes, hours, days
    secret: process.env.COOKIE_SECRET,
};
