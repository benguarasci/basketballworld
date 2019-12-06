import {Request, Response} from "express";
const ObjectId = require("mongodb").ObjectID;
export default class createThreadForm {
    public content: String;
    public author: String;
    public d: any;
    public date: String;
    public ms: String;
    public parentThread : any;

    constructor(req: Request) {
        this.content = req.body.content;
        this.author = req.cookies.username;
        this.d = new Date();
        this.date = this.d.toString();
        this.ms = this.d.getTime();
        this.parentThread = ObjectId(req.params.thread);
        console.log(this.parentThread);
    }

    // Checks to see if the form is complete and not empty
    isFormComplete(res: Response) {
        if (this.content === "") {
            res.render("threads/create", {'user': this.author, "message": "please complete all inputs"});
            return false;
        }
        // Ensures the form is clean
        return true;
    }
}