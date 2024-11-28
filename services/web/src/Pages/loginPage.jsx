import React, { Fragment } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { NavigationMobile } from "../Components/Navigation/NavigationMobile/NavigationMobile";
import { NavigationDesktop } from "../Components/Navigation/NavigationDesktop/NavigationDesktop";
import { useNavigate } from "react-router-dom";

const loginUser = async (data) => {
  const response = await fetch("http://localhost:6969/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  return response.json();
};

export const LoginPage = () => {
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
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Logged in successfuly:", data);
      navigate("/");
    },
    onError: (error) => {
      console.error("Login failed:", error);
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
        <button type="submit" disabled={mutation.isLoading}>
          {mutation.isLoading ? "Logging in..." : "Login"}
        </button>
        {mutation.isError && <span>Login failed. Please try again.</span>}
        {mutation.isSuccess && <span>Login successful!</span>}
      </form>
    </Fragment>
  );
};
