import React, { useEffect, useState } from "react";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import Header from "./Header";

function App() {
  const [questions, setQuestions] = useState([]);
  const [page, setPage] = useState("List");

  useEffect(() => {
    let isMounted = true;
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then((questions) => {
        if (isMounted) setQuestions(questions);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  function handleAddQuestion(newQuestion) {
    setQuestions((prev) => [...prev, newQuestion]);
    setPage("List");
  }

  function handleDeleteQuestion(deletedQuestionId) {
    setQuestions((prev) =>
      prev.filter((q) => q.id !== deletedQuestionId)
    );
  }

  function handleUpdateAnswer(updatedQuestion) {
    setQuestions((prev) =>
      prev.map((q) => (q.id === updatedQuestion.id ? updatedQuestion : q))
    );
  }

  return (
    <main>
      <Header onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateAnswer={handleUpdateAnswer}
        />
      )}
    </main>
  );
}

export default App;
