require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authrouter = require('./router/auth-router');
const authadmin=require('./router/admin-router');
const connectdb = require('./utils/db');
const errorMiddleware = require('./middleware/error-middleware');
const adminmiddleware = require('./middleware/admin-middleware');
const authmiddleware = require('./middleware/authmiddleware');


const corsOption = {
  origin: 'http://localhost:5173',
  methods: 'GET,POST,PUT,PATCH,DELETE,HEAD',
  credentials: true,
};

const app = express();
app.use(cors(corsOption));
app.use(express.json());


app.use('/api/auth', authrouter);
app.use('/api/admin',authadmin);
app.use(errorMiddleware);
app.use(adminmiddleware);
app.use(authmiddleware);

const PORT = process.env.PORT || 5000;

connectdb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
  });
});

