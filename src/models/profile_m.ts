import {Shoe} from "./shoe_m";
export class Profile {

    name: string;
    email: string;
    pw: string;
    tags: string[];
    shoes: Shoe[];

    constructor(name: string, email: string, pw: string, tags: string[], shoes: Shoe[]) {
        this.name = name;
        this.email = email;
        this.pw = pw;
        this.tags = tags;
        this.shoes = shoes;
    }

    isValid() {
        return(this.name != "" && this.email != "" && this.pw != "");
    }

    verify(pw: string) {
        return(this.pw === pw);
    }
}
