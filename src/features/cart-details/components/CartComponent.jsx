import React, { useEffect } from "react";
// import { UseSelector, useDispatch } from "react-redux";
// import authSlice from "../slices/authSlice";
// import { Link } from "react-router-dom";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartItemsAsyncThunk,
  selectedCartItems,
  updateCartItemsAsyncThunk,
} from "../slices/cartSlice";
import { selectLoggedInUser } from "./../../authorization/slices/authSlice";

const qtyValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function CartComponent() {
  const userCartItems = useSelector(selectedCartItems);
  let subTotalPrice = 0;
  let totalCartItems = 0;
  userCartItems.forEach((cartItem) => {
    subTotalPrice = subTotalPrice + cartItem.price * cartItem.quantity;
    totalCartItems = totalCartItems + cartItem.quantity;
  });
  const dispatch = useDispatch();

  const handleQuantity = (e, item) => {
    e.preventDefault();
    dispatch(updateCartItemsAsyncThunk({ ...item, quantity: +e.target.value }));
  };

  const handleItemDelete = (e, itemID) => {
    e.preventDefault();
    dispatch(deleteCartItemsAsyncThunk(itemID));
  };

  return (
    <>
      {!userCartItems.length && <Navigate to="/" replace={true}></Navigate>}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-5">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            Cart
          </h1>
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
                          {product.quantity > 1 ? product.quantity + " * " : ""}{" "}
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
                          Qty :
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
                          - Remove
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
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items :</p>
            <p>= {totalCartItems} item(s)</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${parseFloat(subTotalPrice).toFixed(2)}</p>
          </div>

          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
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
    </>
  );
}
