// https://mochajs.org/#getting-started
// https://www.chaijs.com/api/assert/
// https://stackoverflow.com/a/47450902

import {MongoClient} from "mongodb";
import {assert} from 'chai';

const { Profile } = require("../models/profile_m");

// A mock user created from the User model
const mockUser = new Profile;
mockUser.name = "John";
mockUser.email = "a@b.com";
mockUser.pw = "123";
mockUser.tags = null;

//A mock user request
const mockProfileRequest = (name: any, email: any, password: any, cookies: any) => ({
    name: mockUser.name,
    email: mockUser.email,
    password: mockUser.pw,
    cookies: {username: mockUser.name},
});

let database: any;
let usersCol: any;
const uri = "mongodb+srv://admin:m39dDRPEHac6UCWj@3-2-fjpaq.gcp.mongodb.net/test";

before((done) => {
    MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (error: any, client: any) => {
        if(error) throw error;
        database = client.db("bbworld_test");
        usersCol = database.collection("users");
        done();
    });
});

describe('USER TEST SUITE', function async () {
    it("findOne() user", async () => {
        const result = await usersCol.findOne();
        assert.equal(result._id, "5de9c6071c9d4400002f9667");
    });
});

after(function() {
    process.exit();
});