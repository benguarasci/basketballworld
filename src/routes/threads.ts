import {Request, Response, Router} from "express";
import {isLoggedIn} from "../managers/profile";
const DbClient = require("../DbClient");
const router = Router();
const ObjectId = require("mongodb").ObjectID;
import createThreadForm from "../mymodels/createThread";

async function listThreads() {
    let db = await DbClient.connect();
    let threads = await db!.collection("threads").find().toArray();
    let links = threads.map((thread : any) => "/threads/"+thread._id.toString());
    return [threads, links];
}
router.get("/", (req : Request, res : Response) => {
    listThreads()
        .then((threads:any) => {
            res.render("placeholders/threads", {'user':req.cookies.username, threads : threads[0], links : threads[1]});
        })
});
router.get("/create", (req : Request, res : Response) => {
    if (!isLoggedIn(req, res)) res.render("placeholders/create_threads", {'user':req.cookies.username});
});
async function createThread (req: Request, res : Response, form : any) {
    let db = await DbClient.connect();
    return await db!.collection("threads").insertOne({"title": form.title, "description": form.desc, "owner":form.owner, "ms": form.ms, "count": form.count, by: form.owner});
}
router.post("/create", (req: Request, res: Response) => {
    if (isLoggedIn(req, res)) return;
    let form = new createThreadForm (req);
    if (!form.isFormComplete(res)) return;

    createThread(req, res, form).then((id : any) =>
        res.redirect("/threads/"+id.insertedId.toString())
    );
});

router.get("/:thread", (req: Request, res: Response) => {
    let threadID = new ObjectId(req.params.thread);
    let thisDB : any;
    DbClient.connect()
        .then ((db : any) => {
            thisDB = db;
            return db!.collection("threads").findOne({_id : threadID})
        }).then ((thread : any) => {
        if (thread === null) res.render("placeholders/homepage", {"message":"couldn't find page, sorry"});
        else {
            thisDB!.collection("posts").find({parentThread: threadID}).toArray()
                .then((arr:any)=>{
                    let posts;
                    if (arr.length === 0) posts = [];
                    else posts = arr;
                    res.render("placeholders/thread", {user:req.cookies.username, thread:thread, posts:posts, target:"/threads/"+req.params.thread})
                }).catch((err:any)=>{console.log(err.message)})
        }
    }).catch((err:any)=>{console.log(err.message)})
});
router.post("/:thread", (req: Request, res: Response) => {
    if (!("username" in req.cookies)) {
        res.render("placeholders/threads", {"message": "you are not logged in"});
        return;
    }
    if (req.body.content === "") {
        res.render("placeholders/threads", {"message": "you have to write something"});
        return;
    }
    let content = req.body.content;
    let threadID = new ObjectId(req.params.thread);
    let author = req.cookies.username;
    let d = new Date();
    let date = d.toString();
    let ms = d.getTime();
    DbClient.connect()
        .then((db : any) => {
            db!.collection("posts").insertOne({content:content, author:author,parentThread:threadID, date:date, ms:ms})
                .then((id:any)=>{
                    res.redirect("/threads/"+req.params.thread);
                }).catch((err:any)=>{
                console.log(err.message);
            })
        })
        .catch((err:any)=>{
            console.log(err.message);
        })
});
module.exports = router;