const { profileRetriever } = require("../modules/profileRetriever");
const { DbClient } = require("../DbClient");
const { Profile } = require("../models/profile_m");

// A mock user created from the User model
const mockUser = new Profile;
mockUser.name = "John";
mockUser.email = "a@b.com";
mockUser.pw = "123";
mockUser.tags = null;

// Tests to see if the mockUser can be inserted into the 'users' collection
test("Insert User DB test", async () => {

    // *** This should call the profile.insert module instead ***

    await DbClient.connect().then((db: any) =>
        db!.collection("users").insertOne(mockUser));

    const insertedUser = await DbClient.connect().then((db: any) =>
        db!.collection("users").findOne(mockUser));

    // The insertedUser should equal the mockUser added
    expect(insertedUser).toEqual(mockUser);
});

// Tests to see if the mockUser can be deleted from the 'users' collection
test("Delete User DB test", async () => {

    await DbClient.connect().then((db: any) =>
        db!.collection("users").deleteOne(mockUser));

    const deletedUser = await DbClient.connect().then((db: any) =>
        db!.collection("users").findOne(mockUser));

    // Since the mockUser has been deleted the deletedUser should return null
    expect(deletedUser).toEqual(null)

});

// Tests to see if the mockUser module 'isValid' validates that the fields have been filled
test("Tests userProfileRetriever module", async () => {


});