import {MongoClient} from "mongodb";
import DbClient = require("../DbClient");
import {assert} from 'chai';
import {refresh, like, dislike, insertShoe, sortShoes, deleteShoe} from "../managers/shoe";

import {Shoe} from "../models/shoe_m"
const ObjectId = require("mongodb").ObjectID;

const testshoe =  new Shoe("/img/LBJ17", "test model", "dak prescott", 12, "jeez leweez", 0, 0);
/*
testshoe.image = "/img/LBJ17";
testshoe.model = "test model";
testshoe.price = 12;
testshoe.player = "dak prescott";
testshoe.description = "jeez leweez";
testshoe.likes = 0;
testshoe.dislikes = 0;
*/



describe("Testing Shoes", ()=>{
    it('tests insertShoe()', async () => {
        let db = await DbClient.connect();
        await insertShoe(testshoe.image, testshoe.model, testshoe.player, testshoe.price, testshoe.description, testshoe.likes, testshoe.likes);
        let test = await db!.collection("shoes").findOne({"player": testshoe.player});
        assert(test.player === "dak prescott");
        });

    it('like()', async () => {
        let db = await DbClient.connect();
        let test = await db!.collection("shoes").findOne({"player": testshoe.player});
        let likenumber = test.likes;
        let ID = test._id;
        await like(ID);
        let test2 = await db!.collection("shoes").findOne({"player": testshoe.player});
        let likenumber2 = test2.likes;
        assert(likenumber2 === likenumber + 1);
    });

    it('dislike()', async () => {
        let db = await DbClient.connect();
        let test = await db!.collection("shoes").findOne({"player": testshoe.player});
        let dislikenumber = test.dislikes;
        let ID = test._id;
        await dislike(ID);
        let test2 = await db!.collection("shoes").findOne({"player": testshoe.player});
        let dislikenumber2 = test2.dislikes;
        assert(dislikenumber2 === dislikenumber + 1);
    });

    it('sortShoes', async () => {
        let db = await DbClient.connect();

    });

    /*
    it('tests deleteShoe()', async () =>{
        let db = await DbClient.connect();
        await deleteShoe("dac prescott");
        assert(await db!.collection("shoes").findOne({"player": testshoe.player}) === null);
    });*/

});