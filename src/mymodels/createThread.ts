import {Request, Response} from "express";
const DbClient = require("../DbClient");
export default class createThreadForm {
    public title : String;
    public description : String;
    public owner : String;
    public d : any;
    public date : String;
    public ms : String;
    public count : Number;
    public tags : string[];
    constructor (req : Request) {
        this.title = req.body.title;
        this.description = req.body.description;
        this.owner = req.cookies.username;
        this.d = new Date();
        this.date = this.d.toString();
        this.ms = this.d.getTime();
        this.count = 0;
        this.tags = [req.body.tag0, req.body.tag1, req.body.tag2];
    }
    isFormComplete(res : Response) {
        if (this.title === "" || this.description == "") {
            res.render("placeholders/create_threads", {'user':this.owner, "message": "please complete all inputs"});
            return false;
        }
        return true;
    }
}