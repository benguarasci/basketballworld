// https://mochajs.org/#getting-started
// https://www.chaijs.com/api/assert/
// https://stackoverflow.com/a/47450902

import {MongoClient} from "mongodb";
import {assert} from 'chai';

const DbClient = require("../DbClient");

describe('USER TEST SUITE', function async () {
    it("findOne() user", async () => {
        const result = await DbClient.usersCol.findOne();
        assert.equal(result._id, "5de9c6071c9d4400002f9667");
    });
});

after(function() {
    process.exit();
});
