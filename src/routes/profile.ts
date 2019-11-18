import {Request, Response, Router} from "express";
import {isLoggedIn, isValidProfile, createNewProfile, login, isLoginFormComplete} from "../managers/profile";
import {pushTag, popTag, editEmail, editPassword} from "../modules/alterAccount";

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

// Viewing user profile
router.get("/home", async (req : Request, res : Response) => {
    res.render("profile/home", {
        "user": await profileRetriever.retrieveProfile(req, res).catch((e: any) => console.log(e))
    });
});

// Editing user profile
router.post("/pushtag", async (req : Request, res : Response) => {
    await pushTag(req, res);
    res.redirect('/home');
});

router.post("/poptag", async (req : Request, res : Response) => {
    await popTag(req, res);
    res.redirect('/home');
});
router.post("/editemail", async (req : Request, res : Response) => {
    await editEmail(req, res);
    res.redirect('/home');
});
router.post("/editpassword", async (req : Request, res : Response) => {
    await editPassword(req, res);
    res.redirect('/home');
});

module.exports = router;
