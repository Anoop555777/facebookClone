const express = require('express');
const cors = require('cors');
const userRouter = require('./routes/userRouter');
const globalHandler = require('./controller/errorController');
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/api/v1/users', userRouter);

app.use(globalHandler);

module.exports = app;
