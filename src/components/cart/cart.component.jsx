import { useContext, useState, useEffect } from "react";
import { CartContext } from "../../context/cart.context";
import axios from "axios";
import "../cart/cart.styles.css"

const API_URL = "https://producer-e8hr.onrender.com";


const Cart = () => {
  const { cartItems, removeFromCart, setCartItems } = useContext(CartContext);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);
  const [message, setMessage] = useState("");
  const [purchased, setPurchased] = useState(false);

  useEffect(() => {
    const itemsInCart = localStorage.getItem("cartItems");
    if (itemsInCart) {
      setCartItems(JSON.parse(itemsInCart));
    }
  }, []);

  // update localStorage with the current list of items in the cart whenever the cart items change
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleCheckout = () => {
  // create a new purchase object with the total price and the list of items in the cart
  const purchase = {
    price: totalPrice,
    product: cartItems.map((item) => item._id),
  };

  // make an HTTP POST request to the backend server to save the purchase object
  axios.post(`${API_URL}/cart`, purchase)
    .then((response) => {
      // the purchase was saved successfully
      console.log(response.data);
      setMessage("Purchase was successful, check your email for your invoice");

      setCartItems([]);

      setPurchased(true);
    })
    .catch((error) => {
      // handle the error here
      console.error(error);
    });
}

return (
  <div className="cart">
    <h2>Your Cart</h2>
    {message && <div className="message"><h2>{message}</h2></div>}
    {cartItems.map((beat) => (
      <div key={beat._id} className="cart-item">
        <h3>{beat.name}</h3>
        <button onClick={() => removeFromCart(beat)}>Remove from Cart</button>
        <h4>${beat.price}</h4>
      </div>
    ))}
    {!purchased && (
      <div className="total-price">
        <h3>Total Price: ${totalPrice}</h3>
        <button onClick={handleCheckout}>Checkout</button>
      </div>
    )}
  </div>
);
}

export default Cart;