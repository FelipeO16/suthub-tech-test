export interface ShortRecipe {
  id: number;
  name: string;
  image: string;
  tags: Array<string>;
}

export interface Recipe extends ShortRecipe {
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  rating: number;
  servings: number;
  ingredients: Array<string>;
  instructions: Array<string>;
}

export type Tag = string;
