"use client";
import { useState } from "react";
import quiz from "/quizzes.json";
import PopupModal from "@/components/PopupModal";

const Quiz = () => {
  const courses = quiz?.quizzes;
  const [openModal, setOpenModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setOpenModal(true);
  };

  return (
    <div className="mt-[10vh] text-black">
      <h1 className="text-center text-2xl">Welcome to Quizzes</h1>
      <ul className="mx-auto mt-12 grid lg:w-[60%] px-4 grid-cols-3 gap-6 [&_li]:rounded-md [&_li]:bg-primary-100 [&_li]:p-2 [&_li]:text-center [&_li]:text-white">
        {courses.map((course) => (
          <li
            className="cursor-pointer"
            key={course.courseTitle}
            onClick={() => handleCourseClick(course)}
          >
            {course.courseCode}
          </li>
        ))}
      </ul>

      <PopupModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        course={selectedCourse}
      />
    </div>
  );
};

export default Quiz;
