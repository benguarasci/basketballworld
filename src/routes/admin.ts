import {Request, Response, Router} from "express";
import {isLoggedIn} from "../managers/profile";
const DbClient = require("../DbClient");
const router = Router();
const ObjectId = require("mongodb").ObjectID;
import createThreadForm from "../mymodels/createThread";

async function retrieveProfiles() {
    let db = await DbClient.connect();
    return await db.collection("users").find({}).toArray();
}


router.get("/", (req : Request, res : Response) => {
    res.render("placeholders/admin", {'user':req.cookies.username});
});
router.get("/profiles", (req: Request, res: Response) => {
    retrieveProfiles()
        .then((profiles : any) => {
            res.send(profiles);
        })
});

module.exports = router;