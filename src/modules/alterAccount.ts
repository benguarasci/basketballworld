import {Request, Response} from "express";
const DbClient = require("../DbClient");

export class alterAccount {

    // https://docs.mongodb.com/manual/reference/operator/update/push/
    static async pushTag (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $push: { tags: req.body.tag } });
    }

    // https://docs.mongodb.com/manual/reference/operator/update/pop/
    static async popTag (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $pop: { tags: req.body.new} });
    }

    // https://docs.mongodb.com/manual/reference/operator/update/positional/
    static async editEmail (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $set: { email: req.body.email } });
    }

    static async editPassword (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $set: { email: req.body.password } });
    }
}