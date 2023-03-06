const app = require('./app');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

dotenv.config({ path: `${path.resolve()}/config.env` });
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connect to database successfull'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log('listening on port ' + port);
});

process.on('unhandledRejection', err => {
  console.log(err);
  console.log('unhandleError shutting down... 💥');
  server.close(() => {
    process.exit(1);
  });
});
