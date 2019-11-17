import { Db } from "mongodb";

class DbClient {
    private db!: Db;
    //public database: any;

    public async connect() {
        // setup cloud database
        try {
            const MongoClient = require('mongodb').MongoClient;
            const uri = "mongodb+srv://admin:m39dDRPEHac6UCWj@3-2-fjpaq.gcp.mongodb.net/test";
            const client = await MongoClient(uri, { useUnifiedTopology: true, useNewUrlParser: true }).connect();
            this.db = client.db("bbworld");
            console.log("Connected to cloud db");
            return this.db;
        }
        catch( error ) {
            console.log("Unable to connect to cloud db");
            return;
        }
    }
}

export = new DbClient();
