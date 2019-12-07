import {MongoClient} from "mongodb";
import {assert} from 'chai';
const DbClient = require("../DbClient");
import {isBanned, isBannedBy_account, isAdmin, isAdmin_render, canModify, canModify_Thread} from "../managers/activityHandling";
import { MockReq } from "./helper.test";
import { MockRes } from "./helper.test";

describe("Activity Handling Tests", ()=>{
    it ("user is not banned", async ()=>{
        let req = new MockReq();
        let res = new MockRes();
        req.setUserName("root");
        //console.log("is Banned:" + await isBanned(req, res));
        assert(await isBanned(req, res) === false);
        assert((await isBannedBy_account("root", res)) === false);
        assert(await isAdmin(req) === true);
        assert(await isAdmin_render(req, res) === true);
    });
    it ("user is banned", async ()=>{
        //let db = await DbClient.connect();
        let feedback = await DbClient.usersCol.insertOne({name:"jerry", email:"jerry's email", pw:"jerry's password", level:0});
        let req = new MockReq();
        let res = new MockRes();
        req.setUserName("jerry");
        assert(await isBanned(req, res) === true);
        assert((await isBannedBy_account("jerry", res)) === true);
        assert(await isAdmin(req) === false);

        await DbClient.usersCol.deleteOne({_id : feedback.insertedId});
    });
    it ("testing modifying rights", async () =>{
        let feedback = await DbClient.threadsCol.insertOne({author:"root"});
        let req = new MockReq();
        let res = new MockRes();
        req.setUserName("root");
        let bool = await canModify_Thread(feedback.insertedId, req, res)
        assert(bool);
        await DbClient.threadsCol.deleteOne({_id:feedback.insertedId});
    })
});