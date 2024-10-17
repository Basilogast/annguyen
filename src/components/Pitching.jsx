import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WorkCard from "./WorkCard"; // You can still use the same WorkCard component to display pitch cards

export const Pitching = ({ pitchCards, signedInUser }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    pin_container: {
      margin: "0 auto",
      padding: 0,
      width: "40vw",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 250px)",
      gridAutoRows: "10px",
      justifyContent: "center",
      backgroundColor: "#121212",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0",
    },
    buttonStyle: {
      padding: "15px 30px",
      fontSize: "20px",
      fontWeight: "bold",
      borderRadius: "8px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      transition: "all 0.3s ease",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
  };

  return (
    <section className="work" id="work">
      <Container>
        <div className="d-flex flex-column align-items-center">
          <h2>PITCHING</h2>
          <hr />
        </div>

        {/* Display "Add Pitch" button only when user is signed in */}
        {signedInUser && (
          <div style={styles.buttonContainer}>
            <Link to="/NguyenDoThienAn/add-pitches">
              <Button
                style={{
                  ...styles.buttonStyle,
                  ...(hover ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Add New Pitch
              </Button>
            </Link>
          </div>
        )}

        <div style={styles.pin_container}>
          {/* Map through pitchCards (instead of workCards) */}
          {pitchCards.map((card, index) => (
            <WorkCard
              key={index}
              id={card.id}
              size={card.size}
              img={card.img}
              text={card.text}
              pdfUrl={card.pdfUrl}
              textPara={card.textPara}
              detailsRoute={card.detailsRoute}
              signedInUser={signedInUser} // Pass signedInUser to WorkCard
              targetTable="pitches"
            />
          ))}
        </div>
      </Container>
    </section>
  );
};
