const DbClient = require("../DbClient");

before(async() => {
    await DbClient.connect("bbworld_test");
    console.log("Connected to database: 'bbworld_test'\n");
});