"use client";
import { useParams } from "next/navigation";

const CourseQuiz = () => {
  const param = useParams();
  const qid = param.courseCode;
  return <div className="mt-[15vh]">CourseQuiz {qid}</div>;
};

export default CourseQuiz;
