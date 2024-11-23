import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { NavigationMobile } from "../Components/Navigation/NavigationMobile/NavigationMobile";
import { NavigationDesktop } from "../Components/Navigation/NavigationDesktop/NavigationDesktop";

const registerUser = async (data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (data.name && data.password) {
        console.log("User registered:", data);
        resolve(data);
      } else {
        reject(new Error("Registration failed"));
      }
    }, 1000);
  });
};

export const RegisterPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [formData, setFormData] = useState(null);

  const { data, error, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["registerUser", formData],
    queryFn: () => registerUser(formData),
    enabled: !!formData, // Only run the query if formData is not null
    retry: false,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
    },
    onError: (error) => {
      console.error("Registration failed:", error);
    },
  });

  const password = watch("password");

  const onSubmit = (data) => {
    setFormData(data);
  };

  return (
    <Fragment>
      {isMobile ? <NavigationMobile /> : <NavigationDesktop />}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">Name</label>
          <input id="name" {...register("name", { required: true })} />
          {errors.name && <span>This field is required</span>}
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
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Registering..." : "Register"}
        </button>
        {isError && <span>Registration failed. Please try again.</span>}
        {isSuccess && <span>Registration successful!</span>}
      </form>
    </Fragment>
  );
};
