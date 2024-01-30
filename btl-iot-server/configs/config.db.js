const mongoose = require("mongoose");

async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDb Connected");
  } catch (e) {
    console.log(e);
    console.log("MongoDb Error");
  }
}

module.exports = { connectDb };
