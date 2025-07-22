import React, { useEffect, useState } from "react";
import { LoginFormProps } from "./loginForm.types";
import { Stack, Field, Input, Button, defineStyle, Box, FieldRequiredIndicator, Heading, Separator, Avatar, Flex } from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input"
import { title } from "process";

const LoginForm:React.FC<LoginFormProps>=({
    onSubmit
})=>{
    const [email, setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [disableSubmitButton, setdisableSubmitButton]=useState(true)
    useEffect(()=>{

        const validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        if(email.replaceAll(" ","")!="" &&  validEmail.test(email) && password.replaceAll(" ","")!=""){
           setdisableSubmitButton(false)
        }
        else{
            setdisableSubmitButton(true)
        }

    },[email,password])
    return(
        <Stack color={'black'} gap="4" align="flex-start" maxW="sm" marginY={'auto'} backgroundColor={"gray.100"} padding={"2rem"} minH={'20rem'} justifyContent={'center'} borderRadius={'lg'} shadow={'lg'}>
            <Flex width={'100%'} justifyContent={'center'}>
                <Avatar.Root size="2xl"  shape="rounded" >
                    <Avatar.Image src={"/logo-without-background.png"} css={{backgroundColor:"#f4f4f5"}}/>
                    <Avatar.Fallback name={"Dogs & Breed"} />
                </Avatar.Root>
            </Flex>
            
            <Heading size={"xl"} width={"100%"} textAlign={'center'}>Login</Heading>
            <Separator variant={'solid'}/>
            <Field.Root>
                <Box pos="relative" w="full">
                    <Input className="peer" placeholder="" onChange={e=>setEmail(e.target.value)}/>
                    <Field.Label css={floatingStyles}>Email <FieldRequiredIndicator/></Field.Label>
                </Box>
            </Field.Root>

            <Field.Root>
                <Box pos="relative" w="full">
                    <PasswordInput  placeholder="" onChange={e=>setPassword(e.target.value)} />
                    <Field.Label css={floatingStyles}>Password <FieldRequiredIndicator/></Field.Label>
                </Box>
            </Field.Root>
            <Flex justifyContent={'center'} w={"100%"}>
                <Button border={'solid 1px'} color={'black'} _hover={{color:'white', backgroundColor:'gray.400'}} disabled={disableSubmitButton} onClick={()=>onSubmit(email, password)}>Login</Button>
            </Flex>
        </Stack>
    )

}
export default LoginForm
const floatingStyles = defineStyle({  
 pos: "absolute",
  bg: "bg",
  px: "0.5",
  top: "-3",
  backgroundColor:"gray.100",
  insetStart: "2",
  fontWeight: "normal",
  pointerEvents: "none",
  transition: "position",
  _peerPlaceholderShown: {
    color: "black",
    top: "2.5",
    insetStart: "3",
  },
  _peerFocusVisible: {
    color: "black",
    top: "-3",
    insetStart: "2",
  },
})