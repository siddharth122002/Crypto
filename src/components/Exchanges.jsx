import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Error from './Error';
import {Container,HStack,VStack,Image,Heading,Text} from '@chakra-ui/react'
export default function Exchanges(){
    const [exchanges,setExchanges] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    useEffect(()=>{
        const fetchExchanges =async()=>{
            try{
                const {data} = await axios.get(`https://api.coingecko.com/api/v3/exchanges`)

                setExchanges(data)
                // console.log(data)
                setLoading(false)
            }catch(e){
                setError(true)
                setLoading(false)
            }
        }
        fetchExchanges()
    },[])
    if(error) return <Error msg={'Error while fetching exchanges...'}/>
    return(
        <Container maxW={'container.xl'} bgColor={'white'}>
            {loading?<Loader/>:(
                <>
                <HStack  wrap={"wrap"} justifyContent={"space-evenly"}>
                    {exchanges.map((i)=>(
                        <ExchangeCard 
                        key={i.id} 
                        img={i.image} 
                        rank={i.trust_score_rank} 
                        name={i.name}
                        url = {i.url}
                        />
                    ))}
                </HStack>
                </>
            )}
        </Container>
    )
}

const ExchangeCard=({name,img,rank,url})=>(
    <a href={url} target={'blank'}>
        <VStack bgColor={'#f5f5f5'} w={52} shadow={'lg'} borderRadius={'lg'} p={8}
        transition={'all 0.3s'} m={4}
        css={{
            '&:hover':{
                transform:"scale(1.1)"
            }
        }}
        >
            <Image objectFit={'contain'} src={img} h={10} w={10} alt={name}>

            </Image>
            <Heading 
            size={'md'}
            noOfLines={1}
            >{rank}</Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
)