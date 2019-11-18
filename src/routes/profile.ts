import {Request, Response, Router} from "express";
import {isLoggedIn, isValidProfile, createNewProfile, retrieveProfile, login, isLoginFormComplete, pushTag, pullTag, editEmail, editPassword} from "../managers/profile";

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
router.get("/home", async (req : Request, res : Response) => {
    res.render("profile/home", {
        "user": await retrieveProfile(req, res).catch((e: any) => console.log(e))
    });
});
router.post("/pushtag", async (req : Request, res : Response) => {
    await pushTag(req, res);
    res.redirect('/profile/home');
});
router.post("/pulltag", async (req : Request, res : Response) => {
    await pullTag(req, res);
    res.redirect('/profile/home');
});
router.post("/editemail", async (req : Request, res : Response) => {
    await editEmail(req, res);
    res.redirect('/profile/home');
});
router.post("/editpassword", async (req : Request, res : Response) => {
    await editPassword(req, res);
    res.redirect('/profile/home');
});

module.exports = router;
