import SignUpComponent from "../features/authorization/components/SignUpComponent";
import NavigationBar from "../features/menu-navigation/components/NavigationBar";

export default function SignUpPage() {
  return (
    <>
      <NavigationBar>
        <SignUpComponent></SignUpComponent>
      </NavigationBar>
    </>
  );
}
