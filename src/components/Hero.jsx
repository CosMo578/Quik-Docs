import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-24 lg:flex lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Easily Access
            <strong className="block font-extrabold text-primary-300 sm:block">
              Course Materials <span className='text-black'>and</span> Quizzes
            </strong>
            all in one place
          </h1>

          <p className="mt-4 text-gray-600 sm:text-xl/relaxed">
            {/* Test yourself with Quizzes, study and download course materials and
            access group chats */}
            Study with course materials, test yourself with quizzes, and access
            a community for sharing ideas
          </p>

          <Link href="/sign-up">
            <button className="bg-primary-300 hover:bg-primary-500 mt-4 rounded-lg px-8 py-4 font-semibold text-white sm:w-auto">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
export default Hero;
