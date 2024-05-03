import ProductDetailComponent from "../features/product-list/components/ProductDetailComponent";
import NavigationBar

from "../features/menu-navigation/components/NavigationBar";
export default function ProductDetailPage(){
    return(
        <>
        <NavigationBar>
            <ProductDetailComponent></ProductDetailComponent>
        </NavigationBar>

        
        </>
    )
}
