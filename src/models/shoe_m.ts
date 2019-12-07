class userMap{
    name: string;
    status: number;

    constructor(name: string, status: number, ){
        this.name = name;
        this.status = status;
    }
}

export class Shoe {

    image: any;
    model: string;
    player: string;
    price: number;
    description: string;
    likes: number;
    dislikes: number;
    users: userMap[];

    constructor(image: any, model: string, player: string, price: number, description: string, likes: number, dislikes: number) {
        this.image = image;
        this.model = model;
        this.player = player;
        this.price = price;
        this.description = description;
        this.likes = likes;
        this.dislikes = dislikes;
        this.users = [];
            //this.users.push(new userMap("", 1));
    }

    isValid() {
        return(this.model != "" && this.player != "");
    }
}
