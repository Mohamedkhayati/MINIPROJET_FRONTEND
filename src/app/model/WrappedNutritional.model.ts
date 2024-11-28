import { Nutritional} from "./nutritional.model";
export class NutritionalWrapper{
    _embedded!: { nutritionals: Nutritional[]};
}