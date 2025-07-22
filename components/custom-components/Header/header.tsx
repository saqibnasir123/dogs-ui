import { Avatar, Button, Flex, Heading, Separator } from "@chakra-ui/react";
import React from "react";
import { Link } from "@chakra-ui/react"
import NextLink from "next/link"
import { headerProps } from "./header.types";
import { useRouter } from "next/router";

const Header:React.FC<headerProps>=({
    title,
    isLoggedIn
})=>{
     const router = useRouter(); 
    const handleLogout=async ()=>{
         const response = await fetch('/api/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      const result= await response.json()
      // route to login page
      router.push("/login");

    }
   
    return (
        <>
            <Flex color={'black'} bgColor={'white'} direction={'row'} alignContent={'center'} justifyContent={"space-between"} gap={1}>
                {/* Icon and Title */}
                <Flex justifyItems={'center'} paddingX={'1rem'}>
                    <Avatar.Root size="2xl"  shape="rounded">
                        <Avatar.Image src={"/logo.png"} />
                        <Avatar.Fallback name={title} />
                    </Avatar.Root>
                    <Heading margin={'auto'} size={'xl'}>{title}</Heading>
                </Flex>
                <Flex gap={3} paddingX={"1rem"}>
                    <Link color={'black'} asChild>
                        <NextLink href="/">Home</NextLink>
                    </Link>
                    {!isLoggedIn && <Link color={'black'} asChild> 
                      <NextLink  href="/login">Login</NextLink>
                    </Link>}
                    {
                        isLoggedIn && <Link color={'black'} asChild> 
                      <NextLink href={""} onClick={handleLogout}>Logout</NextLink>
                    </Link>
                    }

                     
                </Flex>
            </Flex>
            <Separator variant={'solid'} />
        </>
    )
}
export default Header