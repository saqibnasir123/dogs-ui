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
import { AddDogModalProps } from "./AddDogModal.types";
import MultiWordInput from "../MultiTextInput/MutiWordInput";
import { useEffect, useState } from "react";

const AddDogModal:React.FC<AddDogModalProps> = ({
    isOpen, onSubmit, onClose
}) => {

    const [dogName, setDogName]=useState("");
    const [breedList, setBreedList]=useState<string[]>([])
    const [disabled, setDisabled]=useState(true)
    useEffect(()=>{
        if(dogName.trim()!=""){
            setDisabled(false)
        }else{
            setDisabled(true)
        }
    },[dogName])
     
  return (
    <HStack wrap="wrap" gap="4">
          <Dialog.Root
            key={"add dog Modal"}
            placement={"center"}
            motionPreset="slide-in-bottom"
            open={isOpen}
          >
            <Portal>
              <Dialog.Backdrop />
              <Dialog.Positioner>
                <Dialog.Content
                style={{color:'black', backgroundColor:'white'}}>
                  <Dialog.Header>
                    <Dialog.Title>Add Dog</Dialog.Title>
                  </Dialog.Header>
                  <Dialog.Body>
                    <Field.Root>
                        <Field.Label>
                                Dog Name
                        </Field.Label>
                        <Input _placeholder={{color:'gray.900'}} placeholder="Enter dog name here ...."  onChange={e=>setDogName(e.target.value)}/>
                    </Field.Root>
                    <Field.Root mt={"1rem"}>
                        <Field.Label>
                                Dog Breed
                        </Field.Label>
                        <MultiWordInput wordList={[]} onWordsChange={setBreedList}/>
                    </Field.Root>
                  </Dialog.Body>
                  <Dialog.Footer>
                    <Button color={'black'} _hover={{backgroundColor:'gray.400', color:'white'}} border={'solid 1px'} disabled={disabled} onClick={()=>{onSubmit(dogName,breedList)}}>Add</Button>
                  </Dialog.Footer>
                  <Dialog.CloseTrigger asChild>
                    <CloseButton color={'black'} _hover={{color:'white'}} size="sm" onClick={onClose}/>
                  </Dialog.CloseTrigger>
                </Dialog.Content>
              </Dialog.Positioner>
            </Portal>
          </Dialog.Root>

    </HStack>
  )
}
export default AddDogModal;