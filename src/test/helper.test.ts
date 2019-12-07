const DbClient = require("../DbClient");

before(async() => {
    await DbClient.connect("bbworld_test");
    console.log("Connected to database: 'bbworld_test'\n");
});

export class MockReq {
    public body: any;
    public cookies: any;
    public params: any;
    constructor() {
        this.body = null;
        this.cookies = null;
        this.params = null;
    }
    setUserName(name: string) {
        this.cookies = { username: name }
    }
    setThreadID(id: string) {
        this.params = {
            id: id
        }
    }
    setThreadAspects(title: string, desc: string, tag0: string, tag1: string, tag2: string) {
        this.body = {
            title: title,
            description: desc,
            tag0: tag0,
            tag1: tag1,
            tag2: tag2
        }
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