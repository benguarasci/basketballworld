const DbClient = require("../DbClient");

before(async() => {
    await DbClient.connect("bbworld_test");
    console.log("Connected to database: 'bbworld_test'\n");
});

export class MockReq {
    public body : any;
    public cookies : any;
    public params : any;
    constructor() {
        this.body = null;
        this.cookies = null;
        this.params = null;
    }
    setUserName(name:string) {
        this.cookies = {username:name}
    }
}
export class MockRes {
    public options : any;
    constructor() {
        this.options = null;
    }
    render( pug : string, options : any) {
        this.options = options;
    }
}