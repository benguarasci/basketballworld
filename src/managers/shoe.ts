import {Request, Response} from "express";
import {retrieveProfile} from "./profile";
import createThreadForm from "../mymodels/createThread";
const DbClient = require("../DbClient");
const ObjectId = require("mongodb").ObjectID;

export async function refresh (res: Response){
    let db = await DbClient.connect();
    let data = await db!.collection("data").find().toArray();
    res.render('shoes/browse', {lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes});

}

export async function like(res: Response, Player: any) {
    let db = await DbClient.connect();
    let like = await db!.collection("data").findOne({"name": Player});
    return await db!.collection("data").updateOne({_id: like._id}, {$inc: {likes: 1}});
}

export async function dislike(res: Response, Player: any) {
    let db = await DbClient.connect();
    let like = await db!.collection("data").findOne({"name": Player});
    return await db!.collection("data").updateOne({_id: like._id}, {$inc: {dislikes: 1}});
}

