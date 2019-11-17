import {Request, Response, NextFunction, Router} from "express";
const DbClient = require("../DbClient");
const ObjectId = require("mongodb").ObjectID;

export class threadLister {
    constructor () {
        // does nothing
    }
    async getThreads () {
        let db = await DbClient.connect();
        let threadsList = await db!.collection("threads").find().toArray();
        let links = threadsList.map((thread : any) => "/threads/"+thread._id.toString());
        return [threadsList, links];
    }
    async getThread (id : string) {
        let threadID = new ObjectId(id);
        let db = await DbClient.connect();
        return await db!.collection("threads").findOne({_id : threadID});
    }
    async getPosts (parentId : string) {

    }
}

