export class Threads {

    title: string;
    content: string;

    constructor(title: string, content: string) {
        this.title = title;
        this.content = content;
    }

    isValid() {
        return(this.title != "" && this.content != "");
    }

}
