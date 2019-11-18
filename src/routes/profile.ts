import {Request, Response, Router} from "express";
import {isLoggedIn, isValidProfile, createNewProfile, login, isLoginFormComplete} from "../managers/profile";
const router = Router();

router.get("/create", (req : Request, res: Response) => {
    if (!isLoggedIn(req, res)) res.render("placeholders/create_account");
});
router.post("/create", (req : Request, res : Response) => {
    if (isLoggedIn(req, res)) return;

    let name = req.body.name;
    let email = req.body.email;
    let pw = req.body.password;

    isValidProfile(req, res)
        .then((bool : boolean) => {
            if (bool) {
                createNewProfile(name, email, pw)
                    .then(()=>{
                        return login(res, name, pw)
                    })
            }
        })
});
router.get("/login", (req : Request, res : Response) => {
    if (!isLoggedIn(req, res)) res.render("placeholders/login");
});
router.post("/login", (req : Request, res : Response) => {
    if (!isLoggedIn(req, res) || !isLoginFormComplete(req, res)) login(res, req.body.name, req.body.pw).then();
});
router.get("/logout", (req : Request, res : Response) => {
    res.clearCookie("username");
    res.render("placeholders/login");
});

module.exports = router;
