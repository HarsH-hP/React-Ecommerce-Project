import CheckoutComponent from "../features/cart-details/components/CheckoutComponent";
import NavigationBar from "../features/menu-navigation/components/NavigationBar";

export default function CheckoutPage() {
  return (
    <>
      <NavigationBar>
        <CheckoutComponent></CheckoutComponent>
      </NavigationBar>
    </>
  );
}
