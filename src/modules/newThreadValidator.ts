import {Request, Response} from "express";
const DbClient = require("../DbClient");

export class threadvalidator {
    constructor() {}

    async validateNewThread(req: Request, res: Response) {
        let title = req.body.title;
        let desc = req.body.description;

        if(title !== "" || desc !== ""){
            return[false, "missing thread elements"]
        }else{
            return[true, "valid thread"]
        }
    }
}