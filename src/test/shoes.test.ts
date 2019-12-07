import {MongoClient} from "mongodb";
import DbClient = require("../DbClient");
import {assert} from 'chai';
import {like, dislike, insertShoe} from "../managers/shoe";

import {Shoe} from "../models/shoe_m"

const testshoe =  new Shoe("/img/LBJ17", "test model", "dak prescott", 12, 0, 0);


describe("SHOES TEST SUITE", ()=>{
    // tests insertshoe() functionality
    it("insertShoe()", async () => {
        await insertShoe(testshoe.image, testshoe.model, testshoe.player, testshoe.price, testshoe.likes, testshoe.likes);
        let test = await DbClient.shoesCol.findOne({"player": testshoe.player});
        assert(test.player === "dak prescott");
        });
    // tests like() functionality
    it("like()", async () => {
        let test = await DbClient.shoesCol.findOne({"player": testshoe.player});
        let likenumber = test.likes;
        let ID = test._id;
        await like(ID);
        let test2 = await DbClient.shoesCol.findOne({"player": testshoe.player});
        let likenumber2 = test2.likes;
        assert(likenumber2 === likenumber + 1);
    });
    // tests dislike() functionality
    it("dislike()", async () => {
        let test = await DbClient.shoesCol.findOne({"player": testshoe.player});
        let dislikenumber = test.dislikes;
        let ID = test._id;
        await dislike(ID);
        let test2 = await DbClient.shoesCol.findOne({"player": testshoe.player});
        let dislikenumber2 = test2.dislikes;
        assert(dislikenumber2 === dislikenumber + 1);
    });

});