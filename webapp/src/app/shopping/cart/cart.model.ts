import { Food } from "src/app/food/food.model";

export interface Cart{
    items:[{
        itemId:string;
        food:Food;
        quantity?:number;
    }]
    total:number;
}