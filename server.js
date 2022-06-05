const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
const app = require('./app');

dotenv.config({
  path: './config.env',
});

const port = process.env.PORT;

const DB = process.env.DATABASE_URL.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection successful!✅🌿'));

const server = app.listen(port, () => {
  console.log(`Listening to requests on port: ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION!❌ Shutting Down...');
  server.close(() => {
    process.exit(1);
  });
});
