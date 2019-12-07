import {Request, Response, Router} from "express";
import {isAdmin, isAdmin_render} from "../managers/activityHandling";
//import {usersCol} from "../app";
const DbClient = require("../DbClient");
const router = Router();
const ObjectId = require("mongodb").ObjectID;

async function retrieveProfiles() {
    return await DbClient.usersCol.find({}).toArray();
}
async function deleteProfileByID(id : string) {
    id = ObjectId(id);
    return await DbClient.usersCol.deleteOne({"_id": ObjectId(id)});
}
router.get("/", (req : Request, res : Response) => {
    isAdmin_render(req, res)
        .then((bool : boolean)=>{
            if (bool)
                res.render("placeholders/admin", {'user': req.cookies.username});
        })
});
router.get("/profiles", (req: Request, res: Response) => {
    isAdmin_render(req, res)
        .then((bool : boolean) => {
            if (bool)
                retrieveProfiles()
                    .then((profiles: any) => {
                        let ids = profiles.map((profile: any) => profile._id.toString());
                        res.render("placeholders/admin_list_profiles", {
                            'user': req.cookies.username,
                            "profiles": profiles,
                            "ids": ids
                        });
                    })
        })

});
router.get("/delete/:id", (req: Request, res: Response) => {

    isAdmin_render(req, res)
        .then((bool : boolean) => {
            if (bool) {
                deleteProfileByID(req.params.id)
                    .then((val: any) => {
                        res.redirect("/admin/profiles");
                    })
            }
        })
});
async function makeUserAdmin(user_id : any) {

    await DbClient.usersCol.updateOne({_id:ObjectId(user_id)}, {$set: {level : 2}});
}
async function makeUserBan(user_id: any) {
    await DbClient.usersCol.updateOne({_id:ObjectId(user_id)}, {$set: {level : 0}});
}
async function makeUserNormal(user_id: any) {
    await DbClient.usersCol.updateOne({_id:ObjectId(user_id)}, {$set: {level : 1}});
}
router.get("/makeAdmin/:id", (req:Request, res:Response) => {
   isAdmin_render(req, res)
       .then((bool : boolean) => {
           if (bool) {
               makeUserAdmin(req.params.id)
                   .then(()=>{
                       res.redirect("/admin/profiles");
                   });
           }
       })
});
router.get("/makeNormal/:id", (req:Request, res:Response) => {
    isAdmin_render(req, res)
        .then((bool : boolean) => {
            if (bool) {
                makeUserNormal(req.params.id)
                    .then(()=>{
                        res.redirect("/admin/profiles");
                    });
            }
        })
});
router.get("/ban/:id", (req:Request, res:Response) => {
    isAdmin_render(req, res)
        .then((bool : boolean) => {
            if (bool) {
                makeUserBan(req.params.id)
                    .then(()=>{
                        res.redirect("/admin/profiles");
                    });
            }
        })
});
async function createRoot() {
    let root = await DbClient.usersCol.findOne({name: "root"});
    if (root == null) {
        //await usersCol.insertOne({name: "root", email:"notreal@uvic.ca", pw: "root", level: 3})
        await DbClient.usersCol.insertOne({name: "root", email: "email@email.com", pw: "root", level: 2});
    } else if (root.level != 2) {
        await DbClient.usersCol.updateOne({name: "root"}, {$set: {level : 2}})
    }
    let accounts = await DbClient.usersCol.find().toArray();
    return;
}
router.get("/createRoot", (req:Request, res:Response)=>{
    createRoot()
        .then(()=>{
            res.render("index", {'user':req.cookies.user, 'message':"root created"});
        })
});

module.exports = router;