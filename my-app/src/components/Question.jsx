import React, { useState, useEffect } from "react";
import Options from "./Options";
import Explanation from "./Explanation";

function Question({ question }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleOptionClick = (index) => {
    setSelectedOption(index);
    setShowExplanation(false); // Reset explanation when a new option is selected
  };

  const toggleExplanation = () => {
    setShowExplanation((prev) => !prev);
  };

  // Reset state when the question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowExplanation(false);
  }, [question]);

  return (
    <div className="question-container">
      <h3>{question.title}</h3>
      <Options
        options={question.options}
        selectedOption={selectedOption}
        onOptionClick={handleOptionClick}
        correctAnswer={question.correctAnswer}
        showExplanation={showExplanation}
      />
      {selectedOption !== null && (
        <button onClick={toggleExplanation}>
          {showExplanation ? "Hide Explanation" : "Show Explanation"}
        </button>
      )}
      {showExplanation && (
        <Explanation
          explanation={question.explanation}
          isCorrect={selectedOption === question.correctAnswer}
        />
      )}
    </div>
  );
}

export default Question;
