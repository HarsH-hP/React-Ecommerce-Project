import React, { useState } from "react";
import { useForm } from "react-hook-form";
// import { UseSelector, useDispatch } from "react-redux";
// import authSlice from "../slices/authSlice";
import { Link, Navigate } from "react-router-dom";
import { selectLoggedInUser, createUserAsyncThunk, checkRegisteredUserAsyncThunk, selectCheckUserRegistered } from "../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";


export default function SignUpComponent() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userPresent = useSelector(selectCheckUserRegistered);

  return (
    <>
    {user && <Navigate to='/' replace={true}></Navigate>}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            noValidate
            className="space-y-6"
            onSubmit={handleSubmit((data) => {
              console.log(data);
              dispatch(checkRegisteredUserAsyncThunk(data.email));
              (userPresent)? dispatch(createUserAsyncThunk({name: data.name,email: data.email, password: data.password,addresses:[],role:'user'})): alert("User already registered");
            })}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name *
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  {...register("name", { required: "Name is required",message: "Name Error"})}
                  type="name"
                  autoComplete="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.name && (
                  <p className="text-red-500"> {errors.name.message}</p>
                )}
              </div>
            </div>

            <div>
            <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address *
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  {...register("email", { required: "Email is required", pattern: {
                    value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                    message: "Invalid email",                  
                  } })}
                  type="email"
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.email && (
                  <p className="text-red-500"> {errors.email.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password *
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  {...register("password", {
                    required: "Password is required",pattern: {
                      value:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm ,
                      message: "atleast 8 characters with 1 uppercase, lowercase and a number - can contain special characters",                  
                    } })}
                  type="password"
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.password && (
                  <p className="text-red-500"> {errors.password.message}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="confirm_password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password *
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="confirm-password"
                  {...register("confirm_password", {
                    required: "Confirm Password is required",
                    validate: (value,formValues) => value === formValues.password || "Password not matching"
                  })}
                  type="password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {errors.confirm_password && (
                  <p className="text-red-500">
                    {" "}
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{" "}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
