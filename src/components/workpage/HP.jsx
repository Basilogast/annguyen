import { Container } from "react-bootstrap";
import WSPGallery from "./utility/WSPGallery";
import { Link } from "react-router-dom";

import art1 from "../../assets/img/works/workpage/HP/ARTWORK/1.jpg";
import art2 from "../../assets/img/works/workpage/HP/ARTWORK/2.jpg";
import art3 from "../../assets/img/works/workpage/HP/ARTWORK/3.png";
import art4 from "../../assets/img/works/workpage/HP/ARTWORK/4.jpg";

import post1 from "../../assets/img/works/workpage/HP/SOCIALPOST/1.jpg";
import post2 from "../../assets/img/works/workpage/HP/SOCIALPOST/2.jpg";
import post3 from "../../assets/img/works/workpage/HP/SOCIALPOST/3.jpg";
import post4 from "../../assets/img/works/workpage/HP/SOCIALPOST/4.jpg";
import post5 from "../../assets/img/works/workpage/HP/SOCIALPOST/5.jpg";

import pdfUrl from "../../assets/pdf/THE LAMP X BV HẠNH PHÚC PROPOSAL.pdf";

export const HP = () => {
  const galleryImages = [
    { img: art1 },
    { img: art2 },
    { img: art3 },
    { img: art4 },
  ];

  const galleryImages2 = [
    { img: post1 },
    { img: post2 },
    { img: post3 },
    { img: post4 },
    { img: post5 },
  ];

  return (
    <section className="workPage">
      <Container>
        <Link to="/NguyenDoThienAn" className="btnHome">
          Return to Homepage
        </Link>
        <h2>HANH PHUC INTERNATIONAL x THE LAMP</h2>
        <h3>SOW of the campaign: Social campaign ( Social post, Shooting photo and video clips  + Artworks package )</h3>
        <p className="scopeOfWork">
          + Project leader of social campaign <br />
          + Keep track timeline and quality control of each output of the internal
          teams ( each content and design output).
          <br />
          + Update any client's order, debrief and brief every task for internal
          team and ensure the quality meet up to client's requirement.
          <br />
          + Deal, negotiate solve problems and disagreements between client and
          internal team. <br />
          + Manage client's expectation, internal performance. Solve team and
          client's problems with any tasks. <br />
          + Deal and negotiate workload and timeline to make sure the smooth
          progress of the campaign. <br />
          + Take responsibility for every phase and every work of the campaign.
          <br />
          + Catch up job progress and be aware of any issues of the team to solve
          and give directions.
        </p>
        <h3>Artwork</h3>
        <WSPGallery galleryImages={galleryImages} />
        <h3>Social Posts</h3>
        <WSPGallery galleryImages={galleryImages2} />
        <h3>Proposals</h3>
        <iframe
          src={pdfUrl}
          style={{
            width: "100%",
            minHeight: "800px",
            border: "none",
            borderRadius: "8px", // Rounded corners for the iframe
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
          }}
          title="PDF Preview"
        ></iframe>
      </Container>
    </section>
  );
};
