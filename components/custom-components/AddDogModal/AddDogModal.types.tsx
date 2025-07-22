export interface AddDogModalProps{
    isOpen:boolean
    onSubmit:(dogName:string, breedList:string[])=>void;
    onClose:()=>void;
}