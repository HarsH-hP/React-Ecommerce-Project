import AdminProductList from "../../features/admin/components/AdminProductList";
import NavigationBar from "../../features/menu-navigation/components/NavigationBar";


export default function AdminHomePage(){
    return (
        <>
            <NavigationBar>
                <AdminProductList></AdminProductList>
            </NavigationBar>
        </>
    )
}