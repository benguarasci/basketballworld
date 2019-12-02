import {Request, Response} from "express";
import {retrieveProfile} from "./profile";
import createThreadForm from "../mymodels/createThread";
const DbClient = require("../DbClient");
const ObjectId = require("mongodb").ObjectID;


// https://docs.mongodb.com/manual/reference/operator/query/in/
export async function retrieveThreads (req : Request, res: Response) {
    let db = await DbClient.connect();
    let profile = await retrieveProfile(req, res);
    return await db!.collection("threads").find({tags: {$in: profile.tags}}).toArray();
}
export async function createThread (req : Request, res: Response) {
    let db = await DbClient.connect();
    let thread = new createThreadForm(req);
    if(thread.isFormComplete(res)) {
        await db!.collection("threads").insertOne(thread);
    }
}

// Deletes a thread based on the _id input
export async function deleteThread (req: Request, res: Response) {
    try {
        let db = await DbClient.connect();
        let threadID = new ObjectId(req.params.id);
        await db!.collection("threads").deleteOne({_id: threadID});
    } catch(Exception) {
        // console.log("unable to delete thread. Error: " + Exception);
    }

}