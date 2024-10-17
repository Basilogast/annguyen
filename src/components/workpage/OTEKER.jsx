import { Container } from "react-bootstrap";
import WSPGallery from "./utility/WSPGallery";
import { Link } from "react-router-dom";

import art1 from "../../assets/img/works/workpage/OTEKER/1.jpg";
import art2 from "../../assets/img/works/workpage/OTEKER/2.1.mp4";
import art3 from "../../assets/img/works/workpage/OTEKER/3.png";
import art4 from "../../assets/img/works/workpage/OTEKER/4.1.mp4";
import art5 from "../../assets/img/works/workpage/OTEKER/5.1.mp4";
import art6 from "../../assets/img/works/workpage/OTEKER/6.png";



export const OTEKER = () => {
  const galleryImages = [
    { img: art1 },
    { img: art2 },
    { img: art3 },
    { img: art4 },
    { img: art5 },
    { img: art6 },
  ];

  return (
    <section className="workPage">
      <Container>
        <Link to="/NguyenDoThienAn" className="btnHome">
          Return to Homepage
        </Link>
        <h2>DR.OTEKER x THE LAMP</h2>
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
        <h3>Execution Works</h3>
        <WSPGallery galleryImages={galleryImages} />
      </Container>
    </section>
  );
};
