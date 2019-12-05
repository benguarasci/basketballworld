// https://mochajs.org/#getting-started

import {database, usersCol} from "../app";

beforeEach(async function() {
    while(database == null) { }
});

describe('#FindOneUser', function() {
    it('Check if at least one user exists in the database.', async function() {
        const users = await usersCol.findOne();
        users.should.have.equals(1);
    });
});