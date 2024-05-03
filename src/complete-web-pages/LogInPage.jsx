import LogInComponent from "../features/authorization/components/LogInComponent";
import NavigationBar from "../features/menu-navigation/components/NavigationBar";


export default function LogInPage(){
    return(
        <>
        <NavigationBar>
            <LogInComponent></LogInComponent>
            </NavigationBar>
        </>
    )
}