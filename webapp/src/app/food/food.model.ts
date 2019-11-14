export interface Food{
    id:number;
    name:string;
    price:number;
    imgSrc?:string;
    active:boolean;
    dateOfExpiry:Date;
    category:string;
    freeDelivery:boolean;
    quantity?:number;
}