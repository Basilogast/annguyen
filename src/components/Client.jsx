import { Container } from "react-bootstrap";
import aeonLogo from "../assets/img/client/aeonLogo.jpg";
import cafeAmazonLogo from "../assets/img/client/cafeAmazonLogo.png";
import fressiLogo from "../assets/img/client/fressiLogo.png";
import hanhphucLogo from "../assets/img/client/hanhphucLogo.png";
import herLogo from "../assets/img/client/herLogo.png";
import hongkongLogo from "../assets/img/client/hongkongLogo.png";
import kiehlLogo from "../assets/img/client/kiehlLogo.png";
import lifebuoyLogo from "../assets/img/client/lifebuoyLogo.png";
import otekerLogo from "../assets/img/client/otekerLogo.png";
import verizonLogo from "../assets/img/client/verizonLogo.jpg";
import celadonLogo from "../assets/img/client/celadonLogo.png";
import dalmoreLogo from "../assets/img/client/dalmoreLogo.jpg";
import LYNlogo from "../assets/img/client/LYNlogo.jpg";

export const Client = () => {
  return (
    <section className="client py-5">
      <Container>
        <div className="text-center mb-5">
          <h2>MY PREVIOUS CLIENTS</h2>
          <hr className="mx-auto" style={{ width: "50%", borderTop: "3px solid #000" }} />
        </div>
        <div className="row row-cols-2 row-cols-sm-3 row-cols-md-5 g-4 logos text-center">
          <div className="col imgContainer">
            <img src={otekerLogo} alt="Oteker" className="img-fluid" />
          </div>
          <div className="col imgContainer">
            <img src={hongkongLogo} alt="Hongkong" className="img-fluid" />
          </div>
          <div className="col imgContainer">
            <img src={cafeAmazonLogo} alt="Cafe Amazon" className="img-fluid" />
          </div>
          <div className="col imgContainer">
            <img src={hanhphucLogo} alt="Hanh Phuc" className="img-fluid" />
          </div>
          <div className="col imgContainer">
            <img src={aeonLogo} alt="Aeon" className="img-fluid" />
          </div>
        </div>
        <div className="row row-cols-2 row-cols-sm-3 g-4 logos mt-4 text-center">
          <div className="col imgContainer">
            <img src={celadonLogo} alt="Celadon" className="img-fluid" />
          </div>
          <div className="col imgContainer">
            <img src={dalmoreLogo} alt="Dalmore" className="img-fluid" />
          </div>
          <div className="col imgContainer">
            <img src={LYNlogo} alt="LYN" className="img-fluid" />
          </div>
        </div>
      </Container>
    </section>
  );
};
