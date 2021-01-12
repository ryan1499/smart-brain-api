const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const profile = require('./controllers/profile');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'postgres',
    database: 'smartbrain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('welcome home!') })
app.get('/profile/:id', profile.handleProfile(db))
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.put('/image', image.handleImage(db))
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

const DATABASE_URL = process.env.DATABASE_URL
app.listen(3000, () => {
  console.log(`Server is running on port ${DATABASE_URL}`);
});