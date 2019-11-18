"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var DbClient = require("../DbClient");
var router = express_1.Router();
// sending create profile page to client
router.get("/browse", function (req, res, next) {
    //res.render("shoes/browse");
    DbClient.connect()
        .then(function (db) {
        db.collection('data').countDocuments()
            .then(function (i) {
            if (i === 0) {
                db.collection('data').insertMany([
                    { name: "Lebron", likes: 0, dislikes: 0 },
                    { name: "Kawhi", likes: 0, dislikes: 0 },
                    { name: "Giannis", likes: 0, dislikes: 0 },
                    { name: "KD", likes: 0, dislikes: 0 },
                ]).then(function (i) {
                    res.render('shoes/browse', { lebronlikes: 0, lebrondislikes: 0, kawhilikes: 0, kawhidislikes: 0, giannislikes: 0, giannisdislikes: 0, KDlikes: 0, KDdislikes: 0 });
                });
            }
            else {
                db.collection('data').find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            }
        });
    });
});
router.get("/lebronlike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "Lebron" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { likes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
router.get("/lebrondislike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "Lebron" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { dislikes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
router.get("/kawhilike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "Kawhi" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { likes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
router.get("/kawhidislike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "Kawhi" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { dislikes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
router.get("/giannislike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "Giannis" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { likes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
router.get("/giannisdislike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "Giannis" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { dislikes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
router.get("/kdlike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "KD" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { likes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
router.get("/kddislike", function (req, res) {
    DbClient.connect()
        .then(function (db) {
        db.collection("data").findOne({ name: "KD" })
            .then(function (like) {
            return db.collection("data").updateOne({ _id: like._id }, { $inc: { dislikes: 1 } })
                .then(function (id) {
                db.collection("data").find().toArray()
                    .then(function (data) {
                    res.render('shoes/browse', { lebronlikes: data[0].likes, lebrondislikes: data[0].dislikes, kawhilikes: data[1].likes, kawhidislikes: data[1].dislikes, giannislikes: data[2].likes, giannisdislikes: data[2].dislikes, KDlikes: data[3].likes, KDdislikes: data[3].dislikes });
                });
            });
        });
    });
});
//
// const like = document.getElementById('like1');
// like.addEventListener('click', function (e) {
//     console.log('liked');
//
//     fetch('/clicked', {method: 'POST'})
//         .then(function (response) {
//             if(response.ok){
//                console.log("like recorded")
//                 return;
//             }
//             throw new Error("like did not reach database");
//         })
//         .catch(function(error){
//             console.log(error);
//         });
// });
module.exports = router;
