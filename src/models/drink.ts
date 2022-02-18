
    export interface Drink{
        idDrink: string;
        strDrink: string;
        strDrinkAlternate?: any;
        strTags: string;
        strVideo: string;
        strCategory: string;
        strIBA: string;
        strAlcoholic: string;
        strGlass: string;
        strInstructions: string;
        strInstructionsES?: any;
        strInstructionsDE?: string;
        strInstructionsFR?: any;
        strInstructionsIT: string;
        strDrinkThumb: string;
        strIngredient1: string;
        strIngredient2: string;
        strIngredient3: string;
        strIngredient4: string;
        strIngredient5: string;
        strIngredient6: string;
        strIngredient7?: any;
        strMeasure1: string;
        strMeasure2: string;
        strMeasure3: string;
        strMeasure4: string;
        strMeasure5: string;
        strMeasure6: string;
        strMeasure7?: any;
        strImageSource: string;
        strImageAttribution: string;
        strCreativeCommonsConfirmed: string;
        dateModified: string;
    }

    export interface  drinksResponce{
        drinks:Drink[]
    }