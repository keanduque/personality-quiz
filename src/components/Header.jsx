import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <h1>Which Element Are You?</h1>
      <p>(based on completely random things)</p>
      <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
      </div>
    </div>
  );
}

export default Header;
