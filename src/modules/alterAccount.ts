import {Request, Response} from "express";
const DbClient = require("../DbClient");


    // https://docs.mongodb.com/manual/reference/operator/update/push/
    export async function pushTag (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $push: { tags: req.body.tag } });
    }

    // https://docs.mongodb.com/manual/reference/operator/update/pop/
    export async function popTag (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $pop: { tags: req.body.new} });
    }

    // https://docs.mongodb.com/manual/reference/operator/update/positional/
    export async function editEmail (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $set: { email: req.body.email } });
    }

     export async function editPassword (req:Request, res:Response) {
        let db = await DbClient.connect();
        await db!.collection("users").updateOne({name: req.cookies.username}, { $set: { email: req.body.password } });
    }
