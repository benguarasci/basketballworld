import {Request, Response, NextFunction, Router} from "express";
const DbClient = require("../DbClient");

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

}

