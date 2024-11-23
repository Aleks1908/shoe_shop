import React from "react";
import { useForm } from "react-hook-form";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => console.log(data);

  return (
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
            validate: (value) => value === password || "Passwords do not match",
          })}
        />
        {errors.re_password && <span>{errors.re_password.message}</span>}
      </div>
      <button type="submit">Register</button>
    </form>
  );
};
