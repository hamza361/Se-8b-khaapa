export class Product{
    _id:string;
    name:string;
    image:string;
    price:number;
    quantity:number
    constructor(_id:string,name:string,image:string,price:number,quantity:number){
        this._id=_id;
        this.name = name;
        this.image = image;
        this.price = price;
        this.quantity = quantity;

    }
}