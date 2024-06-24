const mongoose = require('mongoose');

const URI=process.env.MONGODB_URI;


const connectDb=async () =>{
    const uris = [URI];

    for (const uri of uris) {

    try {
        await mongoose.connect(uri);
        console.log("connected to database");
        
    } catch (error) {
        console.log("error connecting");
        process.exit(0);
    }
        
    }
};

module.exports=connectDb;