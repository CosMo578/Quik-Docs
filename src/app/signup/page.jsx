"use client";
import * as Yup from "yup";
import Link from "next/link";
import { useState } from "react";
import { Formik, Form } from "formik";
import { useRouter } from "next/navigation";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.js";
import MyTextInput from "@/components/MyTextInput";
import MyPasswordInput from "@/components/MyPasswordInput";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Signup = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const initialValues = {
    matNum: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const schemaObject = Yup.object({
    matNum: Yup.string()
      .matches(
        /^M\.\d{2}\/(ND|HND)\/[A-Z]+\/\d{5}$/,
        "Invalid matriculation number format",
      )
      .required("Matriculation number is required"),
    email: Yup.string().email("Invalid email address").required("Required"),
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
  });

  const handleSubmit = async (values, actions) => {
    setIsSubmitting(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password,
      );

      const userId = userCredential.user.uid;
      await setDoc(doc(db, "userDetails", userId), {
        matNum: values.matNum,
        email: values.email,
      });

      alert("Sign up successful");
      router.push("/login");
    } catch (error) {
      alert("Signup failed " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="grid min-h-screen w-[100vw] py-10 lg:place-items-center">
      <Formik
        initialValues={initialValues}
        validationSchema={schemaObject}
        onSubmit={handleSubmit}
      >
        <Form className="flex flex-col gap-5 p-6 lg:mx-auto lg:w-[50%]">
          <MyTextInput
            label="Mat. Number"
            name="matNum"
            id="matNum"
            type="text"
            placeholder="M.21/ND/CSIT/14769"
          />

          <MyTextInput
            label="Email Address"
            name="email"
            id="email"
            type="email"
            placeholder="tonystark@gmail.com"
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

          <button
            className="w-full rounded-lg bg-primary-100 px-5 py-2.5 text-center text-sm font-bold text-white sm:w-auto"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Your Account..." : "SignUp"}
          </button>
          <p className="text-center">
            Already have an account?{" "}
            <Link
              className="ms-2 cursor-pointer text-primary-100 hover:underline"
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
