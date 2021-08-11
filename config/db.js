// connection logic

const mongoose = require('mongoose');
const config = require('config'); //grab that string that we just put inside of the default.json
const db = config.get('mongoURI');

// mongoose.connect(db)

// Connect to mongoDB (async / await)
//
const connectDB = async () => {
  try {
    // since mongoose.connect returns a promise, put await before it
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
