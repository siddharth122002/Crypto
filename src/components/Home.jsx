import image from '../assets/thought-catalog-I0TDRP0fj6Y-unsplash.jpg'
import {Image,HStack,Box,Text} from '@chakra-ui/react'
export default function Home(){
    return(
        <>
            <Box bgColor={'black'} h={'100vh'}
             >
            <Image width={'full'} src={image} filter={
                    'grayscale(1)'}/>
            <Text
            w={'full'}
            color={'white'}
            letterSpacing={19}
            textAlign={'center'}
            fontSize={'4xl'}
            fontWeight={'bold'}
            >CRYPTO</Text>
            </Box>
        </>
    )
}