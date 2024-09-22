"use client";
import * as Yup from "yup";
import { useState } from "react";
import { Form, Formik } from "formik";
import TextInput from "@/components/TextInput";

const CreateQuizForm = ({ Questions, initialTotalQuestions }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  let totalQuestions = Number.parseInt(initialValues.totalQuestions);
  const [questionCount, setQuestionCount] = useState(0);

  const inputItems = [
    {
      placeholder: "Introduction to Hardware Maintenance",
      type: "text",
      id: "courseName",
      name: "courseName",
      //   disabled: courseName,
    },
    {
      type: "number",
      value: 10,
      id: "totalQuestions",
      name: "totalQuestions",
    },
    {
      placeholder: "Question",
      id: "question",
      name: "question",
    },
    {
      placeholder: "Option 1",
      id: "option1",
      name: "option1",
    },
    {
      placeholder: "Option 2",
      id: "option2",
      name: "option2",
    },
    {
      placeholder: "Option 3",
      id: "option3",
      name: "option3",
    },
    {
      placeholder: "Option 4",
      id: "option4",
      name: "option4",
    },
    {
      placeholder: "Answer",
      id: "answer",
      name: "answer",
    },
  ];e

  const initialValues = {
    courseName: "",
    totalQuestions: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
  };

  const schemaObject = Yup.object({
    courseName: Yup.string()
      .min(20, "Must be more than 20 characters")
      .required("required"),
    totalQuestions: Yup.string().required("required"),
    option1: Yup.string()
      .min(5, "Must be more than 5 characters")
      .required("required"),
    option2: Yup.string()
      .min(5, "Must be more than 5 characters")
      .required("required"),
    option3: Yup.string()
      .min(5, "Must be more than 5 characters")
      .required("required"),
    option4: Yup.string()
      .min(5, "Must be more than 5 characters")
      .required("required"),
    answer: Yup.string()
      .min(5, "Must be more than 5 characters")
      .required("required"),
  });

  const handleSubmit = async (e, values, actions) => {
    e.preventDefault();
    setIsSubmitting((prev) => !prev);

    Questions.push(JSON.stringify(values));
    setQuestionCount((prev) => (prev += 1));
    console.log(Questions);

    setIsSubmitting((prev) => !prev);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schemaObject}
      onSubmit={handleSubmit}
    >
      <Form className="grid grid-cols-2 gap-3" action="handleSubmit">
        {inputItems?.map((item) => {
          return (
            <TextInput
              key={item.id}
              id={item.id}
              name={item.name}
              value={item?.value}
              disabled={item?.disabled}
              type={item.type && "text"}
              placeholder={item.placeholder}
            />
          );
        })}

        <button type="submit">
          {totalQuestions <= 1
            ? "Next"
            : questionCount === totalQuestions
              ? isSubmitting
                ? "Submit"
                : "Submitting..."
              : "Previous"}
        </button>
      </Form>
    </Formik>
  );
};
export default CreateQuizForm;
