import {Request, Response} from "express";
import {isLoggedIn, retrieveProfile} from "./profile";
import {Shoe} from "../models/shoe_m"
const DbClient = require("../DbClient");
const ObjectId = require("mongodb").ObjectID;

export async function insertShoe (image: any, model: string, player: string, price: string, description: string, likes: number, dislikes: number){
    let db = await DbClient.connect();
    let shoe = new Shoe(image, model, player, price, description, likes, dislikes);
    let temp = await db!.collection("shoes").findOne({"model": model});
    if(temp === null){
        return await db!.collection('shoes').insertOne(shoe);
    }else{
        return
    }
}

export async function deleteShoe (player: string){
    let db = await DbClient.connect();
    let shoe = await db!.collection("shoes").findOne({"player": player});
        return await db!.collection('shoes').deleteOne(shoe);
}

export async function refresh (res: Response, req: Request) {
    let db = await DbClient.connect();
    let shoes = await db!.collection("shoes").find().toArray();
    res.render('shoes/browse', {"user": req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2]})
}
    export async function like(res: Response, req: Request) {
        let db = await DbClient.connect();
        let ID =  ObjectId(req.params.id);
        let shoe = await db!.collection("shoes").findOne({_id: ID});
        return await db!.collection("shoes").updateOne({_id: shoe._id}, {$inc: {likes: 1}});
    }

    export async function dislike(res: Response, req: Request) {
        let db = await DbClient.connect();
        let ID = ObjectId(req.params.id);
        let shoe = await db!.collection("shoes").findOne({_id: ID});
        return await db!.collection("shoes").updateOne({_id: shoe._id}, {$inc: {dislikes: 1}});
    }

    export async function sortShoes(){
        let db = await DbClient.connect();
        let order = {likes: -1};
        let shoes = await db!.collection("shoes").find().sort(order).toArray();
        let likes = shoes.map((shoe: any) => "/shoes/likes/" + shoe._id.toString());
        let dislikes = shoes.map((shoe: any) => "/shoes/dislikes/" + shoe._id.toString());
        return [shoes, likes, dislikes];

    }
