const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    }
  });

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('root')});
app.post('/signin', signin.handleSignin(db, bcrypt));
app.post('/register', register.handlerRegister(db, bcrypt));
app.get('/profile/:id', profile.handleProfileGet(db));
app.post('/imageurl', (req,res) => { image.handleAPICall(req, res) });
app.put('/image', image.handleImage(db));

app.listen(process.env.PORT || 3000, () => {
    console.log('app is running on port ${process.env.PORT}');
});
