import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../authorization/slices/authSlice";
import {
  fetchLoggedInUserOrdersAsyncThunk,
  selectUserOrders,
} from "../slices/userSlice";
import { useEffect } from "react";

export default function UserOrdersComponent() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(selectUserOrders);
  console.log(orders);
  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsyncThunk(user.id));
  }, []);

  return (
    <>
      <div>
        {orders.map((order) => (
          <div>
            <div className="bg-gray-200 mx-auto max-w-7xl mb-10 px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                  Order # {order.id}
                </h1>
                <h3
                  className={`text-2xl font-bold tracking-tight ${
                    order.status === "Placed"
                      ? "text-green-700"
                      : order.status === "Pending"
                      ? " text-yellow-500 "
                      : "text-red-600"
                  } `}
                >
                  Status : {order.status}
                </h3>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {order.items.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="h-full w-full object-cover object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a href={product.href}>{product.title}</a>
                              </h3>
                              <p className="ml-4">
                                {product.quantity > 1
                                  ? product.quantity + " * "
                                  : ""}{" "}
                                ${parseFloat(product.price).toFixed(2)}{" "}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-2 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty : {product.quantity}
                              </label>
                            </div>

                            <div className="flex"></div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex justify-between border-solid border-2 border-gray-200 gap-x-6 py-5">
                <div className="flex min-w-0 gap-x-4 pl-5 ">
                    <b>Shipping Details:</b>
                  <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-500">
                      Name : {order.selectedAddress.name}
                    </p>
                    <p className="mt-1 truncate font-medium text-sm leading-6 text-gray-500">
                    Address : {order.selectedAddress.street},{" "}
                    {order.selectedAddress.city}, {order.selectedAddress.state},{" "}
                    {order.selectedAddress.pincode}
                  </p>
                  <p className="mt-1 truncate font-medium text-sm leading-6 text-gray-500">
                    Phone : {order.selectedAddress.phone}
                  </p>
                  </div>
                </div>
              </div>


              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items :</p>
                  <p>= {order.totalCartItems} item(s)</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>${parseFloat(order.subTotalPrice).toFixed(2)}</p>
                </div>
                <div className="mt-1 flex justify-between text-sm font-medium text-gray-500">
                  <p>Tax (13%) :</p>
                  <p> ${parseFloat(order.subTotalPrice * 0.13).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Order Total :</p>
                  <p>${order.orderTotal}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
