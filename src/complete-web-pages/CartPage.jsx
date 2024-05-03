import CartComponent from "../features/cart-details/components/CartComponent";
import NavigationBar from "../features/menu-navigation/components/NavigationBar";


export default function CartPage(){
    return(
        <>
            <NavigationBar>
                <CartComponent></CartComponent>
            </NavigationBar>
            
        </>
    )
}