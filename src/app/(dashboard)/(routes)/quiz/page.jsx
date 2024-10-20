import Link from "next/link";

const Quiz = () => {
  return (
    <div className="mt-[10vh] text-black">
      <h1 className="text-center text-2xl">Welcome to Quizzes</h1>
      <ul className="[&_li]:bg-primary mx-auto mt-12 grid w-[60%] grid-cols-3 gap-6 [&_li]:rounded-md [&_li]:bg-primary-100 [&_li]:p-2 [&_li]:text-center [&_li]:text-white">
        <Link href="quiz/com221">
          <li>Com 221</li>
        </Link>
        <Link href="quiz/com223">
          <li>Com 223</li>
        </Link>
        <Link href="quiz/pgt123">
          <li>PGT 123</li>
        </Link>
      </ul>
    </div>
  );
};

export default Quiz;
