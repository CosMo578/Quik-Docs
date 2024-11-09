"use client";
import { useEffect, useState } from "react";

const Quiz = () => {
  const [finalResult, setFinalResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const questions = [
    {
      text: "What is the capital of UK?",
      options: [
        { text: "Japan", isCorrect: false },
        { text: "England", isCorrect: true },
        { text: "Korea", isCorrect: false },
        { text: "Paris", isCorrect: false },
      ],
    },
    {
      text: "What is the capital of Nigeria?",
      options: [
        { text: "Delta", isCorrect: false },
        { text: "Lagos", isCorrect: true },
        { text: "Abuja", isCorrect: false },
        { text: "Spain", isCorrect: false },
      ],
    },
    {
      text: "What is the best programming Language in history?",
      options: [
        { text: "Java", isCorrect: false },
        { text: "JavaScript", isCorrect: true },
        { text: "C++", isCorrect: false },
        { text: "Python", isCorrect: false },
      ],
    },
    {
      text: "Is HTML a programming Language?",
      options: [
        { text: "Yes", isCorrect: true },
        { text: "No", isCorrect: false },
      ],
    },
  ];

  const optionClicked = (isCorrect) => {
    isCorrect && setScore(score + 1);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setFinalResult(true);
    }
  };

  useEffect(() => {
    if (!score === 0 || score > highScore) {
      setHighScore(score);
    }
  }, [score, highScore]);

  const restartQuiz = () => {
    setScore(0);
    setCurrentQuestion(0);
    setFinalResult(false);
  };

  // const syncScore = async (e) => {
  //   await addDoc(collection(db, "messages"), {
  //     uid: user.id,
  //     username: user.username,
  //     score: highScore,
  //     timestamp: serverTimestamp(),
  //   });
  // };

  return (
    <main className="mx-auto mt-10 h-[70vh] w-[70%] rounded-md bg-gray-300 p-6 text-center">
      <h1 className="mb-6 text-3xl font-semibold">English Quiz</h1>
      {finalResult && "high score:" + highScore}
      {!finalResult ? (
        <div className="space-y-6">
          <h3 className="text-2xl font-medium">
            {questions[currentQuestion].text}
          </h3>
          <ul className="space-y-2">
            {questions[currentQuestion].options.map((option, index) => (
              <li
                className="cursor-pointer rounded-lg bg-neutral-200 p-2"
                onClick={() => optionClicked(option.isCorrect)}
                key={index}
              >
                {option.text}
              </li>
            ))}
          </ul>
          <h2>
            Question {currentQuestion + 1} out of {questions.length}
          </h2>
        </div>
      ) : (
        <div>
          <h1>Final Result</h1>
          <h2>
            {score} out of {questions.length} correct - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartQuiz()}>Try Again</button>
        </div>
      )}
    </main>
  );
};
export default Quiz;
