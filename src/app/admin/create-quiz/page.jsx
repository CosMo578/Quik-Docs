"use client";
import CreateQuizForm from "@/components/CreateQuizForm";

const CreateQuiz = () => {
  const Questions = [];

  return (
    <section className="px-10">
      <h2>Create A Quiz</h2>

      {Questions?.map((question) => {
        <table>
          <thead>
            <td>Question</td>
            <td>Option 1</td>
            <td>Option 2</td>
            <td>Option 3</td>
            <td>Option 4</td>
            <td>Answer</td>
          </thead>
          <tbody>
            <tr className="text-ellipsis">
              <title>{question.question}</title>
              {question.question}
            </tr>
            <tr>{question.option1}</tr>
            <tr>{question.option2}</tr>
            <tr>{question.option3}</tr>
            <tr>{question.option4}</tr>
            <tr>{question.answer}</tr>
          </tbody>
        </table>;
      })}

      <CreateQuizForm
        Questions={Questions}
        questionCount={questionCount}
      />
    </section>
  );
};
export default CreateQuiz;
