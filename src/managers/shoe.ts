import {Request, Response} from "express";
import {isLoggedIn, retrieveProfile} from "./profile";
import {Shoe} from "../models/shoe_m"
const DbClient = require("../DbClient");

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

export async function like(ID: string) {
    //let db = await DbClient.connect();
    //let ID =  ObjectId(req.params.id);
    let shoe = await DbClient.shoesCol.findOne({_id: ID});
    return await DbClient.shoesCol.updateOne({_id: shoe._id}, {$inc: {likes: 1}});
}

export async function dislike(ID: string) {
    //let db = await DbClient.connect();
    //let ID = ObjectId(req.params.id);
    let shoe = await DbClient.shoesCol.findOne({_id: ID});
    return await DbClient.shoesCol.updateOne({_id: shoe._id}, {$inc: {dislikes: 1}});
}

//sorts shoe order based on parameters
export async function sortShoes(order: any){
    let shoes = await DbClient.shoesCol.find().sort(order).toArray();
    let likes = shoes.map((shoe: any) => "/shoes/likes/" + shoe._id.toString());
    let dislikes = shoes.map((shoe: any) => "/shoes/dislikes/" + shoe._id.toString());
    return [shoes, likes, dislikes];

}
