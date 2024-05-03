import NavigationBar from "../features/menu-navigation/components/NavigationBar";
import UserOrdersComponent from "../features/user/components/UserOrdersComponent";

export default function UserOrdersPage(){
    return(
        <>
            <NavigationBar>
                <h1 className="mb-10 text-4xl font-bold text-gray-900">My Orders :</h1>
                <UserOrdersComponent></UserOrdersComponent>
            </NavigationBar>
        </>
    )
}