import {Request, Response, NextFunction, Router} from "express";
import DbClient = require("../DbClient");
import {refresh, like, dislike, insertShoe, sortShoes, deleteShoe} from "../managers/shoe";
import {isLoggedIn, isLoggedIn_NoRender} from "../managers/profile";
const router = Router();
const ObjectId = require("mongodb").ObjectID;


// sorts and renders shoes page.
router.get("/browse", (req, res, next) => {
        sortShoes({likes: -1})
            .then((shoes:any) => {
                res.render("shoes/browse", {'user':req.cookies.username, shoes: shoes[0], likes : shoes[1], dislikes: shoes[2]});
            })
    });

//filter href


//like button href
router.get("/likes/:id", (req, res) =>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
        }else {
        let ID = ObjectId(req.params.id);
        like(ID)
            .then((conf: any) => {
                res.redirect("/shoes/browse");
            })
    }
});

//dislike button href
router.get("/dislikes/:id", (req, res) =>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        let ID = ObjectId(req.params.id);
        dislike(ID)
            .then((conf: any) => {
                res.redirect("/shoes/browse");
            })
    }
});

router.get("/browse/popular", (req, res) =>{
    sortShoes({likes: -1})
        .then((shoes:any) => {
            res.render("shoes/browse", {'user':req.cookies.username, shoes: shoes[0], likes : shoes[1], dislikes: shoes[2]});
        })
});

router.get("/browse/pricelth", (req, res) =>{
    sortShoes({price: 1})
        .then((shoes:any) => {
            res.render("shoes/browse", {'user':req.cookies.username, shoes: shoes[0], likes : shoes[1], dislikes: shoes[2]});
        })
});

router.get("/browse/pricehtl", (req, res) =>{
    sortShoes({price: -1})
        .then((shoes:any) => {
            res.render("shoes/browse", {'user':req.cookies.username, shoes: shoes[0], likes : shoes[1], dislikes: shoes[2]});
        })
});


//Inserts each shoe into the database.
insertShoe("/img/LBJ17.jpg", "NIKE Lebron 17", "Lebron James", 170, "An amazing shoe",0, 0)
.then((confirm:any)=>{});

insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", 140, "An amazing shoe",0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/greek.jpg", "NIKE Zoom Freak 1", "Giannis Antetekounmpo", 120, "An amazing shoe",0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/kd.jpg", "NIKE Zoom KD12", "Kevin Durant", 150, "An amazing shoe",0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/jordan.jpg", "Jordan Why Not Zer0.2", "Michael Jordan", 125, "an amazing shoe", 0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/jordan2.jpg", "Air Jordan 34", "Michael Jordan", 180, "an amazing shoe", 0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/harden.jpg", "Adidas Harden Vol.4", "James Harden", 130, "an amazing shoe", 0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/kobe.jpg", "NIKE Kobe AD NXT FF", "Kobe Bryant", 200, "an amazing shoe", 0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/dom.jpg", "Adidas D.O.N. Issue 1", "Donavan Mitchell", 100, "an amazing shoe", 0, 0)
    .then((confirm:any)=>{});
module.exports = router;
