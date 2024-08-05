import { createContext, useState } from "react";
import all_products from "../assets/all_products"

export const ShopContext = createContext(null);


const getDefaultCart = ()=>{
    let cart = {};
    for (let index = 1; index <= all_products.length; index++) {
        cart[index] = 0;        
    }
    return cart;
}
// console.log(getDefaultCart());

const ShopContextProvider = (props) => {
    // console.log(props)
    
    const [cartItems, setcartItems] = useState(getDefaultCart());
    
    const addToCart = (itemId)=>{
        setcartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
    }
    // console.log(cartItems);
    const removeFromCart = (itemId)=>{
        setcartItems((prev)=>({...prev, [itemId]:prev[itemId]-1}))
    }

    const getTotalCartAmount = () =>{
        let totalAmount =0;
        for (const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = all_products.find((product)=> product.id === Number(item));
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItem = () =>{
        let totalItem =0;
        for (const item in cartItems) {
            if (cartItems[item]>0) {
                totalItem += cartItems[item];
            }
        }
        return totalItem;
    }
    
    const contextValue = { getTotalCartItem, getTotalCartAmount,all_products, cartItems, addToCart, removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;