const mongoose = require("mongoose");

async function connectDb() {
    try{
        let conn = await mongoose.connect(process.env.MONGODB_ATLAS);
        console.log(`Database Connected ${conn.connection.host}`);
    }catch(err){
        console.log(`------ERROR-----`)
        console.log(err)
    }
};

module.exports = connectDb;