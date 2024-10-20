import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WorkCard from "./WorkCard"; // You can still use the same WorkCard component to display pitch cards

import com1pdf from "../assets/img/competition/com1pdf.pdf";
import com1vid from "../assets/img/competition/com1vid.mp4";

import com2pdf from "../assets/img/competition/com2pdf.pdf";
import com2vid from "../assets/img/competition/com2vid.mp4";

export const Competition = ({ comCards, signedInUser }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    pin_container: {
      margin: "0 auto",
      padding: 0,
      width: "40vw",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 400px)",
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
          <h2>COMPETITION</h2>
          <hr />
        </div>

        {/* Display "Add Pitch" button only when user is signed in */}
        {signedInUser && (
          <div style={styles.buttonContainer}>
            <Link to="/add-competition">
              <Button
                style={{
                  ...styles.buttonStyle,
                  ...(hover ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Add New Competition
              </Button>
            </Link>
          </div>
        )}

        <div style={styles.pin_container}>
          {/* Map through pitchCards (instead of workCards) */}
          {comCards.map((card, index) => (
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
              targetTable="competition"
            />
          ))}
           <WorkCard
            size="small"
            img={com1vid}
            text="L'OREAL BRANDSTORM 2024"
            pdfUrl={com1pdf}
            textPara={[
              "- Lead team in managing time allocation and delegating tasks across various areas to successfully complete the proposal.",
              "- Lead internal meetings to brainstorm ideas, conduct market research, and analyze scientific mechanisms to refine and finalize concepts related to beauty tech.",
              "- Developed creative concept idea and content for frames in the product  video introduction, proposing innovative ideas to enhance the product presentation.",
              "- Coordinated within the team to ensure effective integration of research, creativity, and technical aspects into the final proposal to highlight key insights and differentiators of the proposed beauty tech innovation.",
            ]}
            detailsRoute=""
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
          <WorkCard
            size="small"
            img={com2vid}
            text="L'OREAL BRANDSTORM 2024"
            pdfUrl={com2pdf}
            textPara={[
              "- Lead team in managing time allocation and delegating tasks across various areas to successfully complete the proposal.",
              "- Lead internal meetings to brainstorm ideas, conduct market research, and analyze scientific mechanisms to refine and finalize concepts related to beauty tech.",
              "- Developed creative concept idea and content for frames in the product  video introduction, proposing innovative ideas to enhance the product presentation.",
              "- Coordinated within the team to ensure effective integration of research, creativity, and technical aspects into the final proposal to highlight key insights and differentiators of the proposed beauty tech innovation.",
            ]}
            detailsRoute=""
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
        </div>
      </Container>
    </section>
  );
};
