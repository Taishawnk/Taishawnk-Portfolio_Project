import React, {useState, useEffect} from "react";//use useEffect whenever you want somthing to mount before the component in this case load cart
import Base from "./Base";

import Card from "./Card";
import { loadCart } from "./helper/carthelper";//useEffect  will make sure that load cart runs before the component mounts 



const Cart = () =>{
    const [reload, setReload] = useState(false) //sets the initial value when called to false
    const [products, setProducts] = useState([])//my state for products starts of as empty list
    
    useEffect(() => {
        setProducts(loadCart)
    }, [reload])//final peice to the puzzle will set th

    const loadAllProducts = (products) => {
        return(
            <div>
                {products.map((product, index) => {
                    return(
                    <Card
                    key={index}//have to add key or it will just assume you are loop the same value 
                    product={product}
                    removeFromCart={true}
                    addtoCart={false}
                    reload={reload}
                    setReload={setReload}//loads up what evet the state is from my setRload is above 
                    />
                )})}{/*//index to make sure we are not looping the same product, Cart expects me to add in the information addto cart remove from cart from the Card Method
            */}
            </div>
        )
    }
    
    const loadCheckOut = () =>{
        return(
            <div>
                <h1>
                    Checkout
                </h1>
            </div>
        )
    }
   
    return(
        <Base title="Cart Page" description="Welcome to your cart">  
        <div className="row text-center">
            
            <div className="col-6 ">
                {loadAllProducts(products)}
            </div>

            <div className="col-6">
                {loadCheckOut()}
            </div>
        </div>
        </Base>
    )

}

export default Cart