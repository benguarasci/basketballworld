import {Request, Response, NextFunction, Router} from "express";
const DbClient = require("../DbClient");
const router = Router();

router.get("/", (req : Request, res : Response) => {
    DbClient.connect()
        .then((db: any) => db!.collection("threads").find().toArray())
        .then((arr:any) => {
            let links = arr.map((thread : any) => "/threads/"+thread._id.toString()+":thread");
            res.render("placeholders/threads", {threads : arr, links : links, });
        }).catch ((err: any) => {
            console.log(err.message);
        })
});
router.get("/:id", (req: Request, res: Response) => {
    res.send("congratulations");
});
router.get("/create", (req : Request, res : Response) => {
    res.render("placeholders/create_threads");
});
router.post("/create", (req: Request, res: Response) => {
    if (!("username" in req.cookies)) {
        res.render("placeholders/create_threads", {"message": "you are not logged in"});
        return;
    }
    let title = req.body.title;
    let desc = req.body.description;
    if (title === "" || desc == "") {
        res.render("placeholders/create_threads", {"message": "please complete all inputs"});
        return;
    }
    let owner = req.cookies.username;
    let d = new Date();
    let date = d.toString();
    let ms = d.getTime();
    let count = 0;
    DbClient.connect()
        .then ((db : any) => db!.collection("threads").insertOne({title: title, description: desc, owner: owner, date: date, ms: ms, count: count, last: date, by:owner}))
        .then ((id : any) => {console.log(id)})
        .catch((err: any) => {console.log(err)});
});
module.exports = router;