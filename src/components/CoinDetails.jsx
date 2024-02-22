import {Progress,Image, Box, Container,RadioGroup,HStack,Radio,VStack,Text,Stat,StatLabel, StatNumber,StatHelpText,StatArrow,Badge, Button} from "@chakra-ui/react";
import { useState,useEffect } from "react";
import Loader from "./Loader";
import axios from "axios";
import { useParams } from "react-router-dom";
import Chart from "./Chart";
import Error from "./Error";
export default function CoinDetails(){
    const [coin,setCoin] = useState([]);
    const [loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [currency,setCurrency] = useState("inr");
    const [days,setDays] = useState("24h");
    const [chartArray,setChartArray] = useState([]);
    const currencySymbol = currency=="inr"?"₹":currency=="eur"?"€":"$"
    const params = useParams()

    const btns = ["24h","7d","60d","200d","1y","max"];
    const changeDayHandler=(btn)=>{
        console.log(btn);
        setLoading(true)
        setDays(btn)
    }
    useEffect(()=>{
        const fetchCoin =async()=>{
            try{
                const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}`)

                const charData = await axios.get(`https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)

                // console.log(charData.data.prices)
                setChartArray(charData.data.prices)

                setCoin(data)
                // console.log(data)
                setLoading(false)
            }catch(e){
                setError(true)
                setLoading(false)
            }
        }
        fetchCoin()
    },[params.id,currency,days])

    if(error) return <Error msg={'Error while fetching coin details...'}/>
    return(
        <Container maxW={'container.xl'}>
            {loading?<Loader/>:(
                <>
                    <Box>
                        <Chart
                        arr={chartArray}
                        days={days}
                        currency={currencySymbol}/>
                        
                        </Box>
                    {btns.map((btn,i)=>(
                        <Button
                        key={i} 
                        onClick={()=>(changeDayHandler(btn))}
                        mx={3}>{btn}</Button>
                    ))}
                    <RadioGroup value={currency} onChange={setCurrency}>
                    <HStack spacing={'50'}>
                        <Radio value={"inr"}>INR</Radio>
                        <Radio value={"usd"}>USD</Radio>
                        <Radio value={"eur"}>EUR</Radio>
                    </HStack>
                </RadioGroup>
                <VStack p={16} alignItems={'flex-start'}>
                    <Text
                    alignSelf={'center'}
                    opacity={0.6}
                    >Last updated on {Date(coin.last_updated).split('G')[0]}</Text>
                    <Image src = {coin.image.large}
                    w={16}
                    h={16}
                    />
                    <Stat>
                        <StatLabel>{coin.name}</StatLabel>
                        <StatNumber>{currencySymbol}{coin.market_data.current_price[currency]}</StatNumber>
                        <StatHelpText>
                            <StatArrow 
                            type={coin.market_data.price_change_percentage_24h>0?"increase":"decrease"} />
                            {coin.market_data.price_change_percentage_24h}%
                        </StatHelpText>
                        <Badge fontSize={'2rem'}>#{coin.market_cap_rank}</Badge>


                    </Stat>
                        <VStack h={'full'} w={'full'}>
                            <Progress colorScheme={'teal'} value={45} w={'full'}/>
                            <HStack w={'full'} justifyContent={'space-between'}>
                            <Badge
                             colorScheme={'red'}
                             fontSize={'sm'}>
                                {currencySymbol}{coin.market_data.high_24h[currency]}
                            </Badge>
                             
                            <Text fontSize={'sm'}>24H range</Text>
                            
                            <Badge 
                            colorScheme={"green"} 
                            fontSize={'sm'}>
                                {currencySymbol}{coin.market_data.low_24h[currency]}
                            </Badge>

                            </HStack>

                        </VStack>
                        <Box w={"full"} p="4">
                            <Item title={"Max Supply"} value={coin.market_data.max_supply} />
                            <Text
                                title={"Circulating Supply"}
                                value={coin.market_data.circulating_supply}
                            />
                            <Item
                                title={"Market Cap"}
                                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
                            />
                            <Item
                                title={"All Time Low"}
                                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
                            />
                            <Item
                                title={"All Time High"}
                                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
                            />
                        </Box>
                </VStack>
                </>
            )}
        </Container>
    )
}

const Item = ({ title, value }) => (
    <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
      <Text letterSpacing={"widest"}>
        {title}
      </Text>
      <Text>{value}</Text>
    </HStack>
  );