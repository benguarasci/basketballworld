export class User{

    name: string;
    email: string;
    pw: string;

    constructor(name: string, email: string, pw: string) {
        this.name = name;
        this.email = email;
        this.pw = pw;
    }

    isValid() {
        return(this.name != '' && this.email != '' && this.pw != '');
    }

    verify(pw: string) {
        return(this.pw === pw);
    }
}
