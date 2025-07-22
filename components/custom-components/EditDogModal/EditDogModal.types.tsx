import { DogData } from "../DisplayCard/displayCard.types";

export interface EditDogModalProps{
    oldDogData:DogData;
    isOpen:boolean;
    onSubmit:(oldDogData:DogData, newDogdata:DogData)=>void;
    onClose:()=>void;
}
