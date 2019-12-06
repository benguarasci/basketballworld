// https://mochajs.org/#getting-started
// https://www.chaijs.com/api/assert/
// https://stackoverflow.com/a/47450902

import {MongoClient} from "mongodb";
import {assert} from 'chai';

let database: any;
let usersCol: any;
const uri = "mongodb+srv://admin:m39dDRPEHac6UCWj@3-2-fjpaq.gcp.mongodb.net/test";

before((done) => {
    MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (error: any, client: any) => {
        if(error) {
            throw error;
        }
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

process.exit();