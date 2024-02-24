import image from '../assets/thought-catalog-I0TDRP0fj6Y-unsplash.jpg';
import { Box, Image,Text } from '@chakra-ui/react';

export default function Home() {
    return (
        <Box  bgColor={"black"} w={"full"} h={"100vh"}>
      <Text
        fontSize={"5xl"}
        textAlign={"center"}
        fontWeight={"bold"}
        color={"white"}
        letterSpacing={3}
        filter={"blur(10px"}
      >
        CRYPTO
      </Text>
            <Image
          w={"full"}
          h={"80vh"}
          objectFit={"contain"}
          src={image}
        />
        </Box>
    );
}
