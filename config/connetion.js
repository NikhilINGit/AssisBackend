const mongoose = require('mongoose');

const connectDB = async () => {
    console.log(process.env.MONGO_URL,"----------------4------");
    try {
        await mongoose.connect(process.env.MONGO_URL);
        // await mongoose.connect(process.env.MONGO_URL_LOCAL, {
        //     useNewUrlParser: true,
        //     useUnifiedTopology: true,
        // });
        console.log(`MongoDB Connected succesfully`);
        // console.log(`MongoDB Connected: ${process.env.MONGO_URL}`);
    } catch (error) {
        console.error("Mongoose connection error:", error);
        process.exit(1); 
    }
};

module.exports = connectDB;
