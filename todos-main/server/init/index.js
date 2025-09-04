const mongoose = require("mongoose");
const Task = require("../models/Task");
const data = require("./data");

let dbUrl = "mongodb+srv://maheshcodes:ralkjdlkfjahlksdfjhaslfd@cluster0.yxocuiv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

const initDb = async () => {
    await Task.deleteMany({});
    let tasks = await Task.insertMany(data);
    console.log(tasks);
    console.log(`task initialized`)
};

initDb()