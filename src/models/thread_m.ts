export class Thread {

    user: string;
    title: string;
    content: string;
    tags: string[];

    constructor(user: string, title: string, content: string, tags: string[]) {
        this.user = user;
        this.title = title;
        this.content = content;
        this.tags = tags;
    }

    isValid() {
        return(this.title != "" && this.content != "");
    }
}
