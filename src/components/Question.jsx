function Question({ question, options, onAnswer }) {
  return (
    <div className="question-container">
      <h2>{question}</h2>
      {options.map((option) => {
        return (
          <button key={option} onClick={() => onAnswer(option)}>
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Question;
