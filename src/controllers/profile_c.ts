import DbClient = require("../DbClient");
import {User} from "../models/user";

export class Profile{

    public static userExists(user: User, res: any) {
        DbClient.connect().then((db: any) => {
            return db!.collection("users").find({name: user.name}).toArray();
        }).then((array: any) => {
            if (array.length !== 0) {
                console.log("user exists");
                res.send("user exists");
            } else {
                console.log("user does not exist");
            }
        });
    }

    public static insert(user: User, res: any) {
        DbClient.connect()
            .then((db: any) => {
                return db!.collection("users").insertOne(user);
            })
            .then((db: any) => {
                console.log("user created");
                res.send("account creation was a success");
            })
            .catch((err: any) => {
                console.log(err.message);
            });
    }

    public static setCookie(user: User, res: any) {
        res.cookie("username", user.name);
    }

    public static login(user: User, res: any) {
        DbClient.connect()
            .then((db:any) => db!.collection("users").findOne({name: user.name}))
            .then ((account:any) => {
                if (account === null) res.send("username or password is incorrect");
                else if (account.pw !== user.pw) res.send("username or password is incorrect");
                else {
                    this.setCookie(user, res);
                    res.send("login successful");
                }
            }).catch ((err: any) => {
                console.log(err.message);
        })
    }

    public static home(username: string, res: any) {
        DbClient.connect()
            .then((db:any) => db!.collection("users").findOne({name: username}))
            .then ((user:any) => {
                console.log(user.email);
                res.render("profile/home", {user: user});
            }).catch ((err: any) => {
                console.log(err.message);
        })
    }

}