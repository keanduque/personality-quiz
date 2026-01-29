import { useContext } from "react";
import { UserContext } from "./UserContext";

function Results({ element, artwork, loading }) {
  const { name } = useContext(UserContext);

  if (loading) {
    return <p>Loading artwork… 🎨</p>;
  }
  return (
    <div>
      <p>
        <strong>{name}</strong>, your element is: {element}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{artwork.title}</h2>
          <img src={artwork.primaryImage} alt={artwork.title} />
          <p>{artwork.artistDisplayName}</p>
          <p>{artwork.objectDate}</p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}
export default Results;
