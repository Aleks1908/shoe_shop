import React, { Fragment, useState } from "react";
import "./auth.scss";
import { useForm } from "react-hook-form";
import { FooterSection } from "../Components/FooterSection/FooterSection";
import { useMutation } from "@tanstack/react-query";
import { useMediaQuery } from "react-responsive";
import { NavigationMobile } from "../Components/Navigation/NavigationMobile/NavigationMobile";
import { NavigationDesktop } from "../Components/Navigation/NavigationDesktop/NavigationDesktop";
import { useNavigate, Link } from "react-router-dom";

const loginUser = async (data) => {
  const response = await fetch("http://localhost:6969/api/v1/auth/login", {
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

export const LoginPage = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 900px)" });
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      console.log("Login successful:", data);
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }, 3000);
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
      <main>
        <section className="login">
          <h1>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="login__input">
              <input
                id="user_name"
                placeholder="Enter your name"
                {...register("user_name", { required: true })}
              />
              {errors.user_name && <span>This field is required</span>}
            </div>
            <div className="login__input">
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>This field is required</span>}
            </div>
            <div className="login__button">
              <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Logging in..." : "Login"}
              </button>
              {mutation.isError && <span>Login failed. Please try again.</span>}
            </div>
            <div className="login__already">
              <span>
                Don't have an account? <Link to="/register">Register now</Link>
              </span>
            </div>
          </form>
        </section>
        {showSuccessMessage && (
          <div className="toast">
            <span>Login successful! Redirecting to home.</span>
          </div>
        )}
      </main>
      <FooterSection />
    </Fragment>
  );
};
