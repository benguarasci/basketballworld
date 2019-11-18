import {Request, Response} from "express";
const DbClient = require("../DbClient");
const ObjectId = require("mongodb").ObjectID;
export class postCreator {
    constructor () {

    }
    async createPost (req:Request, res:Response) {
        let threadID = new ObjectId(req.params.thread);
        let username = req.cookies;
        let title = req.body.title;
        let owner = req.cookies.username;
        let d = new Date();
        let date = d.toString();
        let ms = d.getTime();
        let count = 0;
        let db = await DbClient.connect();
        db!.collection("posts").find({parentThread: threadID}).toArray();
    }
}