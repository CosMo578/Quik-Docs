import { Button, Modal } from "flowbite-react";
import Link from "next/link";

const PopupModal = ({ openModal, setOpenModal, course }) => {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>
        {course ? course.courseTitle : "Course Details"}
      </Modal.Header>
      <Modal.Body>
        <div className="space-y-6 [&_h2]:text-2xl [&_h2]:font-semibold">
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            <h2>The Test</h2>

            <p>
              The test contains {course?.questions.length} questions and there
              is no time limit. The test is not official, it&apos;s just a nice
              way to see how much you know, or don&apos;t know, about the
              course.
            </p>
          </div>

          <div className="text-base leading-relaxed text-gray-500">
            <h2>Count Your Score</h2>
            <p>
              You will get 1 point for each correct answer. At the end of the
              Quiz, your total score will be displayed. Maximum score is{" "}
              <b>{course?.questions.length} points.</b>
            </p>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Link
          className="rounded-md bg-primary-100 p-2 text-center text-white"
          onClick={() => setOpenModal(false)}
          href={`/quiz/${course?.courseTitle}`}
        >
          Start The Quiz
        </Link>

        <button
          className="cursor-pointer rounded-md border border-primary-100 bg-transparent px-3 py-1.5 text-center text-primary-100"
          onClick={() => setOpenModal(false)}
        >
          Exit
        </button>
      </Modal.Footer>
    </Modal>
  );
};
export default PopupModal;
