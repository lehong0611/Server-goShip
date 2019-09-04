const mongoose = require('mongoose');
require('dotenv').config();
mongoose
  .connect("mongodb://ds245647.mlab.com:45647/shipways", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
	auth: {
      user: 'lehong',
      password: 'lehong1997'
    }
  })
  .then( () => {
    console.log('Connected to db');
  }, 
  (err) => {
    console.log('Connect to db failed');
    console.log(err);
  });