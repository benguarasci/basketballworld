const { createNewProfile, retrieveProfile } = require("../managers/profile");
const { DbClient } = require("../DbClient");
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

// A mock user response
// const mockResponse = () => {
//     const res = {};
//     res.status = 200;
//     res.json = "";
//     return res;
// };

// Tests to see if the mockUser can be inserted into the 'users' collection
// test("Insert User DB test", async () => {
//    const mockForm = (name: any, email: any, pw: any) => ({
//        name: mockUser.name,
//        email: mockUser.email,
//        pw: mockUser.pw,
//    });
//    await createNewProfile(mockForm);
//    const addedUser = await retrieveProfile(mockProfileRequest);
//    expect(mockUser).toEqual(addedUser);
// });

// Tests to see if the mockUser module 'isValid' validates that the fields have been filled
// test("Tests profileRetriever function", async () => {
//     const user = await retrieveProfile(mockProfileRequest);
//     expect(user).toEqual(mockUser.name);
//
// });

// Tests to see if the mockUser can be deleted from the 'users' collection
// test("Delete User DB test", async () => {x
//
//
// });