import { Food } from "src/app/food/food.model";

export interface Cart{
    food:Food[];
    total:number;
}