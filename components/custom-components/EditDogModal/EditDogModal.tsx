import {
  Button,
  CloseButton,
  Dialog,
  Field,
  For,
  HStack,
  Input,
  Portal,
} from "@chakra-ui/react"
import { EditDogModalProps } from "./EditDogModal.types";
import MultiWordInput from "../MultiTextInput/MutiWordInput";
import { useEffect, useState } from "react";
import { DogData } from "../DisplayCard/displayCard.types";

const EditDogModal:React.FC<EditDogModalProps> = ({
    oldDogData,isOpen, onSubmit, onClose
}) => {
    const [breedList, setBreedList]=useState<string[]>(oldDogData.BreedList)
    const [disabled, setDisabled]=useState(true)
    const [openModal,setOpenModal]=useState<boolean>(true)
    useEffect(()=>{
       if(breedList.length===oldDogData.BreedList.length){
        let isMismatched=false
        breedList.forEach((x)=>{if(!oldDogData.BreedList.includes(x)){
          isMismatched=true
        }})
        if (!isMismatched){
          setDisabled(true)
        }
       }else{
        setDisabled(false)
       }
    },[breedList])
    useEffect(()=>{
      setOpenModal(isOpen)
    },[])
    
  return (
    <HStack wrap="wrap" gap="4">
          <Dialog.Root
          
            key={"edit dog Modal"}
            placement={"center"}
            motionPreset="slide-in-bottom"
            open={isOpen}
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content color={'black'} bg={'white'}>
                  <Dialog.Header>
                    <Dialog.Title>Edit Dog</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Field.Root readOnly>
                        <Field.Label>
                                Dog Name
                        </Field.Label>
                        <Input value={oldDogData.DogName}/>
                    </Field.Root>
                    <Field.Root mt={"1rem"}>
                        <Field.Label>
                                Dog Breed
                        </Field.Label>
                        <MultiWordInput wordList={oldDogData.BreedList} onWordsChange={setBreedList}/>
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Button color={'black'} _hover={{backgroundColor:'gray.400', color:'white'}} border={'solid 1px'} disabled={disabled} onClick={()=>{
                      const newDogData:DogData={
                        DogName: oldDogData.DogName,
                        BreedList:breedList,

                      }
                      onSubmit(oldDogData,newDogData)
                      }}>Update</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton _hover={{color:'white'}} color={'black'} size="sm" onClick={onClose}/>
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

    </HStack>
  )
}
export default EditDogModal;