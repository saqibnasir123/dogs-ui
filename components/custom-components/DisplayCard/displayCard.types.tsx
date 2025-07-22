export interface DisplayCardProps{
    data: DogData;
    isLoggedIn:boolean;
    onEdit: (data: DogData)=>void;
    onDelete:(data:DogData)=>void;
}
export interface DogData{
    DogName:string;
    BreedList:string[];
}