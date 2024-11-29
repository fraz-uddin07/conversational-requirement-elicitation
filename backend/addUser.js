// addUser.js
const mongoose = require('mongoose');
const User = require('./models/User');

const addUser = async () => {
  await mongoose.connect('mongodb://localhost:27017/reporting_tool', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const user = new User({
    email: 'fraz@gmail.com',
    password: 'password'
  });

  try {
    await user.save();
    console.log('User added successfully!');
  } catch (err) {
    console.error('Error adding user:', err);
  } finally {
    mongoose.connection.close();
  }
};

addUser();
