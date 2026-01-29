import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { useNavigate } from "react-router-dom";

export default function UserForm({ onSubmit }) {
  const [inputName, setInputName] = useState("");
  const { setName } = useContext(UserContext);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setName(inputName);
    onSubmit(inputName);
    navigate("/quiz");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Name: </label>
      <input
        type="text"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <br />
      <br />
      <button type="submit">Start Quiz</button>
    </form>
  );
}
