import React, { Fragment } from "react";
import "./registerPage.scss";
import { useForm } from "react-hook-form";
import { FooterSection } from "../Components/FooterSection/FooterSection";
import { useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { NavigationMobile } from "../Components/Navigation/NavigationMobile/NavigationMobile";
import { NavigationDesktop } from "../Components/Navigation/NavigationDesktop/NavigationDesktop";
import { useNavigate, Link } from "react-router-dom";

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
      <main>
        <section className="register">
          <h1>Registration</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="register__input">
              <input
                id="user_name"
                placeholder="Enter your name"
                {...register("user_name", { required: true })}
              />
              {errors.user_name && <span>This field is required</span>}
            </div>
            <div className="register__input">
              <input
                id="password"
                type="password"
                placeholder="Create password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>This field is required</span>}
            </div>
            <div className="register__input">
              <input
                id="re_password"
                type="password"
                placeholder="Confirm password"
                {...register("re_password", {
                  required: "This field is required",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
              />
              {errors.re_password && <span>{errors.re_password.message}</span>}
            </div>
            <div className="register__button">
              <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Registering..." : "Register"}
              </button>
              {mutation.isError && (
                <span>Registration failed. Please try again.</span>
              )}
              {mutation.isSuccess && <span>Registration successful!</span>}
            </div>
            <div className="register__already">
              <span>
                Already have an account? <Link to="/login">Login now</Link>
              </span>
            </div>
          </form>
        </section>
      </main>
      <FooterSection />
    </Fragment>
  );
};
