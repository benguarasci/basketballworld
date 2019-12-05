// https://mochajs.org/#getting-started

import {usersCol} from "../app";

describe('#FindOneUser', function() {
    it('Check if at least one user exists in the database.', async function() {
        const users = await usersCol.findOne();
        users.should.have.equals(1);
    });
});