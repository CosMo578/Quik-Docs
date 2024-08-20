"use client";

import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";
import MyCheckbox from "@/components/MyCheckbox";
import MyTextInput from "@/components/MyTextInput";
import MyPasswordInput from "@/components/MyPasswordInput";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    matNo: "",
    password: "",
    confirmPassword: "",
    acceptedTerms: false,
  };

  const schemaObject = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Please confirm your password"),
    acceptedTerms: Yup.boolean()
      .required("Required")
      .oneOf([true], "You must accept the terms and conditions."),
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
    <section className="grid min-h-screen w-[100vw] py-10 lg:place-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[60%]">
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-lg border-2 px-6 py-3"
          >
            Sign Up with Google
            <span className="m-0 ms-4 text-3xl leading-none">
              <ion-icon src="/svg/google.svg"></ion-icon>
            </span>
          </button>

          <div className="grid gap-6 md:grid-cols-2">
            <MyTextInput
              label="First Name"
              name="firstName"
              id="firstName"
              type="text"
              placeholder="Tate"
              focus
            />

            <MyTextInput
              label="Last Name"
              name="lastName"
              id="lastName"
              type="text"
              placeholder="McRae"
            />
          </div>

          <MyTextInput
            label="Matriculation Number"
            name="matNo"
            id="matNo"
            type="text"
            placeholder="M.22/ND/CSIT/14764"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="tatemcrae88@gmail.com"
          />

          <MyPasswordInput
            label="Enter Password"
            name="password"
            id="password"
            placeholder="*********"
          />

          <MyPasswordInput
            label="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="*********"
          />

          <MyCheckbox name="acceptedTerms">
            I accept the terms and conditions
          </MyCheckbox>

          <button
            className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-semibold text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              className="ms-2 cursor-pointer text-sky-400 hover:underline"
              href="/login"
            >
              Login
            </Link>
          </p>
        </Form>
      </Formik>
    </section>
  );
};

export default Signup;
