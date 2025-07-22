import { Card, Avatar, Button, Heading, HStack, Badge, For, Separator } from "@chakra-ui/react"
import React from "react"
import { DisplayCardProps } from "./displayCard.types"
import { LuDog } from 'react-icons/lu';

const DogCard:React.FC<DisplayCardProps>=({
  data, onEdit, onDelete, isLoggedIn
})=>{
    return (
    <Card.Root color={'black'} bg={'white'} width={{base:"100%",md:"20rem"}}>
    <Card.Body gap="2">
      <Avatar.Root size="lg" w={"100%"} h="10rem" shape="rounded">
        <Avatar.Image src={"/logo.png"} />
        <Avatar.Fallback name="Dog & Breed" />
      </Avatar.Root>
      <Card.Title mt="2">{data.DogName}</Card.Title>
      <Card.Description>

      <Separator width={"100%"} orientation={"horizontal"} variant={'solid'}/>
        <Heading color={'black'} size={"xs"} marginY={"1rem"} height={"3rem"}>Following is the available breeds of '{data.DogName}'</Heading>
        <HStack align="flex-start"  overflow={'scroll'}  height={"3rem"}>
          <For each={data.BreedList}>
          { 
            (breed,index)=>
              <Badge variant="solid" colorPalette="blue">
                <LuDog />
                {breed}
              </Badge>
          }
          </For>
        </HStack>
      </Card.Description>
    </Card.Body>
    {isLoggedIn &&
    <Card.Footer justifyContent="flex-end">
      <Button color={'black'} _hover={{color:'white'}} variant="outline" onClick={()=>onEdit(data)}>Edit</Button>
      <Button variant='solid' colorPalette={'red'} onClick={()=>onDelete(data)}>Delete</Button>
    </Card.Footer>
    }
    
  </Card.Root>
  )
}
export default DogCard