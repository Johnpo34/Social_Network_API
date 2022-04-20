const connection = requie('../config/connection');
const { User, Thought} = require("../models");
const { users, thoughts } = require("./data");

connection.on("error", (err) => err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});
    const users=[];
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.info("Seeding done.");
    process.exit(0);
});