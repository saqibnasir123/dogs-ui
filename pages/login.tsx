import React, { useState } from 'react';
import LoginForm from "../components/custom-components/LoginForm/loginForm"
import Header from '@/components/custom-components/Header/header';
import Footer from '@/components/custom-components/Footer/footer';
import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Toaster, toaster } from "@/components/ui/toaster"

const LoginPage: React.FC = () =>{
const router = useRouter(); // Initialize useRouter
const API_BASE = 'https://dogs-backend-xijv.onrender.com/api';

  const handleLoginFormSubmit = async (email: string, password: string) => {
      const userCredentials = {
        email: email,
        password: password,
      };
      const response = await fetch(`${API_BASE}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCredentials),
        });
        if (response.ok) {
          const result = await response.json();
          // REDIRECT TO index PAGE AFTER SUCCESS
          router.push('/'); 
        }else{
          toaster.create({
            description: "Invalid Credentials",
            closable: true,
            type:'error'
          })
        }
  };
  return (
    <>
      <Header title={'Dogs & Breeds'} isLoggedIn={false}/>
      <Flex justifyContent={'center'} height={"80vh"} minH={"25rem"} padding={'auto'}>
        <LoginForm onSubmit={handleLoginFormSubmit }/>
      </Flex>
      <Footer/>
      <Toaster />
     
    </>
  );
};

export default LoginPage;