"use client";

import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import MyCheckbox from "@/components/MyCheckbox";
import MyTextInput from "@/components/MyTextInput";
import MyPasswordInput from "@/components/MyPasswordInput";
import Link from "next/link";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    matNo: "",
    password: "",
    rememberMe: false,
  };

  const schemaObject = Yup.object({
    matNo: Yup.string()
      .matches(/^M\.\d{2}\/(ND|HND)\/[A-Z]+\/\d{5}$/, "Mat Number is invalid")
      .required("Required"),
    password: Yup.string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      )
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    rememberMe: Yup.boolean().optional(),
  });

  const handleSubmit = async (values, actions) => {
    setIsSubmitting((prev) => !prev);

    //! Delete Timeout fn then handle POST Operation Here
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      actions.setSubmitting(false);
      //! Reset submit status after POST operation is completed
      setIsSubmitting((prev) => !prev);
    }, 400);
  };

  return (
    <section className="grid h-screen w-[100vw] items-center lg:place-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[60%]">
          <h1 className="mb-6 text-center text-2xl">
            Login to get access to access to all Free Course Materials
          </h1>

          <button
            type="button"
            className="flex w-full items-center justify-center rounded-lg border-2 px-6 py-3"
          >
            Login with Google
            <span className="m-0 ms-4 text-3xl leading-none">
              <ion-icon src="/svg/google.svg"></ion-icon>
            </span>
          </button>

          <MyTextInput
            label="Matriculation Number"
            name="matNo"
            id="matNo"
            type="text"
            placeholder="M.22/ND/CSIT/14764"
          />

          <MyPasswordInput
            label="Password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <div className="flex items-center justify-between">
            <MyCheckbox name="rememberMe">Remember me</MyCheckbox>

            {/* <Link
              className="ms-2 font-medium text-sky-600 hover:cursor-pointer hover:underline"
              href="/forgot-password"
            >
              Forgot Password?
            </Link> */}
          </div>

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link
              className="ms-2 text-sky-400 hover:cursor-pointer hover:underline"
              href="/signup"
            >
              SignUp
            </Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
};

export default Login;
