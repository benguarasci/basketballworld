const { profileRetriever } = require("../modules/profileRetriever")

class Profile {

    name: string;
    email: string;
    pw: string;
    tags: string[];

    constructor(name: string, email: string, pw: string, tags: string[]) {
        this.name = name;
        this.email = email;
        this.pw = pw;
        this.tags = tags;
    }

    isValid() {
        return(this.name != "" && this.email != "" && this.pw != "");
    }

    verify(pw: string) {
        return(this.pw === pw);
    }
}
export = new Profile;
