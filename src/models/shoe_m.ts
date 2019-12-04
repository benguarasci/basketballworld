export class Shoe {

    image: any;
    model: string;
    player: string;
    price: string;
    description: string;
    likes: number;
    dislikes: number;
    constructor(image: any, model: string, player: string, price: string, description: string, likes: number, dislikes: number) {
        this.image = image;
        this.model = model;
        this.player = player;
        this.price = price;
        this.description = description;
        this.likes = likes
        this.dislikes = dislikes;
    }

    isValid() {
        return(this.model != "" && this.player != "");
    }
}
