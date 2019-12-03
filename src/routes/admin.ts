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
async function deleteProfileByID(id : string) {
    console.log(id);
    let db = await DbClient.connect();
    id = ObjectId(id);
    return await db.collection("users").deleteOne({"_id": ObjectId(id)});
}
router.get("/", (req : Request, res : Response) => {
    res.render("placeholders/admin", {'user':req.cookies.username});
});
router.get("/profiles", (req: Request, res: Response) => {
    retrieveProfiles()
        .then((profiles : any) => {
            let ids = profiles.map((profile:any)=>profile._id.toString());
            console.log(ids);
            res.render("placeholders/admin_list_profiles", {'user':req.cookies.username, "profiles": profiles, "ids": ids});
        })
});
router.get("/delete/:id", (req: Request, res: Response) => {
    console.log("fail");
    deleteProfileByID(req.params.id)
        .then((val : any) => {
            res.redirect("/admin/profiles");
        })
});

module.exports = router;