const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const Tour = require('../../models/tourModel');
const Review = require('../../models/reviewModel');
const User = require('../../models/userModel');


// Database Connection
const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful!');
  })
  .catch((err) => console.error('DB connection error:', err));


  //Reading json file
  const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours.json`, 'utf-8')
  );
  const users = JSON.parse(
    fs.readFileSync(`${__dirname}/users.json`, 'utf-8')
  );
  const reviews = JSON.parse(
    fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
  );

  //Import Data into DB
    const importData = async () => {
        try {
        await Tour.create(tours);
        await User.create(users,{validateBeforeSave: false});
        await Review.create(reviews);

        console.log('Data successfully loaded!');
        } catch (err) {
        console.error(err);
        }
        process.exit();

    };

    //Delete all data from DB
    const deleteData = async () => {
        try {
        await Tour.deleteMany();
        await Review.deleteMany();
        await User.deleteMany();
        console.log('Data successfully deleted!');
        } catch (err) {
        console.error(err);
        }
        process.exit();

    };

if(process.argv[2] === '--import') {
    importData();
}
else if(process.argv[2] === '--delete') {
    deleteData();

}
else {
    console.log('Please provide a valid argument: --import or --delete');
}