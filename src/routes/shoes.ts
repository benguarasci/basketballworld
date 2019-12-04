import {Request, Response, NextFunction, Router} from "express";
import DbClient = require("../DbClient");
import {refresh, like, dislike, insertShoe} from "../managers/shoe";
import {isLoggedIn, isLoggedIn_NoRender} from "../managers/profile";
const router = Router();

async function listShoes() {
    let db = await DbClient.connect();
    console.log("listshoes:");

    let shoes = await db!.collection("shoes").find().toArray();
    console.log(shoes);
    let likes = shoes.map((shoe: any) => "/shoes/likes/" + shoe._id.toString());
    let dislikes = shoes.map((shoe: any) => "/shoes/dislikes/" + shoe._id.toString());
    return [shoes, likes, dislikes];
}

// sending create profile page to client
router.get("/browse", (req, res, next) => {
        console.log("hello");
        listShoes()
            .then((shoes:any) => {
                res.render("shoes/browse", {shoes: shoes[0], likes : shoes[1], dislikes: shoes[2]});
            })
    });

router.get("/likes/:id", (req, res) =>{
    console.log("in route");
    console.log("cheerios");
    like(res, req)
        .then((conf:any)=>{
            console.log("put me");
            res.redirect("/shoes/browse");
        })
});

router.get("/shoes/dislikes/:id", (req, res) =>{


});
/*
router.get("/lebronlike", (req : Request, res: Response)=>{
    if (!isLoggedIn_NoRender(req, res)) {
        res.render("profile/login")
    }else{
    like(res, "Lebron")
        .then((confirm: any)=>refresh(res, req))
        .then((confirm:any)=>{});
    }
*/




/*insertShoe("/img/LBJ17.jpg", "NIKE Lebron 17", "Lebron James", "$170 US", "An amazing shoe",0, 0)
.then((confirm:any)=>{});
*/
insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", "$140 US", "An amazing shoe",0, 0)
    .then((confirm:any)=>{});

insertShoe("/img/number2.jpg", "New Balance OMN1S", "Kawhi Leonard", "$140 US", "An amazing shoe",0, 0)
    .then((confirm:any)=>{});


module.exports = router;
