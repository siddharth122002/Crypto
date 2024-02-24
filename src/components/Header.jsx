import {HStack,Button} from '@chakra-ui/react'
import {Link} from 'react-router-dom'
export default function Header(){
    return(
        <HStack  p={4} shadow={'base'} bgColor={'black'}>
            <Button px={5} variant={'unstyled'} color={'white'}>
                <Link to={'/'}>Home</Link>
            </Button>

            <Button px={5} variant={'unstyled'} color={'white'}>
                <Link to={'/exchanges'}>Exchanges</Link>
            </Button>
            <Button px={5} variant={'unstyled'} color={'white'}>
                <Link to={'/coins'}>Coins</Link>
            </Button>
        </HStack>
    )
}