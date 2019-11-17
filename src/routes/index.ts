import {Request, Response, Router} from "express";
const router = Router();

/* GET home page. */

router.get("/", (req : Request, res: Response) => {
    res.render("placeholders/homepage", {"user": req.cookies.username});
});


module.exports = router;
