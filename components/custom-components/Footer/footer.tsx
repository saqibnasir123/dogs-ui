import { Flex, Separator } from "@chakra-ui/react";
import React from "react";
const Header:React.FC=()=>{
    return (
        <>
            <Separator variant={'solid'} />
            <Flex color={'black'} direction={'row'} width={"100%"} height={"5rem"} alignItems={'center'} justifyContent={"center"} gap={1}>
                © 2025 - www.dogs&breed.com  - All Rights Reserved.    
            </Flex>
        </>
    )
}
export default Header