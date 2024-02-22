import {Alert,AlertIcon} from '@chakra-ui/react'
export default function Error({msg}){
    return(
        <Alert 
        status='error'
        w={'full'} 
        justifyContent={'center'}>
            <AlertIcon/>
                {msg}
        </Alert>
    )
}