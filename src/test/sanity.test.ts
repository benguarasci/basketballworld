// https://mochajs.org/#getting-started

import {MongoClient} from "mongodb";

describe('User Test(s)', function() {

    let usersCol: any;
    let database: any;
    const uri = "mongodb+srv://admin:m39dDRPEHac6UCWj@3-2-fjpaq.gcp.mongodb.net/test";

    before(async function() {
        MongoClient.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true }, (error: any, client: any) => {
            if(error) {
                throw error;
            }
            database = client.db("bbworld_test");
            usersCol = database.collection("users");
            console.log("Connected to `" + "bbworld_test" + "`!");
        });
    });

    it('Check if at least one user exists in the database.', async function() {
        const users = await usersCol.findOne();
        users.should.have.equals(1);
    });
});