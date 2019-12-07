const ObjectId = require("mongodb").ObjectID;

export class Thread {

    _id: any;
    user: string;
    title: string;
    content: string;
    tags: string[];

    constructor(_id: string, user: string, title: string, content: string, tags: string[]) {
        this._id = ObjectId(_id);
        this.user = user;
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    isValid() {
        return(this.title != "" && this.content != "");
    }
}
