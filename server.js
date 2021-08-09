// our main entry file

const express = require('express');
const connectDB = require('./config/db');

const app = express();


// Connect Database
connectDB();

// Single endpoint just to test out
app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

// look for an environment variable called port to use.
// when we deploy to Hiroku, that's where it's going to get the port number
// if there's no environment variable set, it will just default to 5000 locally.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));