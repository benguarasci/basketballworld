import {Request, Response, NextFunction, Router} from "express";
import DbClient = require("../DbClient");

import {refresh, like, dislike, all} from "../managers/shoe";
import {isLoggedIn, isLoggedIn_NoRender} from "../managers/profile";
const router = Router();

// sending create profile page to client
router.get("/browse", (req, res, next) => {
    //res.render("shoes/browse");

    DbClient.connect()
        .then((db:any) => {
            db!.collection('data').countDocuments()
                .then((i:any) => {
                    if(i === 0){
                        db!.collection('data').insertMany([
                            {name: "Lebron", likes: 0, dislikes: 0},
                            {name: "Kawhi", likes: 0, dislikes: 0},
                            {name: "Giannis", likes: 0, dislikes: 0},
                            {name: "KD", likes: 0, dislikes: 0},

                        ]).then((i:any) => {
                            res.render('shoes/browse', {lebronlikes: 0, lebrondislikes: 0, kawhilikes: 0, kawhidislikes: 0, giannislikes: 0, giannisdislikes: 0, KDlikes: 0, KDdislikes: 0});
                        })
                    }else{
                        refresh(res, req).then((val:any)=>{});
                    }
                })
        })


});

router.get("/lebronlike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else{
    like(res, "Lebron")
        .then((confirm: any)=>refresh(res, req))
        .then((confirm:any)=>{});
    }

});

router.get("/lebrondislike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        dislike(res, "Lebron")
            .then((confirm: any) => refresh(res, req))
            .then((confirm: any) => {});
    }
});

router.get("/kawhilike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        like(res, "Kawhi")
            .then((confirm: any) => refresh(res, req))
            .then((confirm: any) => {
            });
    }
});

router.get("/kawhidislike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        dislike(res, "Kawhi")
            .then((confirm: any) => refresh(res, req))
            .then((confirm: any) => {
            });
    }
});

router.get("/giannislike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        like(res, "Giannis")
            .then((confirm: any) => refresh(res, req))
            .then((confirm: any) => {
            });
    }
    });
router.get("/giannisdislike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        dislike(res, "Giannis")
            .then((confirm: any) => refresh(res, req))
            .then((confirm: any) => {
            });
    }
});

router.get("/kdlike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        like(res, "KD")
            .then((confirm: any) => refresh(res, req))
            .then((confirm: any) => {
            });
    }
});
router.get("/kddislike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        dislike(res, "KD")
            .then((confirm: any) => refresh(res, req))
            .then((confirm: any) => {
            });
    }
});

module.exports = router;
