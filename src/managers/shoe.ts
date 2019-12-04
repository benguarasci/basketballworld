import {Request, Response} from "express";
import {isLoggedIn, retrieveProfile} from "./profile";
import {Shoe} from "../models/shoe_m"
const DbClient = require("../DbClient");
const ObjectId = require("mongodb").ObjectID;

export async function insertShoe (image: any, model: string, player: string, price: string, description: string, likes: number, dislikes: number){
    let db = await DbClient.connect()
    let shoe = new Shoe(image, model, player, price, description, likes, dislikes);
    let temp = await db!.collection("shoes").findOne(shoe);
    if(temp === null){
        return await db!.collection('shoes').insertOne(shoe);
    }
}

export async function refresh (res: Response, req: Request) {
    let db = await DbClient.connect();
    let shoes = await db!.collection("shoes").find().toArray();
    res.render('shoes/browse', {"user": req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2]})
}
    export async function like(res: Response, req: Request) {
        let db = await DbClient.connect();
        let ID =  ObjectId(req.params.id);
        console.log("ID: " + ID);
        let shoe = await db!.collection("shoes").findOne({_id: ID});
        console.log("shoe: " + shoe);
        return await db!.collection("shoes").updateOne({_id: shoe._id}, {$inc: {likes: 1}});
    }

    export async function dislike(res: Response, Player: any) {
        let db = await DbClient.connect();
        let shoe = await db!.collection("data").findOne({"name": Player});
        return await db!.collection("data").updateOne({_id: shoe.dislikes._id}, {$inc: {dislikes: 1}});
    }

/*export async function all(res: Response, req: Request, Player: any, Increment: any){
    if (!isLoggedIn(req, res)) {
        res.render("profile/login")
    }else{
        let db = await DbClient.connect();
        let like = await db!.collection("data").findOne({"name": Player});
        return await db!.collection("data").updateOne({_id: like._id}, {$inc: {Increment: 1}});
    }
}*/

