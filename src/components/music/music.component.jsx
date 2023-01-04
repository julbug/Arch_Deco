import { useContext, useEffect, useState } from "react"
import axios from "axios";
import Cart from "../cart/cart.component";
import '../music/music.styles.css'
import { CartContextWrapper } from "../../context/cart.context";
import { CartContext } from "../../context/cart.context";
const API_URL = 'https://producer-e8hr.onrender.com';




const Music = () => {
    
    const [ beats, setBeats ] = useState([]); 
    const {cartItems, addToCart}  = useContext(CartContext);
    console.log(cartItems, addToCart)
    
    useEffect(() => {
        
        axios.get(`${API_URL}/music`)
          .then(response => setBeats(response.data.beats))
          .catch(error => console.log(error));
        console.log({BREAK: beats})
    }, []);



    
    return (
        <CartContextWrapper>
          <div className="music-container">
            <div className="music-left-page">
              <h2>Purchase premade beats, or reach out to me for custom creations as well.</h2>
            </div>
    
            <div className="music-right-page">
              {beats.map(beat => (
                <div className="for-sale-beat-container">
                  <li className="onsale-beats" key={beat._id}>
                    <h3>{beat.name}</h3>
                    <h4>${beat.price}</h4>
                    <audio controls>
                      <source src={beat.link} type="audio/wav"/>
                    </audio>
                    <button onClick={() => addToCart(beat)} className="add-to-cart">Add To Cart</button>
                  </li>
                </div>
              ))}
            </div>
          </div>
        </CartContextWrapper>
      );
    }



export default Music;