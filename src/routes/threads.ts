import {Request, Response, NextFunction, Router} from "express";
import {isLoggedIn, isLoggedIn_NoRender, pushTag, retrieveProfile} from "../managers/profile";
const DbClient = require("../DbClient");
const router = Router();
const ObjectId = require("mongodb").ObjectID;
import {postsCol} from "../app";
import createPostForm from "../mymodels/createPost";
import {isBanned, isAdmin, isBannedBy_account, canModify, canModify_Thread, canModify_Post} from "../managers/activityHandling";
import {
    listThreads,
    createThread,
    deleteThread,
    editThread,
    retrieveTaggedThreads,
    retrieveMyThreads,
    findAllPosts,
    getThread
} from "../managers/thread";
import {threadsCol} from "../app";
import moment = require("moment");

router.get("/view", (req : Request, res : Response) => {
    listThreads()
        .then((threads:any) => {
            res.render("threads/view", {'user':req.cookies.username, threads : threads[0], links : threads[1]});
        })
});

router.get("/create", (req : Request, res : Response) => {
    isBanned(req, res)
        .then((bool: boolean)=>{
            if (!bool)
                res.render("threads/create", {'user':req.cookies.username});
        })
});

router.post("/create", async (req: Request, res: Response) => {
    if (!(await isBanned(req, res))) {
            await createThread(req, res).then((id : any) => {res.redirect("/threads/"+id.insertedId.toString())});

        }
});

router.post("/delete/:id", async (req: Request, res: Response) => {
    if (await deleteThread(req, res)) res.redirect('/profile/home');
});

router.post("/edit/:id", async (req: Request, res: Response) => {
    let threadID = new ObjectId(req.params.id);

    if (await canModify_Thread(ObjectId(req.params.id), req, res))
        res.render("threads/edit", {
            'user':req.cookies.username,
            thread: await getThread(threadID).catch((err: any) => console.log(err))
        });
});

router.post("/confirm", async (req: Request, res: Response) => {

    await editThread(req, res);
    res.redirect('/profile/home');
});

router.get("/editPost/:id", (req: Request, res: Response) => {
    postsCol.findOne({_id:ObjectId(req.params.id)})
        .then((post : any)=>{
            if (post === null) {
                res.render("index", {
                    "message": "post does not exist",
                    "user": req.cookies.username
                });
                return;
            }
            canModify(post, req, res)
                .then((bool:boolean)=> {
                    if (bool) {
                        res.render("threads/editPost", {"user": req.cookies.username, post: post})
                    }
                })
        });
});
router.post("/editPost/:parent/:id", (req: Request, res: Response) => {
    canModify_Post(ObjectId(req.params.id), req, res)
        .then((bool: boolean) => {
            if (bool)
                postsCol.updateOne({_id: ObjectId(req.params.id)}, {$set: {content: req.body.content}})
                    .then(()=>{res.redirect("/threads/"+req.params.parent)})
        })
});
router.get("/editThread/:id", (req: Request, res: Response) => {
    console.log(req.params.id);
    console.log("lilypad");
    canModify_Thread(req.params.id, req, res)
        .then((bool: boolean) => {
            console.log("tree people");
            if (bool) {
                console.log("johny depp");
                console.log(req.params.id);
                threadsCol.findOne({_id: ObjectId(req.params.id)})
                    .then((thread: any) => {
                        if (thread === null) res.render("index", {
                            "message": "thread does not exist",
                            "user": req.cookies.username
                        })
                        res.render("threads/edit", {"user": req.cookies.username, thread: thread})
                    })
            } else {
                console.log("baby pie");
            }
        })
});

router.get("/:thread", (req: Request, res: Response) => {
    getThread(req.params.thread)
        .then((thread:any)=>{
            if (thread === null) res.render("index", {"message":"couldn't find page, sorry"});
            else {
                isAdmin(req)
                    .then((amAdmin:boolean)=> {
                        let thisIsMine : boolean;
                        thisIsMine = amAdmin || req.cookies.username === thread.author;
                        findAllPosts(req.params.thread)
                            .then((posts)=>{
                                let isMine: any;
                                if (!amAdmin) isMine = posts.map((post : any)=> (post.author == req.cookies.username));
                                else isMine = posts.map((post : any)=> true);
                                res.render("threads/thread", {    user:req.cookies.username,
                                    thread:thread,
                                    posts:posts,
                                    target:"/threads/"+req.params.thread,
                                    isMine: isMine,
                                    thisIsMine: thisIsMine
                                })
                            })
                    });
            }
        })
});

router.post("/:thread", (req: Request, res: Response) => {
    isBanned(req, res)
        .then((bool:boolean)=>{
            if (!bool) {
                if (!isLoggedIn_NoRender(req, res)) return;
                let new_post = new createPostForm(req);
                if (new_post.isFormComplete(res)) {
                    postsCol.insertOne({content:new_post.content, author:new_post.author,parentThread:new_post.parentThread, date:new_post.date, ms:new_post.ms})
                        .then(()=>{
                            res.redirect("/threads/"+req.params.thread);
                        })
                }
            }
        })
});



module.exports = router;
