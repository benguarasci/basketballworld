import * as express from "express";
import DbClient = require("../DbClient");

let router = express.Router();


/* GET view page. */
router.get('/view', (req, res, next) => {
    DbClient.connect()
        .then((db: any) => {
            return db!.collection("threads").find().toArray();
            //let myJSON = JSON.stringify(threads);

            //res.render('threads/view' , {title: "hi", content: "hello"});

        })
        .then((result:any) => {
            console.log(result);
            let myJSON = JSON.stringify(result);
            res.render('threads/view' , {title: myJSON, content: "hi"});

        })
        .catch((err: any) => {
            console.log(err.message);
        });

});

router.get('/create', (req, res, next) => {
    res.render('threads/create');
});

router.post('/create', (req, res)=>{
    let title = req.body.title;
    let content = req.body.content;

    DbClient.connect()
        .then((db: any) => {
            return db.collection("threads").insertOne({title: title, content: content});
        })
        .catch((err: any) => {
            console.log(err.message);
        });

    DbClient.connect()
        .then((db: any) => {
            return db!.collection("threads").find().toArray();
        })
        .then((result:any) => {
            console.log(result);
            res.send(result);
        })
        .catch((err: any) => {
            console.log(err.message);
        });

    res.render('threads/create');

});

module.exports = router;