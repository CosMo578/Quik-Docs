"use client";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import quizData from "/quizzes.json";
import { useUser } from "@clerk/nextjs";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { AuthContext } from '@/app/Context/AuthContext';

const CourseQuiz = () => {
  const param = useParams();
  const qid = param.courseCode;
  const { currentUser } = useContext(AuthContext);
  const userEmail = currentUser?.email;

  // const { user } = useUser();
  const quizID = decodeURIComponent(qid);

  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [finalResult, setFinalResult] = useState(false);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes

  useEffect(() => {
    const fetchHighScore = async () => {
      if (currentUser) {
        const highScoreDoc = await getDoc(
          doc(db, `users/${currentUser.id}/highScores`, qid),
        );
        if (highScoreDoc.exists()) {
          setHighScore(highScoreDoc.data()?.score || 0);
        }
      }
    };
    fetchHighScore();
  }, [currentUser, qid]);

  useEffect(() => {
    // Find the quiz matching the provided course code
    const quizID = decodeURIComponent(qid);

    const selectedQuiz = quizData?.quizzes?.find(
      (quiz) => quiz?.courseTitle === quizID,
    );

    if (selectedQuiz) {
      setQuizQuestions(selectedQuiz?.questions);
    } else {
      console.error("Quiz not found for the provided course code.");
    }
  }, [qid]);

  const handleOptionChange = (index) => {
    setSelectedAnswer(index);
  };

  const submitAnswer = () => {
    if (selectedAnswer !== null) {
      if (selectedAnswer === quizQuestions[currentQuestion]?.correctAnswer) {
        setScore(score + 1);
      }

      setSelectedAnswer(null);

      if (currentQuestion + 1 < quizQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setFinalResult(true);
      }
    }
  };

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  useEffect(() => {
    if (timeLeft > 0 && !finalResult) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setFinalResult(true);
    }
  }, [timeLeft, finalResult]);

  const handleQuizCompletion = async () => {
    if (score > highScore && currentUser) {
      const highScoreRef = doc(db, `users/${currentUser.id}/highScores`, qid);
      await setDoc(highScoreRef, { score });
      setHighScore(score);
    }
  };

  useEffect(() => {
    if (finalResult) {
      handleQuizCompletion();
    }
  }, [finalResult]);

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResult(false);
    setTimeLeft(300); // Reset timer to 5 minutes
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <main className="mx-auto mt-10 min-h-[70vh] lg:w-[70%] p-6 py-10">
      <div className="mb-10 flex flex-col lg:flex-row items-center justify-between">
        <h1 className="text-2xl">{quizID}</h1>

        <p>
          {currentQuestion + 1} / {quizQuestions.length}
        </p>

        <p>
          <b>Score: </b>
          {score} out of {quizQuestions.length}
        </p>
      </div>

      {finalResult ? (
        <div>
          <div className="space-y-3 text-center">
            <h1 className="text-2xl font-medium">Final Result</h1>
            <p>
              You got {score} out of {quizQuestions.length} questions correct
            </p>
          </div>

          <div class="mb-1 flex justify-between">
            <span class="text-base font-medium text-primary-100 dark:text-white">
              Your Progress
            </span>
            <span class="text-sm font-medium text-primary-100 dark:text-white">
              {((score / quizQuestions.length) * 100).toFixed(0)}%
            </span>
          </div>
          <div class="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              class="h-2.5 rounded-full bg-primary-100"
              style={{
                width: `${((score / quizQuestions.length) * 100).toFixed(2)}%`,
              }}
            ></div>
          </div>

          <button
            onClick={() => restartQuiz()}
            className="mt-4 rounded-md bg-primary-100 px-8 py-3 text-white"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="space-y-3">
            <h3 className="text-xl">
              {quizQuestions[currentQuestion]?.question}
            </h3>

            <ul className="space-y-2">
              {quizQuestions[currentQuestion]?.options.map((option, index) => (
                <li
                  key={index}
                  className="cursor-pointer rounded border border-gray-200 ps-4 dark:border-gray-700"
                >
                  <label className="ms-2 flex w-full cursor-pointer items-start gap-8 py-4 text-sm font-medium text-gray-900 dark:text-gray-300">
                    <input
                      type="radio"
                      name="answer"
                      value={index}
                      checked={selectedAnswer === index}
                      onChange={() => handleOptionChange(index)}
                      className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 checked:text-primary-100 focus:ring-2 focus:ring-primary-100"
                    />
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={submitAnswer}
              disabled={selectedAnswer === null}
              className="flex cursor-pointer items-center gap-1.5 rounded-md bg-primary-100 px-5 py-3 text-white"
            >
              Next Question <ChevronRight />
            </button>

            <div className="text-xl">Time Left: {formatTime(timeLeft)}</div>
          </div>
        </div>
      )}
    </main>
  );
};

export default CourseQuiz;
