import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import WorkCard from "./WorkCard";

import LYN from "../assets/img/works/LYN.png";
import HPimg from "../assets/img/works/HP.png";
import OTEKERimg from "../assets/img/works/workpage/OTEKER/4.1.mp4";
import HONGKONGimg from "../assets/img/works/HONGKONG.png";
import HONGKONG2img from "../assets/img/works/workpage/HONGKONG/GDN/GDN1.png";
import CELA from "../assets/img/works/CELA.png";
import DALMORE from "../assets/img/works/DALMORE.png";

import LYNpdf from "../assets/pdf/REPORT KOC _ LYN.pdf";
import HPpdf from "../assets/pdf/THE LAMP X BV HẠNH PHÚC PROPOSAL.pdf";
import HKpdf from "../assets/pdf/Hong Kong MX Moon Cake x The Lamp.pdf";
import CELApdf from "../assets/pdf/CELADON BOULEVARD_DIGITAL PROPOSAL 2024.pdf";
import DALpdf from "../assets/pdf/_Internal_Catalyst_2024.pdf";

export const Work = ({ workCards, signedInUser }) => {
  const [hover, setHover] = useState(false);

  const styles = {
    pin_container: {
      margin: "0 auto",
      padding: 0,
      width: "80vw",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, 300px)",
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
          <h2>EXECUTIONS</h2>
          <hr />
        </div>

        {/* Display "Add Work" button only when user is signed in */}
        {signedInUser && (
          <div style={styles.buttonContainer}>
            <Link to="/NguyenDoThienAn/add-work">
              <Button
                style={{
                  ...styles.buttonStyle,
                  ...(hover ? styles.buttonHover : {}),
                }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                Add New Work
              </Button>
            </Link>
          </div>
        )}

        <div style={styles.pin_container}>
          {workCards.map((card, index) => (
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
              targetTable="workcards"
            />
          ))}

          {/* Static test WorkCard for testing PDF functionality */}
          <WorkCard
            size="small"
            img={LYN}
            text="Booking KOLs x LYN"
            pdfUrl={LYNpdf}
            textPara={[
              "+ Book and manage KOL",
              "+ Keep track and monitor project progress",
              "+ Ensure timeline for product air schedules",
              "+ Ensure KOC's product quality meets the requirements from LYN client brief",
              "+ Make sure KOL's posts meet up to KPI commitment and report KOL booking campaign",
            ]}
            detailsRoute=""
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
          <WorkCard
            size="medium"
            img={HPimg}
            text="HANH PHUC INTERNATIONAL x THE LAMP"
            pdfUrl={HPpdf}
            textPara={[
              "+ Project leader of social campaign ( Social post, Shooting photo and video clips  + Artworks package )",
              "+ Keep track timeline and quality control of each output of the internal teams ( each content and design output)",
              "+ Update any client's order, debrief and brief every task for internal team and ensure the quality meets up to client's requirements",
              "+ Deal, negotiate, solve problems and disagreement between client and internal team",
              "+ Manage client's expectations, internal performance",
              "+ Solve team and client's problems with any tasks",
              "+ Deal and negotiate workload and timeline to make sure the smooth progress of the campaign",
              "+ Take responsibility for every phase and every task of the campaign",
              "+ Catch up job progress and address any issues of the team to solve and give directions",
            ]}
            detailsRoute="/NguyenDoThienAn/HanhPhucInternational"
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
          <WorkCard
            size="large"
            img={HONGKONG2img}
            text="HONG KONG Mooncake Digital Campaign"
            pdfUrl={HKpdf}
            textPara={[
              "+ Digital campaign - Social Media, Google ads, GDN ads, PR Article, Tiktokers Booking, Community Seeding",
              "+ Create campaign proposal and pitch with MX Hong Kong client",
              "+ Brief direction for media team, quality control with keyword planning for Google",
              "+ Filter and approach suitable KOL with brand identity and process the campaign with them",
              "+ Order and brief GDN design direction and run ads",
              "+ Work and deal with PR outlets to run 4 articles to promote MX Hong Kong mooncakes",
              "+ Order, brief internal team and quality control for social media posts",
            ]}
            detailsRoute="/NguyenDoThienAn/HONGKONGMooncake"
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
          <WorkCard
            size="small"
            img={DALMORE}
            text="DALMORE CATALYST Internal Project"
            pdfUrl={DALpdf}
            textPara={[
              "+ Plan and execute brand launching projects as a whiskey brand",
              "+ Plan and organize new product and brand launch events: bartender masterclass, consumer masterclass, VIP dinner event",
              "+ Brief ideas and quality control for POSM design and manage productions of stakeholders to ensure the quality",
            ]}
            detailsRoute=""
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
          <WorkCard
            size="medium"
            img={OTEKERimg}
            text="DR. OTEKER x THE LAMP"
            pdfUrl={OTEKERimg}
            textPara={[
              "+ Project leader of social campaign ( Social post, Shooting photo and video clips  + Artworks package )",
              "+ Keep track of timeline and quality control of each output of the internal teams ( each content and design output)",
              "+ Update any client's order, debrief and brief every task for the internal team and ensure the quality meets up to client's requirements",
              "+ Deal, negotiate and solve problems and disagreements between client and internal team",
              "+ Manage client's expectations, internal performance",
              "+ Solve team and client's problems with any tasks",
              "+ Deal and negotiate workload and timeline to make sure the smooth progress of the campaign",
              "+ Take responsibility for every phase and every task of the campaign",
              "+ Catch up job progress and address any issues of the team to solve and give directions",
            ]}
            detailsRoute="/NguyenDoThienAn/DrOTEKER"
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
          <WorkCard
            size="medium"
            img={CELA}
            text="CELADON BOULEVARD Digital Campaign"
            pdfUrl={CELApdf}
            textPara={[
              "+ Work with the internal team to come up with ideas for video shooting and photography contributions, create KPIs and distribution plans",
              "+ Quality control for all project outputs: media plan, video shooting script, and detailed plan for shooting",
              "+ Make a report for the project, comment, and point out improvements in the monthly campaign",
              "+ Keep tracking the progress of completing the campaign's KPIs in terms of qualified leads",
              "+ Keep track of timeline and quality control of each output of the internal teams ( each content and design output)",
              "+ Manage client's expectations, internal performance",
              "+ Take responsibility for every phase and every task of the campaign",
              "+ Catch up job progress and address any issues of the team to solve and give directions",
            ]}
            detailsRoute=""
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
          <WorkCard
            size="small"
            img={HONGKONGimg}
            text="HONG KONG Mooncake Digital Campaign"
            pdfUrl={HKpdf}
            textPara={[
              "+ Digital campaign - Social Media, Google ads, GDN ads, PR Article, Tiktokers Booking, Community Seeding",
              "+ Create campaign proposal and pitch with MX Hong Kong client",
              "+ Brief direction for media team, quality control with keyword planning for Google",
              "+ Filter and approach suitable KOL with brand identity and process the campaign with them",
              "+ Order and brief GDN design direction and run ads",
              "+ Work and deal with PR outlets to run 4 articles to promote MX Hong Kong mooncakes",
              "+ Order, brief internal team and quality control for social media posts",
            ]}
            detailsRoute="/NguyenDoThienAn/HONGKONGMooncake"
            signedInUser={signedInUser} // Pass signedInUser to WorkCard
          />
        </div>
      </Container>
    </section>
  );
};
