import {Request, Response} from "express";
import {retrieveProfile} from "./profile";
import createThreadForm from "../mymodels/createThread";
//import {postsCol, threadsCol} from "../app";
import {canModify, canModify_Thread} from "./activityHandling";
const ObjectId = require("mongodb").ObjectID;
const DbClient = require("../DbClient");

// Lists all of the threads
export async function listThreads() {
    let threads = await DbClient.threadsCol.find().toArray();
    let links = threads.map((thread: any) => "/threads/"+thread._id.toString());
    return [threads, links];
}

export async function retrieveTaggedThreads (req: any, res: any) {
    let profile = await retrieveProfile(req, res);
    return await DbClient.threadsCol.find({tags: {$in: profile.tags}}).toArray();
}
export async function retrieveMyThreads (req: any, res: any) {
    let profile = await retrieveProfile(req, res);
    return await DbClient.threadsCol.find({author: profile.name}).toArray();
}
export async function createThread (req: any, res: any) {
    let thread = new createThreadForm(req);
    if(thread.isFormComplete(res)) {
        return await DbClient.threadsCol.insertOne(thread);
    }
}
// Deletes a thread based on the _id input
export async function deleteThread (req: any, res: any) {
    try {
        let threadID = new ObjectId(req.params.id);
        if (await canModify_Thread(threadID, req, res)){
            await DbClient.threadsCol.deleteOne({_id: threadID});
            return true;
        }
        return false;
    } catch(err) {
        // console.log("Unable to delete thread. Error: " + err);
    }
}
// Edits a thread based on the _id input
export async function editThread (req: any, res: any) {
    try {
        let threadID = new ObjectId(req.body._id);
        if (await canModify_Thread(threadID, req, res))
        {
            let thread = new createThreadForm(req);
            if(thread.isFormComplete(res))
                await DbClient.threadsCol.replaceOne({_id: threadID}, thread);
        }
    } catch(err) {
        // console.log("unable to edit thread. Error: " + err);
    }
}

export async function findAllPosts(par : string) {
    let ID = ObjectId(par);
    let posts;
    let arr = await DbClient.postsCol.find({parentThread: ID}).toArray();
    if (arr.length === 0) posts = [];
    else posts = arr;
    return posts;
}

export async function getThread(threadID : string) {
    try {
        return await DbClient.threadsCol.findOne({_id: ObjectId(threadID)});
    } catch(err) {
        // console.log("Unable to get thread. Error: " + err);
    }
}