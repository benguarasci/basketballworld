import {Request, Response} from "express";
import {isLoggedIn, retrieveProfile} from "./profile";
import {Shoe} from "../models/shoe_m"
const DbClient = require("../DbClient");

<<<<<<< HEAD
// export async function insertShoe (image: any, model: string, player: string, price: string, description: string, likes: number, dislikes: number){
//     //let db = await DbClient.connect();
//     let shoe = new Shoe(image, model, player, price, description, likes, dislikes);
//     let temp = await DbClient.shoesCol.findOne({"model": model});
//     if(temp === null){
//         return await DbClient.shoesCol.insertOne(shoe);
//     }else{
//         return
//     }
// }
=======


//inserts shoe object into the database if its not already present.
export async function insertShoe (image: any, model: string, player: string, price: number, description: string, likes: number, dislikes: number){
    let db = await DbClient.connect();
    let shoe = new Shoe(image, model, player, price, description, likes, dislikes);
    let temp = await db!.collection("shoes").findOne({"model": model});
    if(temp === null){
        return await db!.collection('shoes').insertOne(shoe);
    }else{
        return
    }
}
>>>>>>> d9aca0f22dc6cbccf0e94c0f92346b571881052e

//removes shoe from data base (used this before i was connected to mongo atlas)
export async function deleteShoe (player: string){
    //let db = await DbClient.connect();
    let shoe = await DbClient.shoesCol.findOne({"player": player});
        return await DbClient.shoesCol.deleteOne(shoe);
}

//r
export async function refresh (res: Response, req: Request) {
    //let db = await DbClient.connect();
    let shoes = await DbClient.shoesCol.find().toArray();
    res.render('shoes/browse', {"user": req.cookies.username, shoes: shoes[0], likes: shoes[1], dislikes: shoes[2]})
}
<<<<<<< HEAD
    export async function like(res: Response, req: Request) {
        //let db = await DbClient.connect();
        let ID =  ObjectId(req.params.id);
        let shoe = await DbClient.shoesCol.findOne({_id: ID});
        return await DbClient.shoesCol.updateOne({_id: shoe._id}, {$inc: {likes: 1}});
    }

    export async function dislike(res: Response, req: Request) {
        //let db = await DbClient.connect();
        let ID = ObjectId(req.params.id);
        let shoe = await DbClient.shoesCol.findOne({_id: ID});
        return await DbClient.shoesCol.updateOne({_id: shoe._id}, {$inc: {dislikes: 1}});
    }

    export async function sortShoes(){
        //let db = await DbClient.connect();
        let order = {likes: -1};
        let shoes = await DbClient.shoesCol.find().sort(order).toArray();
=======

    //increments "likes" number based on shoe ID
    export async function like(ID: string) {
        let db = await DbClient.connect();
        let shoe = await db!.collection("shoes").findOne({_id: ID});
        return await db!.collection("shoes").updateOne({_id: shoe._id}, {$inc: {likes: 1}});
    }

    //increments "dislikes" number based on shoe ID
    export async function dislike(ID: string) {
        let db = await DbClient.connect();
        let shoe = await db!.collection("shoes").findOne({_id: ID});
        return await db!.collection("shoes").updateOne({_id: shoe._id}, {$inc: {dislikes: 1}});
    }

    //sorts shoe order based on parameters
    export async function sortShoes(order: any){
        let db = await DbClient.connect();
        //let order = {likes: -1};
        let shoes = await db!.collection("shoes").find().sort(order).toArray();
>>>>>>> d9aca0f22dc6cbccf0e94c0f92346b571881052e
        let likes = shoes.map((shoe: any) => "/shoes/likes/" + shoe._id.toString());
        let dislikes = shoes.map((shoe: any) => "/shoes/dislikes/" + shoe._id.toString());
        return [shoes, likes, dislikes];

    }
/*
    export async function getShoes(){
        let db = await DbClient.connect();
        let shoes = await db!.collection("shoes").find().toArray();
        let likes = shoes.map((shoe: any) => "/shoes/likes/" + shoe._id.toString());
        let dislikes = shoes.map((shoe: any) => "/shoes/dislikes/" + shoe._id.toString());
        return [shoes, likes, dislikes];

    }
*/
    export async function filter(order: number){

        if(order === 0){
            return {likes: -1};
        }else if(order === 1){
            return {price: 1};
        }else if(order === 2){
            return {price: -1};
        }else {
            return {likes: -1};
        }
    }
