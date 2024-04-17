import { Ingredient } from './ingredients.model';

export class Recipe {
  constructor(
    public imgPath: string,
    public name: string,
    public price: number,
    public desc: string,
    public ingredients: Ingredient[],
    public type?: string
  ) {}
}
