"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DbClient = require("../DbClient");
var createThreadForm = /** @class */ (function () {
    function createThreadForm(req) {
        this.title = req.body.title;
        this.desc = req.body.description;
        this.owner = req.cookies.username;
        this.d = new Date();
        this.date = this.d.toString();
        this.ms = this.d.getTime();
        this.count = 0;
    }
    createThreadForm.prototype.isFormComplete = function (res) {
        if (this.title === "" || this.desc == "") {
            res.render("placeholders/create_threads", { 'user': this.owner, "message": "please complete all inputs" });
            return false;
        }
        return true;
    };
    return createThreadForm;
}());
exports.default = createThreadForm;
