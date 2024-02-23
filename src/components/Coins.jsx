import axios from 'axios';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import Error from './Error';
import {RadioGroup,Radio,Container,HStack,VStack,Image,Heading,Text,Button} from '@chakra-ui/react'
import { Link } from 'react-router-dom';

export default function Coins(){
    const [coins,setCoins] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [page,setPage] = useState(1);
    const [currency,setCurrency] = useState("inr");

    const changePage=(page)=>{
        setLoading(true)
        setPage(page)
    }

    const btns = new Array(130).fill(1)

    const currencySymbol = currency=="inr"?"₹":currency=="eur"?"€":"$"

    useEffect(()=>{
        const fetchCoins =async()=>{
            try{
                const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&page=${page}`)

                setCoins(data)
                // console.log(data)
                setLoading(false)
            }catch(e){
                setError(true)
                setLoading(false)
            }
        }
        fetchCoins()
    },[page,currency])
    if(error) return <Error msg={'Error while fetching coins...'}/>
    return(
        <Container maxW={'container.xl'} >
            {loading?<Loader/>:(
                <>
                <RadioGroup value={currency} onChange={setCurrency}>
                    <HStack spacing={'50'}>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                    </HStack>
                </RadioGroup>

                <HStack wrap={"wrap"} justifyContent={'space-evenly'}>
                    {coins.map((i)=>(
                        <CoinsCard 
                        key={i.id}
                        id={i.id} 
                        name={i.name}
                        img={i.image} 
                        symbol={i.symbol} 
                        price={i.current_price}
                        currencySymbol={currencySymbol}
                        />
                    ))}
                </HStack>

                <HStack w={'full'} overflowX={'auto'} p={8}>
                    {btns.map((btn,i)=>(
                    <Button 
                        key={i} 
                        bgColor={'black'} 
                        color={'white'}
                        onClick={()=>(changePage(i+1))}
                        >
                        {i+1}
                        </Button>
                    ))}
                </HStack>
                </>
            )}
        </Container>
    )
}

const CoinsCard=({id,name,img,symbol,price,currencySymbol="₹"})=>(
    <Link to={`/coins/${id}`}>
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
            >{symbol}</Heading>
            <Text noOfLines={1}>{name}</Text>
            <Text noOfLines={1}>{price?`${currencySymbol}${price}`:"N/A"}</Text>
        </VStack>
    </Link>
)