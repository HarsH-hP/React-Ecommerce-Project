import NavigationBar from "../features/menu-navigation/components/NavigationBar"
import OrderPlacedComponent from "../features/orders/components/OrderPlacedComponent"

export default function OrderSuccessPage(){
    return (
        <>
            <NavigationBar>
                <OrderPlacedComponent></OrderPlacedComponent>
            </NavigationBar>
        </>
    )
}