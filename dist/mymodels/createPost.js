"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ObjectId = require("mongodb").ObjectID;
var createThreadForm = /** @class */ (function () {
    function createThreadForm(req) {
        this.content = req.body.content;
        this.author = req.cookies.username;
        this.d = new Date();
        this.date = this.d.toString();
        this.ms = this.d.getTime();
        this.parentThread = ObjectId(req.params.thread);
        console.log(this.parentThread);
    }
    // Checks to see if the form is complete and not empty
    createThreadForm.prototype.isFormComplete = function (res) {
        if (this.content === "") {
            res.render("threads/create", { 'user': this.author, "message": "please complete all inputs" });
            return false;
        }
        // Ensures the form is clean
        return true;
    };
    return createThreadForm;
}());
exports.default = createThreadForm;
