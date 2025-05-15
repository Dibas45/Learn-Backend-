const mongoose = require('mongoose');
const dotenv = require('dotenv');

// process.on('uncaughtException', (err) => {
//   console.error('Uncaught Exception:', err.name, err.message);
//     process.exit(1);
// } );

dotenv.config({ path: './config.env' });

// Database Connection
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => console.error('DB connection error:', err));

  
const app = require('./app');

// Start Server
const port = process.env.PORT || 3000;
const server=app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on('unhandledRejection', (err) => { 
  console.error('Unhandled Rejection:', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
}
);

