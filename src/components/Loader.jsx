import { VStack,Box,Spinner } from "@chakra-ui/react";

export default function Loader(){
    return(
        <>
        <VStack h={'100vh'} justifyContent={'center'}>
            <Box transform={'scale(1)'}>
                <Spinner ize={'xl'}/>
            </Box>
        </VStack>
        </>
    )
}