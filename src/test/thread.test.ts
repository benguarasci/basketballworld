// https://mochajs.org/#getting-started
// https://www.chaijs.com/api/assert/

import { MongoClient } from "mongodb";
import { assert } from 'chai';

const DbClient = require("../DbClient");
//const Profile  = require("../models/profile_m");
const { Thread } = require("../models/thread_m");
import { getThread } from "../managers/thread";

// A mock user created from the User model
const mockThread = new Thread;
mockThread._id = "5deaec121c9d4400009a59ec";
mockThread.title = "Test title for a thread";
mockThread.content = "Test content for a thread";
mockThread.tags = ["test tag", "other tag"];
mockThread.user = "JohnSmith";

before(async() => {
    await DbClient.connect("bbworld_test");
    console.log("Connected to bbworld_test");
});

describe('THREAD TEST SUITE', function async () {

    it("getThread(theadID) function test", async () => {
        const result = await getThread(mockThread._id);
        assert.equal(result._id, "5deaec121c9d4400009a59ec");
    });

});
