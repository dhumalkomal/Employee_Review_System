
// import mongoose
const mongoose = require('mongoose');

// mongoDB url stored in env variable
// const  MONGODB_URL  = 'mongodb://127.0.0.1:27017/ERS_db';
// const  MONGODB_URL  = '';


// const  MONGODB_URL  = 'mongodb+srv://komaldhumal:EmployeeSystem@komalcluster.lythlnz.mongodb.net/?retryWrites=true&w=majority';

// const  MONGODB_URL  = 'mongodb+srv://habit:habit123@cluster0.krqzlcy.mongodb.net/?retryWrites=true&w=majority';


// connect to database
exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(
        // if database connected
        console.log('Database is connected successfullly')
    )
    .catch((error) => {
        // if there is some error
        console.log('database connection is failed');
        console.log(error);
        process.exit(1);
    })
}