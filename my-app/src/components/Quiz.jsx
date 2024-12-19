import React, { useState } from "react";
import Question from "./Question";

function Quiz({ questions }) {
  const [currentCategory, setCurrentCategory] = useState("Mathematics");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const categories = [...new Set(questions.map((q) => q.category))];
  const filteredQuestions = questions.filter(
    (q) => q.category === currentCategory
  );

  const currentQuestion =
    filteredQuestions.length > 0
      ? filteredQuestions[currentQuestionIndex - 1]
      : null;

  const goToNext = () => {
    if (currentQuestionIndex < filteredQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }
  };

  const goToPrev = () => {
    if (currentQuestionIndex > 1) {
      setCurrentQuestionIndex((prev) => prev - 1);
      setShowExplanation(false);
      setSelectedAnswer(null);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index + 1);
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  const changeCategory = (category) => {
    setCurrentCategory(category);
    setCurrentQuestionIndex(1); // Reset to the first question in the new category
    setShowExplanation(false);
    setSelectedAnswer(null);
  };

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
  };

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  return (
    <div className="quiz-container">
      <div className="header">
        <h2>{currentCategory}</h2>
        <div className="progress">
          Question {currentQuestionIndex}/{filteredQuestions.length}
          <a href="https://www.aifer.in" className="need-help">
            Need Help?
          </a>
        </div>
      </div>
      <div className="categories">
        {categories.map((category) => (
          <div
            key={category}
            className={`category ${
              currentCategory === category ? "active" : ""
            }`}
            onClick={() => changeCategory(category)}
          >
            <h4>{category}</h4>
            <div className="numbers">
              {questions
                .filter((q) => q.category === category)
                .map((_, index) => (
                  <span
                    key={index}
                    className={`number ${
                      currentCategory === category &&
                      currentQuestionIndex === index + 1
                        ? "active"
                        : ""
                    }`}
                    onClick={() =>
                      currentCategory === category && goToQuestion(index)
                    }
                  >
                    {index + 1}
                  </span>
                ))}
            </div>
          </div>
        ))}
      </div>
      {currentQuestion ? (
        <>
          <Question
            question={currentQuestion}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
          />
          {selectedAnswer !== null && (
            <button onClick={toggleExplanation}>
              {showExplanation ? "Hide Explanation" : "Show Explanation"}
            </button>
          )}
          {showExplanation && (
            <div className="explanation">
              <p>{currentQuestion.explanation}</p>
            </div>
          )}
        </>
      ) : (
        <p>No questions available in this category.</p>
      )}
      <div className="navigation">
        <button onClick={goToPrev} disabled={currentQuestionIndex === 1}>
          Prev
        </button>
        <button
          onClick={goToNext}
          disabled={currentQuestionIndex === filteredQuestions.length}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Quiz;
