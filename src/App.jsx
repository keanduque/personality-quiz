import { useState, useEffect } from "react";
import { UserProvider } from "./components/UserContext";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Question from "./components/Question";
import UserForm from "./components/UserForm";
import Results from "./components/Results";

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [userName, setUserName] = useState("");
  const [element, setElement] = useState("");
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      if (currentQuestionIndex === questions.length) {
        const selectedElement = determineElement(answers);
        setElement(selectedElement);
        fetchArtwork(keywords[selectedElement]);
      }
    },
    [currentQuestionIndex],
  );

  async function fetchArtwork(keyword) {
    try {
      setLoading(true);

      const response = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${keyword}&hasImages=true?isHighlight=true&isOnView=true`,
      );
      const data = await response.json();

      if (!data.objectIDs || data.objectIDs.length === 0) {
        setLoading(false);
        throw new Error("No artworks found for the given keyword");
      }

      const randomObjectId =
        data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];

      const artworkResponse = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomObjectId}`,
      );
      const artworkData = await artworkResponse.json();

      setArtwork(artworkData);
    } catch (error) {
      throw new Error("Failed to fetch artwork" + error.message);
    } finally {
      setLoading(false);
    }
  }

  const questions = [
    {
      question: "What's your favorite color?",
      options: ["Red 🔴", "Blue 🔵", "Green 🟢", "Yellow 🟡"],
    },
    {
      question: "Which environment do you feel most connected to?",
      options: ["Volcano 🌋", "Ocean 🌊", "Forest 🌲", "Sky ☁️"],
    },
    {
      question: "What describes your personality best?",
      options: ["Passionate 🔥", "Calm 💧", "Grounded 🌱", "Free-spirited 🌬️"],
    },
    {
      question: "Which power would you choose?",
      options: [
        "Fire Control 🔥",
        "Water Bending 💧",
        "Nature Growth 🌿",
        "Wind Flight 🌪️",
      ],
    },
  ];

  const keywords = {
    Fire: "fire",
    Water: "water",
    Earth: "earth",
    Air: "air",
  };

  const elements = {
    // Colors
    "Red 🔴": "Fire",
    "Blue 🔵": "Water",
    "Green 🟢": "Earth",
    "Yellow 🟡": "Air",

    // Environments
    "Volcano 🌋": "Fire",
    "Ocean 🌊": "Water",
    "Forest 🌲": "Earth",
    "Sky ☁️": "Air",

    // Personality traits
    "Passionate 🔥": "Fire",
    "Calm 💧": "Water",
    "Grounded 🌱": "Earth",
    "Free-spirited 🌬️": "Air",

    // Powers
    "Fire Control 🔥": "Fire",
    "Water Bending 💧": "Water",
    "Nature Growth 🌿": "Earth",
    "Wind Flight 🌪️": "Air",
  };

  function handleAnswer(answer) {
    setAnswers([...answers, answer]);
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  }

  function handleUserFormSubmit(name) {
    setUserName(name);
    resetQuiz();
  }

  function determineElement(answers) {
    const counts = {};
    answers.forEach(function (answer) {
      const element = elements[answer];
      counts[element] = (counts[element] || 0) + 1;
    });
    return Object.keys(counts).reduce(function (a, b) {
      return counts[a] > counts[b] ? a : b;
    });
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setElement("");
    setArtwork(null);
    setLoading(false);
  }

  return (
    <div className="app-container">
      <UserProvider value={{ name: userName, setName: setUserName }}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={<UserForm onSubmit={handleUserFormSubmit} />}
          />
          <Route
            path="/quiz"
            element={
              currentQuestionIndex < questions.length ? (
                <Question
                  question={questions[currentQuestionIndex].question}
                  options={questions[currentQuestionIndex].options}
                  onAnswer={handleAnswer}
                />
              ) : (
                <Results
                  element={element}
                  artwork={artwork}
                  loading={loading}
                />
              )
            }
          />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
