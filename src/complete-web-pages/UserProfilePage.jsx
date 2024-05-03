import NavigationBar from "../features/menu-navigation/components/NavigationBar";
import UserOrdersComponent from "../features/user/components/UserOrdersComponent";
import UserProfileComponent from "../features/user/components/UserProfileComponent";

export default function UserProfilePage(){
    return(
        <>
            <NavigationBar>
                <h1 className=" mb-10 text-4xl font-bold text-gray-900">Your Details :</h1>
                <UserProfileComponent></UserProfileComponent>
            </NavigationBar>
        </>
    )
}