import React, { useEffect, useState } from "react";
import Quiz from "./components/Quiz";
import "./styles.css";

function App() {
  const [quizData, setQuizData] = useState([]);

  // Fetch quiz data from the backend
  useEffect(() => {
    fetch("http://localhost:5000/api/questions")
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Error fetching data:", err));
  }, []);

  return (
    <div className="App">
      <h1 style={{textAlign:"center"}}>Quiz Application UI</h1>
      {quizData.length > 0 ? <Quiz questions={quizData} /> : <p>Loading...</p>}
    </div>
  );
}

export default App;
