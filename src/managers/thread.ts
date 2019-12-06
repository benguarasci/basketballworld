import {Request, Response} from "express";
import {retrieveProfile} from "./profile";
import createThreadForm from "../mymodels/createThread";
import {threadsCol} from "../app";
import {canModify, canModify_Thread} from "./activityHandling";
const DbClient = require("../DbClient");
const ObjectId = require("mongodb").ObjectID;


// https://docs.mongodb.com/manual/reference/operator/query/in/
export async function retrieveThreads (req : Request, res: Response) {
    //let db = await DbClient.connect();
    let profile = await retrieveProfile(req, res);
    return await threadsCol.find({tags: {$in: profile.tags}}).toArray();
}
export async function retrieveMyThreads (req : Request, res: Response) {
    //let db = await DbClient.connect();
    let profile = await retrieveProfile(req, res);
    return await threadsCol.find({author: profile.name}).toArray();
}
export async function createThread (req : Request, res: Response) {
    //let db = await DbClient.connect();
    let thread = new createThreadForm(req);
    if(thread.isFormComplete(res)) {
        return await threadsCol.insertOne(thread);
    }
}
// Deletes a thread based on the _id input
export async function deleteThread (req: Request, res: Response) {
    try {
        //let db = await DbClient.connect();
        let threadID = new ObjectId(req.params.id);
        if (await canModify_Thread(threadID, req, res)){
            await threadsCol.deleteOne({_id: threadID});
            return true;
        }
        return false;
    } catch(Exception) {
        // console.log("unable to delete thread. Error: " + Exception);
    }
}
// Edits a thread based on the _id input
export async function editThread (req: Request, res: Response) {
    try {
        //let db = await DbClient.connect();
        let threadID = new ObjectId(req.body._id);
        if (await canModify_Thread(threadID, req, res))
        {
            let thread = new createThreadForm(req);
            if(thread.isFormComplete(res))
                await threadsCol.replaceOne({_id: threadID}, thread);
        }
    } catch(Exception) {
        // console.log("unable to delete thread. Error: " + Exception);
    }
}
// Gets a thread based on the _id input
export async function retrieveThread (req: Request, res: Response) {
    try {
        //let db = await DbClient.connect();
        let threadID = new ObjectId(req.params.id);
        return await threadsCol.findOne({_id: threadID});
    } catch(Exception) {
        // console.log("unable to delete thread. Error: " + Exception);
    }
}