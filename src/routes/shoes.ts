import {Request, Response, NextFunction, Router} from "express";
import DbClient = require("../DbClient");
import {refresh, like, dislike, insertShoe, sortShoes, deleteShoe} from "../managers/shoe";
import {isLoggedIn, isLoggedIn_NoRender} from "../managers/profile";
const router = Router();


// sending create profile page to client
router.get("/browse", (req, res, next) => {
        sortShoes()
            .then((shoes:any) => {
                res.render("shoes/browse", {'user':req.cookies.username, shoes: shoes[0], likes : shoes[1], dislikes: shoes[2]});
            })
    });

router.get("/likes/:id", (req, res) =>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
        }else {
        like(res, req)
            .then((conf: any) => {
                res.redirect("/shoes/browse");
            })
    }
});

router.get("/dislikes/:id", (req, res) =>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else {
        dislike(res, req)
            .then((conf: any) => {
                res.redirect("/shoes/browse");
            })
    }
});

insertShoe("/img/LBJ17.jpg", "NIKE Lebron 17", "Lebron James", "$170 US", "An amazing shoe",0, 0)
.then((confirm:any)=>{console.log("number23")});

insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", "$140 US", "An amazing shoe",0, 0)
    .then((confirm:any)=>{console.log("number2")});

insertShoe("/img/greek.jpg", "NIKE Zoom Freak 1", "Giannis Antetekounmpo", "$120 US", "An amazing shoe",0, 0)
    .then((confirm:any)=>{console.log("number34")});

insertShoe("/img/kd.jpg", "NIKE Zoom KD12", "Kevin Durant", "$150 US", "An amazing shoe",0, 0)
    .then((confirm:any)=>{console.log("KD")});

insertShoe("/img/jordan.jpg", "Jordan Why Not Zer0.2", "Michael Jordan", "$125 US", "an amazing shoe", 0, 0)
    .then((confirm:any)=>{console.log("MJ")});

insertShoe("/img/jordan2.jpg", "Air Jordan 34", "Michael Jordan", "$180 US", "an amazing shoe", 0, 0)
    .then((confirm:any)=>{console.log("MJ")});

insertShoe("/img/harden.jpg", "Adidas Harden Vol.4", "James Harden", "$130 US", "an amazing shoe", 0, 0)
    .then((confirm:any)=>{console.log("Harden")});

insertShoe("/img/kobe.jpg", "NIKE Kobe AD NXT FF", "Kobe Bryant", "$200 US", "an amazing shoe", 0, 0)
    .then((confirm:any)=>{console.log("KOBE!")});

insertShoe("/img/dom.jpg", "Adidas D.O.N. Issue 1", "Donavan Mitchell", "$100 US", "an amazing shoe", 0, 0)
    .then((confirm:any)=>{console.log("DON")});
module.exports = router;
