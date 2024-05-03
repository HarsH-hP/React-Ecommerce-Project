import NavigationBar from "../features/menu-navigation/components/NavigationBar"
import ProductList from "../features/product-list/components/ProductList"


export default function Home(){
    return (
        <>
            <NavigationBar>
                <ProductList></ProductList>
            </NavigationBar>
        </>
    )
}