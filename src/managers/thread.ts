import {Request, Response} from "express";
import {retrieveProfile} from "./profile";
import Profile from "../models/profile_m";
const DbClient = require("../DbClient");

// https://docs.mongodb.com/manual/reference/operator/query/in/
export async function retrieveThreads (req : Request, res: Response) {
    let db = await DbClient.connect();
    let profile = await retrieveProfile(req, res);
    return await db!.collection("threads").find({tags: {$in: profile.tags}}).toArray();
}