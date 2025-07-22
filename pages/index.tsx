import React, { useEffect, useState } from 'react';
import {Text, Button, Card, Flex, For, Heading, Stack, Wrap, WrapItem } from '@chakra-ui/react';
import { Toaster, toaster } from "@/components/ui/toaster";
import Header from '@/components/custom-components/Header/header';
import Footer from '@/components/custom-components/Footer/footer';
import DogCard from '@/components/custom-components/DisplayCard/displayCard';
import { DogData } from '@/components/custom-components/DisplayCard/displayCard.types';
import EditDogModal from '@/components/custom-components/EditDogModal/EditDogModal';
import { CiCirclePlus } from "react-icons/ci";
import AddDogModal from '@/components/custom-components/AddDogModal/AddDogModal';

interface UserData {
  email: string;
  password: string;
  isLoggedIn: boolean;
}

const HomePage: React.FC = ()=> {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [dogDataList,setDogDataList]=useState<DogData[]>([])
  const[editDog,setEditDog]=useState<{dogData:DogData, open:boolean}>({dogData:{DogName:"",BreedList:[]},open:false})
  const[addDog,setAddDog]=useState(false)

  // hook to run only on first page render use to populate dogDataList from api
  useEffect(() => {
  checkUserLoginStatus();
  fetchDogData();
}, [])
  
//Base path for API
  const API_BASE = 'https://dogs-backend-xijv.onrender.com/api';

  //Helper function to check user login status
  const checkUserLoginStatus=async()=>{

    const res = await fetch(`${API_BASE}/verifylogin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
      const result= await res.json()
      console.log(result)

      setIsLoggedIn(result.isLoggedIn)
  }

//Start of API call helper function

//Delete Dog Data
 const deleteBreed = async (breed: string) => {
  const res = await fetch(`${API_BASE}/breeds/${breed}`, { method: 'DELETE' });
  if (!res.ok) return 'error';
  else
  return 'success'
};

//Fetch Dog Data i.e., Retrieving data from dogs.json
const fetchDogData = async () => {
    try {
      const response = await fetch(`${API_BASE}/breeds`); // Your backend
      const data = await response.json();

      // Transform data to DogData[]
      const transformed: DogData[] = Object.entries(data).map(
        ([breed, subBreeds]) => ({
          DogName: breed,
          BreedList: subBreeds as string[],
        })
      );

      setDogDataList(transformed);
    } catch (error) {
      toaster.error({description:'Failed to fetch dog data', title:'Internal Server Error', closable:true});
    }
  };

//Calling API to add dog
  const handleAddDog = async (name: string, breedList: string[]) => {
  setAddDog(false);
  
    const response = await fetch(`${API_BASE}/breeds`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ breed: name, subBreeds: breedList }),
    });

    if (response.ok) {
      const newDog: DogData = { DogName: name, BreedList: breedList };
      setDogDataList(prev => [...prev, newDog]);
      toaster.create({description:'Dog Added Succesfully', title:'Success', type:'success', closable:true})
      
    }
    else if(response.status==400){
       toaster.create({description:'Dog Already Exist', title:'Conflict', type:'error', closable:true})

    }
    else {
      toaster.create({description:'Cannot add dog', title:'Internal Server Error', type:'error', closable:true})
    }
  
};

//Calling API to edit dog
 const handleEditDog = async (oldDogData: DogData, newDogData: DogData) => {
  setEditDog({ dogData: { DogName: "", BreedList: [] }, open: false });

  const res = await fetch(`${API_BASE}/breeds/${oldDogData.DogName}/subbreeds`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ subBreeds: newDogData.BreedList}),
  });
 
    fetchDogData();
    toaster.create({title:'Success', description:'Dog updated successfully', type:'success', closable:true})
};


//End of API Helpers
const handleEditDogDialogClose=()=>{
    setEditDog({dogData:{DogName:"",BreedList:[]},open:false})
  }
  
//Helper function for hooks
const handleEditDogCard=(data:DogData)=>{
    setEditDog({dogData:data,open:true});
  }

const handleDeleteDog = async (data: DogData) => {
  
    const result=await deleteBreed(data.DogName);
    setDogDataList(prev => prev.filter(dog => dog.DogName !== data.DogName));
    if (result=='success')
    {
      toaster.create({description:'Dog Deleted Succesfully', title:'Success', type:'success', closable:true})
    }
    else
    {
      toaster.create({description:'Failed to delete dog', title:'Internal Server Error', type:'error', closable:true})
    }
   
};

  return (
    <>
    <Header title={'Dogs & Breeds'} isLoggedIn={isLoggedIn}/>
    {!isLoggedIn && <Flex padding={'1rem'}>
      <Text width={"100%"} border={"solid 1px"} borderRadius={'lg'} textAlign={'center'} padding={"0.5rem"}>To Add, Edit or Delete, Please Login </Text>
    </Flex> }
    {isLoggedIn &&
    <Flex padding={'1rem'}>
      <Button color={'black'} _hover={{color:'white'}} variant={'outline'}  width={"100%"} onClick={()=>setAddDog(true)}><CiCirclePlus /> Add New Dog</Button>
    </Flex>
    }
      <Flex direction={'row'} justifyContent={'center'} height={dogDataList.length==0?"80vh":"100%"} >
        {dogDataList.length==0&& <Heading>No Dog Data Available</Heading>}
        {dogDataList.length!=0 && (
          // Displaying Dog List
           <Wrap align={'center'} gap={10} padding={'1rem'}>
            <For each={dogDataList}>
              {(item, index) => 
              <WrapItem key={"DogCard-"+index}>
                <DogCard data={item} onEdit={handleEditDogCard} onDelete={handleDeleteDog} isLoggedIn={isLoggedIn}/>
              </WrapItem>}
            </For>
          </Wrap>
        )}
        <EditDogModal oldDogData={editDog.dogData} isOpen={editDog.open} onSubmit={handleEditDog} onClose={handleEditDogDialogClose}/>
        <AddDogModal isOpen={addDog} onSubmit={handleAddDog} onClose={()=>setAddDog(false)}/>
      </Flex>
      <Footer/>
      <Toaster />
    </>
  );
};

export default HomePage;