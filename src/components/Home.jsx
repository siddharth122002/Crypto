import image from '../assets/thought-catalog-I0TDRP0fj6Y-unsplash.jpg'
import '../styles/Home.css'
export default function Home(){
    return(
        <div id='outer'>
            <img src={image}/>
            <div id='inner'>
                <h1>CRYPTO</h1>
            </div>
        </div>
    )
}