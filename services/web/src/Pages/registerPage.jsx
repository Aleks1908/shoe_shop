import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { NavigationMobile } from "../Components/Navigation/NavigationMobile/NavigationMobile";
import { NavigationDesktop } from "../Components/Navigation/NavigationDesktop/NavigationDesktop";
import { useNavigate } from "react-router-dom";

const registerUser = async (data) => {
  const response = await fetch("http://localhost:6969/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

export const RegisterPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      navigate("/");
    },
    onError: (error) => {
      console.error("Registration failed:", error.message);
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Fragment>
      {isMobile ? <NavigationMobile /> : <NavigationDesktop />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="user_name">Name</label>
          <input
            id="user_name"
            {...register("user_name", { required: true })}
          />
          {errors.user_name && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && <span>This field is required</span>}
        </div>
        <div>
          <label htmlFor="re_password">Re-enter password</label>
          <input
            id="re_password"
            type="password"
            {...register("re_password", {
              required: "This field is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
          />
          {errors.re_password && <span>{errors.re_password.message}</span>}
        </div>
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Registering..." : "Register"}
        </button>
        {mutation.isError && (
          <span>Registration failed. Please try again.</span>
        )}
        {mutation.isSuccess && <span>Registration successful!</span>}
      </form>
    </Fragment>
  );
};
