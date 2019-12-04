import {Request, Response, NextFunction, Router} from "express";
import {isLoggedIn, pushTag, retrieveProfile} from "../managers/profile";
const DbClient = require("../DbClient");
const router = Router();
const ObjectId = require("mongodb").ObjectID;
import createThreadForm from "../mymodels/createThread";
import {
    createThread,
    deleteThread,
    retrieveThread,
    editThread,
    retrieveThreads,
    retrieveMyThreads
} from "../managers/thread";

async function listThreads() {
    let db = await DbClient.connect();
    let threads = await db!.collection("threads").find().toArray();
    let links = threads.map((thread : any) => "/threads/"+thread._id.toString());
    return [threads, links];
}

router.get("/view", (req : Request, res : Response) => {
    listThreads()
        .then((threads:any) => {
            res.render("threads/view", {'user':req.cookies.username, threads : threads[0], links : threads[1]});
        })
});

router.get("/create", (req : Request, res : Response) => {
    res.render("threads/create", {'user':req.cookies.username});
});

router.post("/create", async (req: Request, res: Response) => {
    await createThread(req, res).then((id : any) =>
        res.redirect("/threads/"+id.insertedId.toString())
    );
});

router.post("/delete/:id", async (req: Request, res: Response) => {
    await deleteThread(req, res);
    res.redirect('/profile/home');
});

router.post("/edit/:id", async (req: Request, res: Response) => {
    res.render("threads/edit", {
        'user':req.cookies.username,
        thread: await retrieveThread(req, res).catch((e: any) => console.log(e))
    });
});

router.post("/confirm", async (req: Request, res: Response) => {
    await editThread(req, res);
    res.redirect('/profile/home');
});

router.get("/:thread", (req: Request, res: Response) => {
    let threadID = new ObjectId(req.params.thread);
    let thisDB : any;
    DbClient.connect()
        .then ((db : any) => {
            thisDB = db;
            return db!.collection("threads").findOne({_id : threadID})
        }).then ((thread : any) => {
        if (thread === null) res.render("index", {"message":"couldn't find page, sorry"});
        else {
            thisDB!.collection("posts").find({parentThread: threadID}).toArray()
                .then((arr:any)=>{
                    let posts;
                    if (arr.length === 0) posts = [];
                    else posts = arr;
                    res.render("threads/thread", {user:req.cookies.username, thread:thread, posts:posts, target:"/threads/"+req.params.thread})
                }).catch((err:any)=>{console.log(err.message)})
        }
    }).catch((err:any)=>{console.log(err.message)})
});
router.post("/:thread", (req: Request, res: Response) => {
    if (!("username" in req.cookies)) {
        res.render("threads/view", {"message": "you are not logged in"});
        return;
    }
    if (req.body.content === "") {
        res.render("threads/view", {"message": "you have to write something"});
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
