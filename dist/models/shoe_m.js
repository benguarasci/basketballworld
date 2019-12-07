"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var userMap = /** @class */ (function () {
    function userMap(name, status) {
        this.name = name;
        this.status = status;
    }
    return userMap;
}());
var Shoe = /** @class */ (function () {
    function Shoe(image, model, player, price, description, likes, dislikes) {
        this.image = image;
        this.model = model;
        this.player = player;
        this.price = price;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
        this.users = [];
        //this.users.push(new userMap("", 1));
    }
    Shoe.prototype.isValid = function () {
        return (this.model != "" && this.player != "");
    };
    return Shoe;
}());
exports.Shoe = Shoe;
