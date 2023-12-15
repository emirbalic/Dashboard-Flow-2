import { ICategory } from "./ICategory";
import { ISupplier } from "./ISupplier";

export interface IProduct{
    
productName: string;
supplier: ISupplier;
category: ICategory;
unitPrice: number;
unitsInStock: number;
unitsOnOrder: number;
}