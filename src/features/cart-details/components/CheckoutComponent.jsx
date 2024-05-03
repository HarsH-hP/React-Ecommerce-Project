import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartItemsAsyncThunk, selectedCartItems, updateCartItemsAsyncThunk } from "../slices/cartSlice";
import { selectLoggedInUser,  } from './../../authorization/slices/authSlice';
import { useForm } from "react-hook-form";
import { useState } from "react";
import { createOrderAsyncThunk, selectCurrentOrder } from "../../orders/slices/orderSlice";
import { selectUserInfo, updateUserAsyncThunk } from "../../user/slices/userSlice";

const qtyValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];



export default function CheckoutComponent() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const [selectedAddress, setSelectedAddress] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const currentUser = useSelector(selectUserInfo);
  const userCartItems = useSelector(selectedCartItems);
  const currentOrder = useSelector(selectCurrentOrder);
  let subTotalPrice = 0;
  let totalCartItems = 0;
  userCartItems.forEach((cartItem)=>{
        subTotalPrice = subTotalPrice + (cartItem.price * cartItem.quantity)
        totalCartItems = totalCartItems + cartItem.quantity
    }) 
  const dispatch = useDispatch();

  const handleQuantity = (e, item) => {
    e.preventDefault();
    dispatch(updateCartItemsAsyncThunk({...item, quantity: +e.target.value}));
  }

  const handleItemDelete = (e, itemID) => {
    e.preventDefault();
    dispatch(deleteCartItemsAsyncThunk(itemID));
  }

  const handleAddress = (e)=>{
    setSelectedAddress(currentUser.addresses[e.target.value]);
  }

  const handlePayment = (e)=>{
    setPaymentMethod(e.target.value);
  }

  const handleOrder = (e) => {
    const order = {items:userCartItems, subTotalPrice, totalCartItems, orderTotal:+parseFloat(subTotalPrice + (subTotalPrice*0.13)).toFixed(2) ,user:currentUser, paymentMethod, selectedAddress, status:'Pending'}
    dispatch(createOrderAsyncThunk(order));
  }

  return (
    <>
    {!userCartItems.length && <Navigate to = '/' replace={true}></Navigate>}
    {currentOrder && <Navigate to = {`/order-success/${currentOrder.id}`} replace={true}></Navigate>}
      <div className="mx-auto max-w-7xl mb-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <form className="bg-white px-10 pt-10 pb-10" noValidate onSubmit={handleSubmit((data) => {
              const addressesArray = Array.isArray(currentUser.addresses) ? currentUser.addresses : [];
              dispatch(updateUserAsyncThunk({...currentUser, addresses:[...addressesArray, data]}));
              reset();
            })}>
              <div className="space-y-5">
                <div className="border-b border-gray-900/10 pb-10">
                  <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    Personal Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive your order.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", { required: "Name is required"})}
                          id="name"
                          autoComplete="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    

                    <div className="sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", { required: "Email is required"})}
                          type="email"
                          autoComplete="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Contact Number
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", { required: "Phone Number is required"})}
                          type="tel"
                          autoComplete="phone"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-4">
                      <label
                        htmlFor="street"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", { required: "Street Address is required"})}
                          id="street"
                          autoComplete="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", { required: "City is required"})}
                          id="city"
                          autoComplete="city"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", { required: "State is required"})}
                          id="state"
                          autoComplete="state"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pincode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pincode", { required: "Pincode is required"})}
                          id="pincode"
                          autoComplete="pincode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end mt-12 -mb-3 gap-x-6">
                  <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add New Address
                  </button>
                </div>
                </div>
                

                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-base font-semibold leading-7 text-gray-900 mb-5">
                     Saved Addresses
                  </h2>

                  <ul role="list">
                    {Array.isArray(currentUser.addresses) && currentUser.addresses.map((address, index) => (
                      <li
                        key={index}
                        className="flex justify-between border-solid border-2 border-gray-200 gap-x-6 py-5"
                      >
                        <div className="flex min-w-0 gap-x-4 pl-5">
                          <input
                            name="selected_address"
                            type="radio"
                            onChange={handleAddress}
                            value={index}
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {address.name}
                            </p>
                          </div>
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end pr-5">
                          <p className="mt-1 truncate font-medium text-sm leading-6 text-gray-400">
                            Address: {address.street}, {address.city},{" "}
                            {address.state}, {address.pincode}
                          </p>
                          <p className="mt-1 truncate font-medium text-sm leading-6 text-gray-400">
                            Phone: {address.phone}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-10 space-y-10">
                    <fieldset>
                      <legend className="text-sm font-semibold leading-6 text-gray-900">
                        Payment Mode
                      </legend>
                      <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-3">
                        <div className="flex items-center gap-x-3 sm:grid-cols-2 sm:col-start-1">
                          <input
                            id="cash"
                            name="payment-mode"
                            checked = {paymentMethod === 'cash'}
                            type="radio"
                            onChange = {handlePayment}
                            value = "cash"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="cash"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Cash
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="card"
                            name="payment-mode"
                            type="radio"
                            checked = {paymentMethod === 'card'}
                            onChange = {handlePayment}
                            value = "card"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="card"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Card (Debit/Credit)
                          </label>
                        </div>
                        <div className="flex items-center gap-x-3">
                          <input
                            id="upi"
                            name="payment-mode"
                            type="radio"
                            checked = {paymentMethod === 'upi'}
                            onChange = {handlePayment}
                            value = "upi"
                            className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                          />
                          <label
                            htmlFor="upi"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            UPI
                          </label>
                        </div>
                      </div>
                    </fieldset>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-10">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Cart Items
                </h2>
              </div>
              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {userCartItems.map((product) => (
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
                                ${product.price}{" "}
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
                                Qty
                              </label>
                              <select
                                onChange={(e) => handleQuantity(e, product)}
                                value={product.quantity}
                                className="inline mr-2 text-sm font-medium leading-6 text-gray-900"
                              >
                                {qtyValues.map((item, index) => (
                                  <option key={index}>{item}</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex">
                              <button
                                type="button"
                                onClick={(e) => handleItemDelete(e, product.id)}
                                className="font-medium text-indigo-600 hover:text-indigo-500"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div>
                  <input type="text" name="coupon"></input>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total Items :</p>
                  <p>{totalCartItems} items</p>
                </div>
                <div className="mt-1 flex justify-between text-base font-medium text-gray-900">
                  <p>Before Tax :</p>
                  <p>${parseFloat(subTotalPrice).toFixed(2)}</p>
                </div>
                <div className="mt-1 flex justify-between text-sm font-medium text-gray-500">
                  <p>Tax (13%) :</p>
                  <p> ${parseFloat(subTotalPrice * 0.13).toFixed(2)}</p>
                </div>
                <div className="mt-1 flex justify-between text-sm font-medium text-gray-500">
                  <p>Shipping Charge :</p>
                  <p> Free</p>
                </div>
                <div className="mt-1 flex justify-between text-base font-medium text-gray-900">
                  <p>Order Total :</p>
                  <p>${parseFloat((subTotalPrice + (subTotalPrice * 0.13))).toFixed(2)}</p>
                </div>

                
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Place Order
                  </div>
                </div>
                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    or{"  "}
                    <Link to="/">
                      <button
                        type="button"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
